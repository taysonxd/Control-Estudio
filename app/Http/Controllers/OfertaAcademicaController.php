<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Carbon\Carbon as CarbonDate;
use App\Http\Resources\Data as Data;
use App\Models\OfertaAcademica;
use App\Models\Carrera;
use App\Models\TrayectoAcademico;
use App\Models\Horario;
use App\Models\Clase;
use App\Models\Pensum;
use App\Models\Seccion;
use Datetime;
use DateInterval;

class OfertaAcademicaController extends Controller
{

  use ApiController;

  protected $html_horario = '';

  public function lista(){

    $trayectos_academicos = TrayectoAcademico::select('trayecto_academico.id as id_trayecto', 'trayecto_academico.trayecto', 'ca.id as id_carrera', 'ca.carrera', 'ca.codcarrera', 'ca.tipo')
                                  ->join('carreras as ca', 'ca.id', 'trayecto_academico.id_carrera')
                                  ->whereExists(function($query){
                                    $query->select(DB::raw(1))
                                          ->from('ofertas_academicas as oa')
                                          ->join('pensum as p', 'p.id', 'oa.id_asignatura')
                                          ->whereRaw('p.id_trayecto_academico = trayecto_academico.id');
                                  })
                                  ->get();

    $trayectos_academicos = new Data($trayectos_academicos);

    return $this->sendResponse($trayectos_academicos);

  }

