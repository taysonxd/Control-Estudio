<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon as DateTime;
use App\Models\Profesor;
use App\Models\Persona;
use App\Models\Carrera;
use App\Models\TrayectoAcademico;
use App\Models\Pensum;

class ProfesorController extends Controller
{

    use ApiController;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $profesor=new Profesor;
        return $profesor->with([
            'persona' => function ($q) {
                $q->select(['id', 'nombre_uno', 'nombre_dos']);
            }
        ])->get();
    }

    public function verificarExistencia(Request $request){

      $resource = ApiHelper::resource();

      try{

        $existe = DB::table('profesores_bd')
                      ->where('cedula', $request->input('cedula'))
                      ->first();

        $data  =  new Data([$existe]);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){

        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){

    	$resource = ApiHelper::resource();

  		$validator= \Validator::make($request->all()['profesor'],[
  			'cedula'    => 'required|unique:personas',
  			'nacionalidad' => 'required',
  			'sexo'     => 'required',
  			'nombre_uno' => 'required',
  			'nombre_dos' => 'required',
  			'apellido_uno' => 'required',
  			'apellido_dos' => 'required',
  			'email'    => 'required|unique:users,email',
  			'fecha_nac' => 'required',
  			'id_provincia_nac' => 'required',
  			'id_parroquia' => 'required',
  			'direccion'=> 'nullable'
  		]);

  		if($validator->fails()){
  			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
  			return $this->sendResponse($resource);
  		}

  		DB::beginTransaction();

  		try{

  	    $Persona = new Persona();
  	    $Persona->nacionalidad  = $request->input('profesor.nacionalidad');
  	    $Persona->cedula  = $request->input('profesor.cedula');
  	    $Persona->sexo  = strtoupper($request->input('profesor.sexo'));
  	    $Persona->nombre_uno  = strtoupper($request->input('profesor.nombre_uno'));
  	    $Persona->nombre_dos  = strtoupper($request->input('profesor.nombre_dos'));
  	    $Persona->apellido_uno  = strtoupper($request->input('profesor.apellido_uno'));
  	    $Persona->apellido_dos  = strtoupper($request->input('profesor.apellido_dos'));
  	    $Persona->email  = $request->input('profesor.email');
  	    $Persona->fecha_nac  = $request->input('profesor.fecha_nac');
  	    $Persona->id_provincia_nac  = $request->input('profesor.id_provincia_nac');
  	    $Persona->id_parroquia  = $request->input('profesor.id_parroquia');
  	    $Persona->local_direccion  = $request->input('profesor.direccion');

  	    $Persona->save();

  	    $Profesor = new Profesor();
  	    $Profesor->id_persona = $Persona->id;

  	    $Profesor->save();

        foreach($request->input('profesor.asignaturas_impartir') as $trayecto){

          foreach($trayecto as $asignatura){

            $Profesor->asignaturas_impartidas()->attach($asignatura, ['created_at' => DateTime::now(), 'updated_at' => DateTime::now()]);

          }
        }

  	    DB::commit();
  	    ApiHelper::success($resource);
  		}catch(\Exception $e) {
  			DB::rollback();
  			ApiHelper::setException($resource, $e);
  		}

  		return $this->sendResponse($resource);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function lista(){

      $profesores = Persona::selectRaw("personas.cedula, CONCAT(personas.nombre_uno,' ',personas.nombre_dos) as nombres, CONCAT(personas.apellido_uno,' ',personas.apellido_dos) as apellidos, personas.nacionalidad, municipios.municipio, parroquias.parroquia, personas.created_at as fecha_registro, personas.email, personas.id as id_persona, profesores.id as id_profesor")
              							->join("profesores", "profesores.id_persona", "=", "personas.id")
              							->join("parroquias", "parroquias.id", "=", "personas.id_parroquia")
              							->join("municipios", "municipios.id", "=", "parroquias.id_municipio")
              							->orderBy('cedula', "DESC")
          				          ->get();

    	$profesores = new Data($profesores);

    	return $this->sendResponse($profesores);
    }

    public function getProfesor(request $request){

      $resource = ApiHelper::resource();

      try{

        $profesor = Profesor::select('profesores.id','p.id as id_persona', 'p.cedula', 'p.nacionalidad', 'p.sexo', 'p.nombre_uno',
																						'p.nombre_dos', 'p.apellido_uno', 'p.apellido_dos',
																						'p.email', 'p.fecha_nac', 'p.fecha_nac', 'p.id_provincia_nac',
																						'pa.id as id_pais', 'p.id_parroquia', 'mu.id as id_municipio', 'es.id as id_estado',
																						'p.local_direccion as direccion')
										                    		->join('personas as p', 'profesores.id_persona', '=', 'p.id')
																						->join('parroquias as par', 'p.id_parroquia', '=', 'par.id')
																						->join('municipios as mu', 'par.id_municipio', '=', 'mu.id')
																						->join('estados as es', 'mu.id_estado', '=', 'es.id')
																						->join('provincias as pro', 'p.id_provincia_nac', '=', 'pro.id')
																						->join('paises as pa', 'pro.id_pais', '=', 'pa.id')
																						->where('p.id', $request->input('id_persona'))
										                        ->first();

        $profesor->impartidas = $this->getAsignaturasImpartidas($profesor);
        $data  =  new Data($profesor);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){

        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

    public function getAsignaturasImpartidas($profesor){

      $id_trayectos_academicos = $profesor->asignaturas_impartidas()->get()->pluck('id_trayecto_academico')->unique()->toArray();
      $trayectos_impartidos = TrayectoAcademico::whereIn('id', $id_trayectos_academicos)->get();
      $impartidas = [];

      foreach($trayectos_impartidos as $trayecto_i){

        $carreras = Carrera::with(['trayectosAcademicos', 'trayectosAcademicos.asignaturas'])->get();
        $trayectos_carrera = [];
        $asignaturas_trayecto = [];

        foreach ($carreras as $carrera){

          if($carrera->id == $trayecto_i->id_carrera){

            $trayectos_carrera = $carrera->trayectosAcademicos;

            foreach ($trayectos_carrera as $trayecto_c){

              if($trayecto_c->id == $trayecto_i->id){

                $trayecto_c->selected = true;
                $asignaturas_trayecto = $trayecto_c->asignaturas;

                foreach ($asignaturas_trayecto as $asignatura){
                  if($profesor->asignaturas_impartidas->contains($asignatura))
                    $asignatura->selected = true;
                }
              }
            }

            array_push($impartidas, ['id_carrera' => $carrera->id, 'carreras' => $carreras, 'trayectos_aca' => $trayectos_carrera, 'asignaturas' => $asignaturas_trayecto]);
          }
        }
      }

      return $impartidas;

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){

      $resource = ApiHelper::resource();

      $validator= \Validator::make($request->all()['profesor'],[
  			'cedula'    => 'required|unique:personas,cedula,'.$request->input("profesor.id_persona"),
  			'nacionalidad' => 'required',
  			'sexo'     => 'required',
  			'nombre_uno' => 'required',
  			'nombre_dos' => 'required',
  			'apellido_uno' => 'required',
  			'apellido_dos' => 'required',
  			'email'    => 'required|unique:personas,email,'.$request->input("profesor.id_persona"),
  			'fecha_nac' => 'required',
  			'id_provincia_nac' => 'required',
  			'id_parroquia' => 'required',
  			'direccion'=> 'nullable'
  		]);

  		if($validator->fails()){
  			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
  			return $this->sendResponse($resource);
  		}

  		try{

  			$Persona = Persona::find($request->input("profesor.id_profesor"));

        $Persona->nacionalidad  = $request->input('profesor.nacionalidad');
  	    $Persona->cedula  = $request->input('profesor.cedula');
  	    $Persona->sexo  = strtoupper($request->input('profesor.sexo'));
  	    $Persona->nombre_uno  = strtoupper($request->input('profesor.nombre_uno'));
  	    $Persona->nombre_dos  = strtoupper($request->input('profesor.nombre_dos'));
  	    $Persona->apellido_uno  = strtoupper($request->input('profesor.apellido_uno'));
  	    $Persona->apellido_dos  = strtoupper($request->input('profesor.apellido_dos'));
  	    $Persona->email  = $request->input('profesor.email');
  	    $Persona->fecha_nac  = $request->input('profesor.fecha_nac');
  	    $Persona->id_provincia_nac  = $request->input('profesor.id_provincia_nac');
  	    $Persona->id_parroquia  = $request->input('profesor.id_parroquia');
  	    $Persona->local_direccion  = $request->input('profesor.direccion');

  	    $Persona->save();

        ApiHelper::success($resource);

  		}catch(\Exception $e){

  			ApiHelper::setException($resource, $e);

  		}

  		return $this->sendResponse($resource);

    }

    public function updateAsignaturasImpartidas(Request $request){

      $resource = ApiHelper::resource();

      DB::beginTransaction();
  		try{

  			$profesor = Profesor::find($request->input("id_profesor"));

        $to_detach = $profesor->asignaturas_impartidas->diff(Pensum::whereIn('id', $request->input("asignaturas"))->get());
        $to_attach = Pensum::whereIn('id', $request->input("asignaturas"))->get()->diff($profesor->asignaturas_impartidas);

        foreach($to_detach as $asig_detach){
          $profesor->asignaturas_impartidas()->detach($asig_detach->id);
        }

        foreach($to_attach as $asig_attach){
          $profesor->asignaturas_impartidas()->attach($asig_attach->id, ['created_at' => DateTime::now(), 'updated_at' => DateTime::now()]);
        }

        DB::commit();
        $data  =  new Data($this->getAsignaturasImpartidas($profesor));
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
  		}catch(\Exception $e){
        DB::rollback();
  			ApiHelper::setException($resource, $e);

  		}

  		return $this->sendResponse($resource);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request){

      $resource = ApiHelper::resource();

      try{

        $profesor = Profesor::where('id_persona', $request->input('id_persona'))->first();
        $profesor->persona->delete();
        $profesor->delete();

        ApiHelper::success($resource);
      }catch(\Exception $e){
        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }
}
