<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use Carbon\Carbon as DateTime;
use App\Traits\ApiController;
use App\Http\Resources\Data as Data;
use App\Models\Pensum;
use App\Models\Trayecto;
use App\Models\Prelacion;

class PensumController extends Controller{

    use ApiController;

    public function registrar(Request $request){

    	$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all()['pensum'],[
	        'id_trayecto' => "required",
	        'id_materia' => "required",
	        'cod_asignatura' => "required",
          'denominacion_asignatura' => "required",
	        'caracter_uc' => "required",
	        'hps' => "required",
	        'ht' => "required",
	        'uc' => "required"
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Pensum = new Pensum;

			$Pensum->codigo = $request->input('pensum.cod_asignatura');
			$Pensum->desc_asignatura = $request->input('pensum.denominacion_asignatura');
			$Pensum->anio = DateTime::now()->year;
			$Pensum->hps = $request->input('pensum.hps');
			$Pensum->ht = $request->input('pensum.ht');
			$Pensum->N = $request->input('pensum.caracter_uc');
			$Pensum->UC = $request->input('pensum.uc');
			$Pensum->id_materia = $request->input('pensum.id_materia');
			$Pensum->id_trayecto_academico = $request->input('pensum.id_trayecto');
			$Pensum->save();

			if(isset($request->prelaciones)){

        $prelaciones = new Prelacion;

				foreach($request->prelaciones as $prelacion) {

		        	$prelaciones::insert([
		        		'id_preler' =>  $prelacion,
		        		'id_preled' => $Pensum->id,
		        		'created_at' => DateTime::now(),
		        		'updated_at' => DateTime::now()
		        	]);

		        }

			}

      ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

    }

    public function actualizar(Request $request){

    	$resource = ApiHelper::resource();

    	if($request->input('hps') !== null){

    		$validator= \Validator::make($request->all(),[
				'hps' => "required|numeric|max:20",
		        'ht' => "required|numeric"
			]);
    	}else if($request->input('N') !== null){

    		$validator= \Validator::make($request->all(),[
				'N' => "required|string|max:2"
			]);
    	}else if($request->input('UC') !== null){

    		$validator= \Validator::make($request->all(),[
				'UC' => "required|numeric|max:10"
			]);
    	}

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Pensum = Pensum::find($request->input('carrera'));

			if($request->input('hps') !== null){

				$Pensum->hps = $request->input('hps');
				$Pensum->ht = $request->input('ht');

	    	}else if($request->input('N') !== null){

	    		$Pensum->N = $request->input('N');

	    	}else if($request->input('UC') !== null){

				$Pensum->UC = $request->input('UC');

	    	}

	    	$Pensum->save();

	        ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

    }

    public function cargarAsignaturas(Request $request){

      $resource = ApiHelper::resource();

      $validator= \Validator::make($request->all(),[
  	        'id_carrera' => "required"
  		]);

  		if($validator->fails()){
  			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
  			return $this->sendResponse($resource);
  		}

      try{

      	$asignaturas = Pensum::select('pensum.*', 'ta.trayecto', 'carreras.codcarrera', "carreras.tipo", 'materias.materia')
                							->join('materias', 'materias.id', '=', 'pensum.id_materia')
                							->join('trayecto_academico as ta', 'ta.id', '=', 'pensum.id_trayecto_academico')
                							->join('carreras', 'carreras.id', '=', 'ta.id_carrera')
                							->where('anio', '=', '2021')
                							->where('id_carrera', '=', $request->input('id_carrera'))
                							->orderBy('pensum.desc_asignatura', "ASC")
              								->get()
              								->toArray();
        //¡¡¡CORREGIR CUESTION DEL ANIO!!!!
  	    $html_content = '<table cellpadding="0" align="center" border = "0" width="100%" id="tabla_pensum">';

  	    $total_hps = 0;
  	    $total_ht = 0;
  	    $total_uc = 0;

  	    for($x = 0; $x < count($asignaturas); $x++){

  	        if($x == 0 || $asignaturas[$x]['trayecto'] != $asignaturas[$x-1]['trayecto']){
  	            $html_content .= "
  	                <tr class='alert-info'>
  		                <td style='text-align: center;'>
  		                    <FONT FACE=\"Helvetica\" SIZE=4>
  		                        ".(!is_numeric($asignaturas[$x]['trayecto'])? "Trayecto inicial - TI":"Trayecto ".$asignaturas[$x]['trayecto'])."
  		                    </FONT>
  		                </td>
  		                <td>
  		                </td>
  		                <td>
  		                </td>
  		                <td>
  		                </td>
  		                <td>
  		                </td>
  		                <td>
  		                </td>
  		                <td>
  		                </td>
  	                </tr>
  	                <tr>
  	                    <th width='15%'' style='text-align: center;'>Código</th>
  	                    <th width='55%' style='text-align: left;'>Unidad Curricular</th>
  	                    <th width='5%' style='text-align: center;'>HPS</th>
  	                    <th width='5%' style='text-align: center;'>HT</th>
  	                    <th width='5%' style='text-align: center;'>N</th>
  	                    <th width='5%' style='text-align: center;'>UC</th>
  	                    <th width='5%' style='text-align: center;'>Prelación</th>
  	                </tr>
  	            ";
  	        }

  	        if(array_key_exists($x+1, $asignaturas)){
  	        	$subrayado = $asignaturas[$x]['trayecto']!=$asignaturas[$x+1]['trayecto']?"subrayado":"";
  	        }else{
  	        	$subrayado = "subrayado";
  	        }

  	        $total_hps += $asignaturas[$x]['hps'];
  	        $total_ht += $asignaturas[$x]['ht'];
  	        $total_uc += $asignaturas[$x]['UC'];

  	        $prelaciones = Pensum::find($asignaturas[$x]['id'])->prelaciones;
  	        $prelas = '';

  	        foreach($prelaciones as $id => $prelacion){
  	        	$prelas .= " ".Prelacion::find($prelacion['id'])->prelas->codigo;
  	        }

  	        $html_content .= "
  	                <tr class=\"asignaturas anio-".$asignaturas[$x]['trayecto']."\" id=\"".$asignaturas[$x]['id']."\">
  	                    <td style='text-align: center;' class=".$subrayado.">
  	                        <font FACE=\"Helvetica\" SIZE=1>
  	                            ".$asignaturas[$x]['codcarrera']."-".$asignaturas[$x]['codigo']."
  	                        </font>
  	                    </td>
  	                    <td class=".$subrayado.">
  	                        <font FACE=\"Helvetica\" SIZE=3>
  	                            ".($asignaturas[$x]['desc_asignatura']=='default'? $asignaturas[$x]['materia']:$asignaturas[$x]['desc_asignatura'])."
  	                        </font>
  	                    </td>
  	                    <td style='text-align: center;' class=\"horas_semana ".$subrayado."\" id=\"hs\" onclick=\"modificarAsignatura(this);\">
  	                        <font FACE=\"Helvetica\" SIZE=3 id=\"horas_semana\">
  	                            ".$asignaturas[$x]['hps']."
  	                        </font>
  	                    </td>
  	                    <td style='text-align: center;' class=".$subrayado.">
  	                        <font FACE=\"Helvetica\" SIZE=3 id=\"horas_totales\">
  	                            ".$asignaturas[$x]['ht']."
  	                        </font>
  	                    </td>
  	                    <td style='text-align: center;' class=\"".$subrayado."\" id=\"n\" onclick=\"modificarAsignatura(this);\">
  	                        <font FACE=\"Helvetica\" SIZE=3 id=\"N\">
  	                            ".$asignaturas[$x]['N']."
  	                        </font>
  	                    </td>
  	                    <td style='text-align: center;' class=\"".$subrayado."\" id=\"uc\" onclick=\"modificarAsignatura(this);\">
  	                        <font FACE=\"Helvetica\" SIZE=3 id=\"uc\">
  	                            ".$asignaturas[$x]['UC']."
  	                        </font>
  	                    </td>
  	                    <td style='text-align: center;' class=\"".$subrayado."\">
  	                        <font FACE=\"Helvetica\" SIZE=3 id=\"prelacion\">
  	                            ".$prelas."
  	                        </font>
  	                    </td>
  	                </tr>
  	            ";

  	        if((!array_key_exists($x+1, $asignaturas)) || ($asignaturas[$x]['trayecto'] != $asignaturas[$x+1]['trayecto'])){

  	        	if(array_key_exists($x+1, $asignaturas)){
  	        		$subrayado = $asignaturas[$x]['trayecto']!=$asignaturas[$x+1]['trayecto']?"subrayado":"";
  		        }else{
  		        	$subrayado = "subrayado";
  		        }

  	            $html_content .= '
  	                <tr class="total-anio-'.$asignaturas[$x]['trayecto'].'">
  	                    <td class="'.$subrayado.'">
  	                    </td>
  	                    <td style="text-align: right;" class="'.$subrayado.'">
  	                        <FONT FACE="Helvetica" SIZE=3>
  	                            <b>Total Horas por Semana</b>
  	                        </FONT>
  	                    </td>
  	                    <td style="text-align: center;" class="'.$subrayado.'">
  	                        '.$total_hps.'
  	                    </td>
  	                    <td style="text-align: center;" class="'.$subrayado.'">
  	                        '.$total_ht.'
  	                    </td>
  	                    <td style="text-align: center;" class="'.$subrayado.'">

  	                    </td>
  	                    <td style="text-align: center;" class="'.$subrayado.'">
  	                        '.$total_uc.'
  	                    </td>
  	                    <td style="text-align: center;" class="'.$subrayado.'">

  	                    </td>
  	                </tr>
  	            ';

  	            $total_hps = 0;
  	            $total_ht = 0;
  	            $total_uc = 0;
  	        }

  	    }

  	    $html_content .= '</table></center>';

  	    $html_content .= '
  	        <table border="01" width="50%" align="right" style="font-size: 11px;">
  	            <tr>
  	                <td style="border-bottom: 0px; border-right: 0px;">HPS: Horas por Semana</td>
  	                <td style="border-bottom: 0px; border-left: 0px;">UC: Unidades de Crédito</td>
  	            </tr>
  	            <tr>
  	                <td style="border-top: 0px; border-right: 0px;">HT: Horas totales por Periodo Academico</td>
  	                <td style="border-top: 0px; border-left: 0px;"></td>
  	            </tr>
  	        </table>
  	    ';

        $data  =  new Data(['content' => $html_content]);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){
        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

    public function cargarAsignaturasByTrayecto(Request $request){

      $resource = ApiHelper::resource();

      $validator= \Validator::make($request->all(),[
  	        'id_trayecto' => "required"
  		]);

  		if($validator->fails()){
  			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
  			return $this->sendResponse($resource);
  		}

      try{

      	$asignaturas = Pensum::select('pensum.*', 'ta.trayecto', 'carreras.codcarrera', "carreras.tipo", 'materias.materia')
                							->join('materias', 'materias.id', '=', 'pensum.id_materia')
                							->join('trayecto_academico as ta', 'ta.id', '=', 'pensum.id_trayecto_academico')
                							->join('carreras', 'carreras.id', '=', 'ta.id_carrera')
                							->where('id_trayecto_academico', '=', $request->input('id_trayecto'))
                							->orderBy('pensum.desc_asignatura', "ASC")
              								->get()
                              ->toArray();

        $data  =  new Data($asignaturas);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){
        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

    public function nuevo(Request $request){

    	$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'carrera' => "required",
	        'anio' => "required"
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			if(Pensum::selectRaw('DISTINCT anio')->where('anio', '=', $request->input('anio'))->get()->toArray()){

				ApiHelper::setError($resource, 0, 220, 'Ya existe el pensum del año '.$request->input('anio').'.');
				return $this->sendResponse($resource);
			}

			$Pensum_nuevo = Pensum::selectRaw("pensum.codigo, pensum.desc_asignatura, ".$request->input('anio')." as anio, pensum.hps, pensum.ht, pensum.\"N\", pensum.\"UC\", pensum.prelacion, pensum.id_materia, pensum.id_trayecto, pensum.id_carrera")
									->where('id_carrera', '=', $request->input('carrera'))
									->where('anio', '=', function($query){
										$query->selectRaw('max(anio) from pensum');
									})
									->get()
									->toArray();

			Pensum::insert($Pensum_nuevo);

	        ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

    }

    public function cargarPreladoras(Request $request){

    	$preladoras = Pensum::select('pensum.*', 'trayectos.trayecto', 'carreras.codcarrera', "carreras.tipo", 'materias.materia')
    							->join('materias', 'materias.id', '=', 'pensum.id_materia')
    							->join('trayecto_academico', 'trayecto_academico.id', '=', 'pensum.id_trayecto_academico')
    							->join('carreras', 'carreras.id', '=', 'trayecto_academico.id_carrera')
    							->join('trayectos', 'trayectos.id', '=', 'trayecto_academico.id_trayecto')
    							->where('anio', '=', $request->input('anio'))
    							->where('id_carrera', '=', $request->input('id_carrera'))
    							->where('trayecto', '=', $request->input('trayecto') == '1' || $request->input('trayecto') == 'TI'? '':($request->input('trayecto')-1))
    							->orderBy('trayectos.trayecto', "ASC")
    							->orderBy('pensum.desc_asignatura', "ASC")
								->get()
								->toArray();

    	return $this->sendResponse($preladoras);

    }

}
