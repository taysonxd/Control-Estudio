<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Localizacion as Localizacion;
use App\Models\Persecuencia;
use App\Models\Seccion;

class PersecuenciaController extends Controller{

    use ApiController;

    public function crear(Request $request){

    	$resource = ApiHelper::resource();

  		$validator= \Validator::make($request->all()['persecuencia'],[
        'id_trayectoAca' => "required"
  		]);

  		for($i = 0; $i < count($request->input('persecuencia.secciones')); $i++){

  			$validator2= \Validator::make($request->input('persecuencia.secciones.'.$i),[
  				'cod_seccion' => "required",
  				'cupos' => "required"
  			]);

  			if($validator2->fails()){
  				break;
  			}

  		}

  		if($validator->fails()){
  			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
  			return $this->sendResponse($resource);
  		}

      if(count($request->input('persecuencia.asignaturas')) == 0){
  			ApiHelper::setError($resource, 2, 422, 'No ha seleccionado asignatura para asignar.');
  			return $this->sendResponse($resource);
  		}

  		if($validator2->fails()){
  			ApiHelper::setError($resource, 3, 422, 'Verifique los campos de sección');
  			return $this->sendResponse($resource);
  		}
      dd($request->input('persecuencia'));
  		DB::beginTransaction();

  		try{

  			$Persecuencia = new Persecuencia;

  			$Persecuencia->cohorte = $request->input('cohorte');
  			$Persecuencia->id_carrera = $request->input('carrera');
  			$Persecuencia->id_trayecto = $request->input('trayecto');

  			$Persecuencia->save();

  			foreach($request->input('secciones') as $seccion){

  				$Seccion = new Seccion;

  				$Seccion->codigo = $seccion['codigo'];
  				$Seccion->cupos = $seccion['cupos'];
  				$Seccion->id_persecuencia = $Persecuencia->id;

  				$Seccion->save();

  			}

  			DB::commit();
  			ApiHelper::success($resource);

  		}catch(\Exception $e){

  			DB::rollback();
  			ApiHelper::setException($resource, $e);

  		}

  		return $this->sendResponse($resource);

    }

    public function actualizar(Request $request){

    	$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'cohorte' => "required",
	        'carrera' => "required",
	        'trayecto' => "required"
		]);

		for($i = 0; $i < count($request->input('secciones')); $i++){

			$validator2= \Validator::make($request->input('secciones.'.$i),[
				'codigo' => "required",
				'cupos' => "required"
			]);

			if($validator2->fails()){

				break;
			}

		}

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		if($validator2->fails()){
			ApiHelper::setError($resource, 0, 422, $validator2->errors()->all());
			return $this->sendResponse($resource);
		}

		DB::beginTransaction();

		try{

			$Persecuencia = Persecuencia::find($request->input('id'));

			$Persecuencia->cohorte = $request->input('cohorte');
			$Persecuencia->id_carrera = $request->input('carrera');
			$Persecuencia->id_trayecto = $request->input('trayecto');

			$Persecuencia->save();

			foreach($request->input('secciones') as $seccion){

				$Seccion = Seccion::find($seccion['id']);

				$Seccion->codigo = $seccion['codigo'];
				$Seccion->cupos = $seccion['cupos'];
				$Seccion->id_persecuencia = $Persecuencia->id;

				$Seccion->save();

			}

			DB::commit();
			ApiHelper::success($resource);

		}catch(\Exception $e){

			DB::rollback();
			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

    }

    public function lista(){

    	$persecuencias = Persecuencia::selectRaw('persecuencias.*, carreras.carrera, trayectos.trayecto')
    									->join('carreras', 'carreras.id', '=', 'persecuencias.id_carrera')
    									->join('trayectos', 'trayectos.id', '=', 'persecuencias.id_trayecto')
										->orderBy('cohorte', "DESC")
										->get();

    	$persecuencias = new Localizacion($persecuencias);
    	return $this->sendResponse($persecuencias);

    }

}