  public function get(Request $request){

    $resource = ApiHelper::resource();

    try{

      $asignaturas = Pensum::select('pensum.*')
                            ->rightJoin('ofertas_academicas as oa', 'pensum.id', 'oa.id_asignatura')
                            ->where('pensum.id_trayecto_academico', $request->input('oferta_academica.id_trayecto'))
                            ->distinct()
                            ->get();

      $secciones = Seccion::select('secciones.*')
                            ->join('ofertas_academicas as oa', 'oa.id_seccion', 'secciones.id')
                            ->join('pensum as p', 'p.id', 'oa.id_asignatura')
                            ->join('trayecto_academico as ta', 'ta.id', 'p.id_trayecto_academico')
                            ->where('ta.id_carrera', $request->input('oferta_academica.id_carrera'))
                            ->distinct()
                            ->get()
                            ->toArray();

      $oferta_academica = [
        'id_carrera' => $request->input('oferta_academica.id_carrera'),
        'id_trayectoAca' => $request->input('oferta_academica.id_trayecto'),
        'asignaturas' => $asignaturas,
        'secciones' => $secciones
      ];

      $data  =  new Data($oferta_academica);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function crear(Request $request){

    $resource = ApiHelper::resource();

    for($i = 0; $i < count($request->input('oferta_academica.secciones')); $i++){

      $validator2= \Validator::make($request->input('oferta_academica.secciones.'.$i),[
        'codigo' => "required",
        'cupos' => "required"
      ]);

      if($validator2->fails()){
        break;
      }

    }

    if(count($request->input('oferta_academica.asignaturas')) == 0){
      ApiHelper::setError($resource, 2, 422, 'No ha seleccionado asignatura para asignar.');
      return $this->sendResponse($resource);
    }

    if($validator2->fails()){
      ApiHelper::setError($resource, 3, 422, 'Verifique los campos de sección');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      foreach($request->input('oferta_academica.secciones') as $seccion){

        $Seccion = new Seccion;
        $Seccion->codigo = $seccion['codigo'];
        $Seccion->cupos = $seccion['cupos'];
        $Seccion->save();

        foreach($request->input('oferta_academica.asignaturas') as $asignatura){

          $OfertaAcademica = new OfertaAcademica;
          $OfertaAcademica->periodo_academico = CarbonDate::now()->year.' - '.CarbonDate::now()->addYear()->year;
          $OfertaAcademica->id_asignatura = $asignatura;
          $OfertaAcademica->id_seccion = $Seccion->id;
          $OfertaAcademica->save();

        }

      }

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function modify(Request $request){

    $resource = ApiHelper::resource();

    if(count($request->input('update_asignaturas.new')) == 0 && count($request->input('update_asignaturas.delete')) == 0){
      ApiHelper::setError($resource, 2, 422, 'No ha modificado ninguna asignatura.');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      if(count($request->input('update_asignaturas.delete')) > 0){

        foreach($request->input('update_asignaturas.delete') as $asignatura){

          $OfertaAcademica = OfertaAcademica::select()
                                            ->where('id_asignatura', $asignatura)
                                            ->first();
          $OfertaAcademica->delete();
        }
      }

      if(count($request->input('update_asignaturas.new')) > 0){

        $secciones = Seccion::select('secciones.*')
                              ->join('ofertas_academicas as oa', 'oa.id_seccion', 'secciones.id')
                              ->join('pensum as p', 'p.id', 'oa.id_asignatura')
                              ->join('trayecto_academico as ta', 'ta.id', 'p.id_trayecto_academico')
                              ->where('ta.id', $request->input('id_trayectoAca'))
                              ->distinct()
                              ->get();

        foreach($secciones as $seccion){

          foreach($request->input('update_asignaturas.new') as $asignatura){

            $OfertaAcademica = new OfertaAcademica;
            $OfertaAcademica->periodo_academico = CarbonDate::now()->year.' - '.CarbonDate::now()->addYear()->year;
            $OfertaAcademica->id_asignatura = $asignatura;
            $OfertaAcademica->id_seccion = $seccion->id;
            $OfertaAcademica->save();

          }
        }
      }

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function updateSecciones(Request $request){

    $resource = ApiHelper::resource();

    for($i = 0; $i < count($request->input('oferta_academica.secciones')); $i++){

      $validator2= \Validator::make($request->input('oferta_academica.secciones.'.$i),[
        'codigo' => "required",
        'cupos' => "required"
      ]);

      if($validator2->fails()){
        break;
      }

    }

    if(count($request->input('oferta_academica.asignaturas')) == 0){
      ApiHelper::setError($resource, 2, 422, 'No ha seleccionado asignatura para asignar.');
      return $this->sendResponse($resource);
    }

    if($validator2->fails()){
      ApiHelper::setError($resource, 3, 422, 'Verifique los nuevos campos de sección');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      foreach($request->input('oferta_academica.secciones') as $seccion){

        $Seccion = new Seccion;
        $Seccion->codigo = $seccion['codigo'];
        $Seccion->cupos = $seccion['cupos'];
        $Seccion->save();

        foreach($request->input('oferta_academica.asignaturas') as $asignatura){

          $OfertaAcademica = new OfertaAcademica;
          $OfertaAcademica->periodo_academico = CarbonDate::now()->year.' - '.CarbonDate::now()->addYear()->year;
          $OfertaAcademica->id_asignatura = $asignatura['id'];
          $OfertaAcademica->id_seccion = $Seccion->id;
          $OfertaAcademica->save();

        }

      }

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function modifySeccion(Request $request){

    $resource = ApiHelper::resource();

    $validator= \Validator::make($request->input('seccion'),[
      'codigo' => "required",
      'cupos' => "required"
    ]);

    if($validator->fails()){
      ApiHelper::setError($resource, 0, 422, 'Verifique los campos de la sección modificada');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      $Seccion = Seccion::find($request->input('seccion.id'));
      $Seccion->codigo = $request->input('seccion.codigo');
      $Seccion->cupos = $request->input('seccion.cupos');
      $Seccion->save();

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function deleteSeccion(Request $request){

    $resource = ApiHelper::resource();

    DB::beginTransaction();

    try{

      $Seccion = Seccion::find($request->input('seccion.id'));
      $Seccion->delete();

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function getAllSecciones(Request $request){

    $resource = ApiHelper::resource();

    try{

      $secciones = Seccion::select('secciones.*',
                                    DB::raw('(select count(oa.id) from ofertas_academicas oa
                                                                left join clases c on oa.id = c.id_oferta_academica
                                                                where oa.id_seccion = secciones.id
                                                                AND c.id IS NULL) as rezagadas'),
                                    DB::raw('(select count(oa.id) from ofertas_academicas oa
                                                                inner join clases c on oa.id = c.id_oferta_academica
                                                                where oa.id_seccion = secciones.id) as agendadas'))
                            ->join('ofertas_academicas as oa', 'oa.id_seccion', 'secciones.id')
                            ->join('pensum as p', 'p.id', 'oa.id_asignatura')
                            ->where('p.id_trayecto_academico', $request->input('id_trayectoAca'))
                            ->distinct()
                            ->get()
                            ->toArray();

      $data  =  new Data($secciones);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function getClases(Request $request){

    $resource = ApiHelper::resource();

    try{

      $carga_academica = Seccion::find($request->input('id_seccion'))->carga_academica;

      $data  =  new Data($carga_academica);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function getAvailableSecciones(Request $request){

    $resource = ApiHelper::resource();

    try{

      $exists_secciones = $secciones_available = Seccion::select('secciones.*')
                            ->join('ofertas_academicas as oa', 'oa.id_seccion', 'secciones.id')
                            ->join('pensum as p', 'p.id', 'oa.id_asignatura')
                            ->where('p.id_trayecto_academico', $request->input('id_trayectoAca'))
                            ->distinct()
                            ->get()
                            ->isEmpty();

      $secciones_available = Seccion::select('secciones.*')
                            ->join('ofertas_academicas as oa', 'oa.id_seccion', 'secciones.id')
                            ->join('pensum as p', 'p.id', 'oa.id_asignatura')
                            ->where('p.id_trayecto_academico', $request->input('id_trayectoAca'))
                            ->withCount(['carga_academica', 'clases_agendadas'])
                            ->distinct()
                            ->with('carga_academica')
                            ->get()
                            ->filter(function($value) use ($exists_secciones){

                              if($exists_secciones === false)
                                $exists_secciones = true;

                              return $value->carga_academica_count == $value->clases_agendadas_count;
                            })
                            ->toArray();

      if(empty($secciones_available) && $exists_secciones === false){
        ApiHelper::setError($resource, 0, 422, 'No hay secciones con carga academica agendada');
        return $this->sendResponse($resource);
      }

      $data  =  new Data($secciones_available);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function getHorario(Request $request){

    $resource = ApiHelper::resource();

    try{

      $horario['horario'] = Seccion::find($request->input('seccion_id'))->clases_agendadas()->first()->horario;
      $horario['clases'] = Seccion::find($request->input('seccion_id'))->clases_agendadas;

      $data  =  new Data($horario);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function generateHorario(Request $request){

    $resource = ApiHelper::resource();

    $validator= \Validator::make($request->input('horario'),[
      'inicio' => "required",
      'fin' => "required",
      'division' => "required"
    ]);

    if($validator->fails()){
      ApiHelper::setError($resource, 0, 422, 'Verifique los campos.');
      return $this->sendResponse($resource);
    }

    try{

      // // Dias
      // $dias = explode(',', $_POST['days']);
      // // Contar dias
      $countdays = 6;
      //
      $name = strip_tags($request->input('horario.nombre'));
      $html_content = '';

      // Acomodar Dias
      $html_content .= '
      <h1 class="horario-name"><i class="fa fa-calendar" aria-hidden="true"></i><p class="lead" style="margin: 0;"> '.$name.'</p></h1>
      <table id="thetable" class="table table-bordered">
      <thead class="thead">
      <th class="horarioheader"><i class="fa fa-clock-o"></i> Horario</th>
      ';

    	$html_content .= '<th><i class="fa fa-angle-right"></i> Lunes</th>';
    	$html_content .= '<th><i class="fa fa-angle-right"></i> Martes</th>';
    	$html_content .= '<th><i class="fa fa-angle-right"></i> Miercoles</th>';
    	$html_content .= '<th><i class="fa fa-angle-right"></i> Jueves</th>';
    	$html_content .= '<th><i class="fa fa-angle-right"></i> Viernes</th>';

    	// $html_content .= '<th><i class="fa fa-angle-right"></i> Sabado</th>';
      //
    	// $html_content .= '<th><i class="fa fa-angle-right"></i> Domingo</th>';

      $html_content .= '</thead>
                      <tbody>';

      ///////////////////////////////////////////////////////
      // Hora Inicio 24 Horas
      $inicio24 = date('G:i', strtotime($request->input('horario.inicio')));

      // Hora Final 24 Horas
      $final24 = date('G:i', strtotime($request->input('horario.fin')));

      ///////////////////////////////////////////////////////
      $this->sumtime($inicio24,$final24,$request->input('horario.division'),$countdays);
      $html_content .= $this->html_horario;
      ///////////////////////////////////////////////////////
      $html_content .= '</tbody>
                      </table>
                      <input type="hidden" id="descripcioninput" value="'.$request->input('horario.descripcion').'">
                      <input type="hidden" id="nombreinput" value="'.$request->input('horario.nombre').'">
      ';

      $data  =  new Data(['content' => $html_content]);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function sumtime($in,$fin,$minutos,$columnas){

    $parse1 = new CarbonDate($in);
    $parse2 = new CarbonDate($fin);

    if ($parse2 <= $parse1){

      return;
    }else{

      $time = new CarbonDate($in);
      $time->add(new DateInterval('PT' . $minutos . 'M'));
      $stamp = $time->format('h:i a');
      $format24 = $time ->format('G:i');
      $uniq = str_replace(' ', '', str_replace(':', '', $stamp));
      $reverse = strrev($uniq);

      $this->html_horario .= '<tr id="tr'.sha1($in).'" style="height: 50px">
                                <td class="td-time">
                                  <div id="parent'.sha1($in).'" class="timeblock">
                                  <strong id="data'.sha1($in).'">'.date('h:i a', strtotime($in)). ' - ' .$stamp.'</strong>
                                </td>';

      for ($i=1; $i < $columnas; $i++){

        $this->html_horario .= '<td class="td-line td-'.$i.'" data-Rcoordinate="'.$i.'">
                                  <div id="'.$reverse.$i.'" class="col-sm-12 nopadding"></div>
                                  <div class="col-sm-12 text-center">
                                    <button style="margin: 0;" id="edit-'.$reverse.$i.'" data-row="'.$reverse.$i.'" class="addinfo btn btn-xs btn-primary"><i class="fa fa-plus"></i></button>
                                  </div>
                                </td>';
      }

      $this->html_horario .= '</tr>';
      $this-> resum($format24,$fin,$minutos,$columnas);
    }
  }

  public function resum($in,$fin,$minutos,$columnas){

    $time = new CarbonDate($in);
    $time->add(new DateInterval('PT' . $minutos . 'M'));
    $stamp = $time->format('h:i a');
    $format24 = $time ->format('G:i');

    $uniq = str_replace(' ', '', str_replace(':', '', $stamp));
    $reverse = strrev($uniq);

    $this->html_horario .= '<tr id="tr'.sha1($in).'" style="height: 50px">
                              <td class="td-time">
                                <div id="parent'.sha1($in).'" class="timeblock">
                                  <strong id="data'.sha1($in).'">'.date('h:i a', strtotime($in)). ' - ' .$stamp.'</strong>
                                </div>
                              </td>';

    for ($i=1; $i < $columnas; $i++){

      $this->html_horario .= '<td class="td-line td-'.$i.'" data-Rcoordinate="'.$i.'">
                               <div id="'.$reverse.$i.'" class="col-sm-12 nopadding"></div>
                               <div class="col-sm-12 text-center">
                                  <button style="margin: 0;" id="edit-'.$reverse.$i.'" data-row="'.$reverse.$i.'" class="addinfo btn btn-xs btn-primary"><i class="fa fa-plus"></i></button>
                               </div>
                             </td>';
    }

    $this->html_horario .= '</tr>';

    $this->sumtime($format24,$fin,$minutos,$columnas);
  }

  function checkClassAvailability(Request $request){

    $resource = ApiHelper::resource();
    $inicio = $request->input('inicio');
    $final = $request->input('final');

    $existsClases = Clase::where('dia', $request->input('dia'))
                          ->where('id_aula', $request->input('aula_id'))
                          ->where(function($query) use ($inicio, $final){

                            $query->where(function($query) use ($inicio, $final){
                              $query->where('inicio', '<=', $inicio);
                              $query->where('final', '>=', $inicio);
                            });

                            $query->orWhere(function($query) use ($inicio, $final){
                              $query->where('inicio', '>=', $final);
                              $query->where('final', '<=', $final);
                            });
                          })
                          ->first();

    if($existsClases != null){
      $data  =  new Data($existsClases);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::setError($resource, 0, 422, 'Ya existe una clase agendada en esa aula en esa hora.');
      return $this->sendResponse($resource);
    }

  }

  function checkHourAvailability(Request $request){

    $resource = ApiHelper::resource();
    dd($request->input('id_clase'));
    $existsClases = Clase::where('dia', $request->input('dia'))
                          ->where('id_aula', $request->input('aula_id'))
                          ->where(function($query) use ($inicio, $final){

                            $query->where(function($query) use ($inicio, $final){
                              $query->where('inicio', '<=', $inicio);
                              $query->where('final', '>=', $inicio);
                            });

                            $query->orWhere(function($query) use ($inicio, $final){
                              $query->where('inicio', '>=', $final);
                              $query->where('final', '<=', $final);
                            });
                          })
                          ->first();

    if($existsClases != null){
      $data  =  new Data($existsClases);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::setError($resource, 0, 422, 'Ya existe una clase agendada en esa aula en esa hora.');
      return $this->sendResponse($resource);
    }

  }

  public function saveHorario(Request $request){

    $resource = ApiHelper::resource();
    $horario = $request->input('horario');

    $validator= \Validator::make($horario,[
      'nombre' => "required",
      'descripcion' => "required",
      'inicio' => "required",
      'fin' => "required",
      'division' => "required"
    ]);

    if($validator->fails()){
      ApiHelper::setError($resource, 0, 422, 'Verifique los campos.');
      return $this->sendResponse($resource);
    }

    if(count($horario['clases']) == 0){
      ApiHelper::setError($resource, 2, 422, 'No ha asignado ninguna clase.');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      $newHorario = new Horario;
      $newHorario->nombre = $horario['nombre'];
      $newHorario->descripcion = $horario['descripcion'];
      $newHorario->horario = $horario['horario'];
      $newHorario->inicio = CarbonDate::parse($horario['inicio'])->toTimeString();
      $newHorario->fin = CarbonDate::parse($horario['fin'])->toTimeString();
      $newHorario->division = $horario['division'];
      $newHorario->save();

      foreach($horario['clases'] as $clase){

        $newClase = new Clase;
        $newClase->codigo = $clase['codigo'];
        $newClase->dia = $clase['dia'];
        $newClase->inicio = CarbonDate::parse($clase['inicio'])->toTimeString();
        $newClase->final = CarbonDate::parse($clase['final'])->toTimeString();
        $newClase->bloques = $clase['bloques'];
        $newClase->id_aula = $clase['aula_id'];
        $newClase->id_oferta_academica = $clase['id_clase'];
        $newClase->id_horario = $newHorario->id;
        $newClase->save();

      }

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function modifyHorario(Request $request){

    $resource = ApiHelper::resource();
    $horario = $request->input('horario');
    $clases = collect($request->input('clases'));

    $validator= \Validator::make($horario,[
      'nombre' => "required",
      'descripcion' => "required",
      'inicio' => "required",
      'fin' => "required",
      'division' => "required"
    ]);

    if($validator->fails()){
      ApiHelper::setError($resource, 0, 422, 'Verifique los campos del formulario.');
      return $this->sendResponse($resource);
    }

    if(count($clases) == 0){
      ApiHelper::setError($resource, 2, 422, 'No ha agendado ninguna clase.');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      $modifiedHorario = Horario::find($horario['id']);
      $modifiedHorario->nombre = $horario['nombre'];
      $modifiedHorario->descripcion = $horario['descripcion'];
      $modifiedHorario->horario = $horario['horario'];
      $modifiedHorario->inicio = CarbonDate::parse($horario['inicio'])->toTimeString();
      $modifiedHorario->fin = CarbonDate::parse($horario['fin'])->toTimeString();
      $modifiedHorario->division = $horario['division'];
      $modifiedHorario->save();

      $to_detach = $modifiedHorario->clases->diff(Clase::whereIn('id', $clases->pluck('id'))->get());
      $modifiedHorario->clases()->whereIn('id', $to_detach->pluck('id'))->delete();

      $to_attach = Arr::where($request->input('clases'), function ($value, $key){
                                                            if(!isset($value['id'])){
                                                              return $value;
                                                            };
                                                          });

      foreach($to_attach as $class_attach){
        $modifiedHorario->clases()->create(['codigo' => $class_attach['codigo'],
                                            'dia' => $class_attach['dia'],
                                            'inicio' => CarbonDate::parse($class_attach['inicio'])->toTimeString(),
                                            'final' => CarbonDate::parse($class_attach['final'])->toTimeString(),
                                            'bloques' => $class_attach['bloques'],
                                            'id_aula' => $class_attach['aula_id'],
                                            'id_oferta_academica' => $class_attach['id_clase'],
                                            'created_at' => CarbonDate::now(),
                                            'updated_at' => CarbonDate::now()
                                          ]);
      }

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

}
