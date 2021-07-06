<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data;
use App\Models\Trayecto;
use App\Models\TrayectoAcademico;

class TrayectoController extends Controller
{
   	use ApiController;

	public function registrar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
      'trayecto.trayecto' => 'required',
			'trayecto.id_carrera' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

      if(count($request->input("trayecto.id_carrera")) > 1){

				foreach($request->input("trayecto.id_carrera") as $carrera){

					$trayectoAcademico = new TrayectoAcademico();
					$trayectoAcademico->trayecto = $request->input("trayecto.trayecto");
          $trayectoAcademico->ti = $request->input("trayecto.ti");
					$trayectoAcademico->id_carrera = $carrera;
					$trayectoAcademico->save();

				}

      }else{

        $trayectoAcademico = new TrayectoAcademico();
        $trayectoAcademico->trayecto = $request->input("trayecto.trayecto");
        $trayectoAcademico->ti = $request->input("trayecto.ti");
        $trayectoAcademico->id_carrera = $request->input("trayecto.id_carrera")[0];
        $trayectoAcademico->save();

      }

      ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

	public function actualizar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'trayecto.trayecto' => 'required',
      'trayecto.id_carrera' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$trayectoAcademico = TrayectoAcademico::find($request->input("trayecto.id"));

			$trayectoAcademico->trayecto = $request->input("trayecto.trayecto");
      $trayectoAcademico->ti = $request->input("trayecto.ti");
      $trayectoAcademico->id_carrera = $request->input("trayecto.id_carrera");
			$trayectoAcademico->save();

      ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

  public function delete(Request $request)
    {
        $resource = ApiHelper::resource();

        try{

          $trayecto = TrayectoAcademico::find($request->input('trayecto_id'));
          $trayecto->delete();

          ApiHelper::success($resource);
        }catch(\Exception $e){
          ApiHelper::setException($resource, $e);
        }

        return $this->sendResponse($resource);
    }

    public function lista(Request $request){

      $resource = ApiHelper::resource();

      try{

        $trayectos = TrayectoAcademico::select('trayecto_academico.*', 'ca.*')
                                        ->join('carreras as ca', 'trayecto_academico.id_carrera', 'ca.id')
                                        ->get();

        $data = new Data($trayectos);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){
        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);
    }

    public function getTrayectoByCarrera(Request $request){

      $resource = ApiHelper::resource();

      try{

        $trayectos = TrayectoAcademico::where('id_carrera', $request->input('id_carrera'))
                                      ->get();

        $data = new Data($trayectos);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){
        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);
    }

    public function selectorTrayectoAcademico(Request $request){

    	$carreras = Trayecto::select('trayecto_academico.*')
              						->join('trayecto_academico', 'trayecto_academico.id_trayecto', '=', 'trayectos.id')
            							->where('trayectos.id', $request->input('id'))
            							->get()
            							->toArray();

    	//$materias = new Localizacion($materias);

    	return $this->sendResponse($carreras);

    }
}
