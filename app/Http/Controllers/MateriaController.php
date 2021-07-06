<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data as Data;
use App\Models\Materia;

class MateriaController extends Controller
{
	use ApiController;

	public function registrar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'materia' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Materia = new Materia;

			$Materia->materia = $request->input("materia.materia");
			$Materia->save();

      ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

	public function actualizar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'materia' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Materia = Materia::find($request->input("materia.id"));

			$Materia->materia = $request->input("materia.materia");
			$Materia->save();

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

          $materia = Materia::find($request->input('asignatura_id'));
          $materia->delete();

          ApiHelper::success($resource);
        }catch(\Exception $e){
          ApiHelper::setException($resource, $e);
        }

        return $this->sendResponse($resource);
    }

		public function getMaterias(request $request){

			$resource = ApiHelper::resource();

			try{

				$materias = Materia::orderBy('materia', 'DESC')
															->get();

				$data  =  new Data($materias);
				$resource = array_merge($resource, $data->toArray($request));
				ApiHelper::success($resource);
			}catch(\Exception $e){

				ApiHelper::setException($resource, $e);
			}

			return $this->sendResponse($resource);

		}

		public function lista(){

    	$materias = Materia::orderBy('materia', "DESC")
							->get();

    	$materias = new Data($materias);

    	return $this->sendResponse($materias);

		}

}
