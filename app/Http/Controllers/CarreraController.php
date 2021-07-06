<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data as Data;
use App\Models\Carrera;

class CarreraController extends Controller
{
    use ApiController;

	public function registrar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'carrera' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Carrera = new Carrera;

			$Carrera->carrera = $request->input("carrera");
			$Carrera->codcarrera = $request->input("codcarrera");
			$Carrera->tipo = $request->input("tipo");
			$Carrera->save();

	        ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

	public function actualizar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'carrera' => 'required',
			'codcarrera' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Carrera = Carrera::find($request->input("id"));

			$Carrera->carrera = $request->input("carrera");
			$Carrera->codcarrera = $request->input("codcarrera");
			$Carrera->save();

	        ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

	public function lista(){

    	$carreras = Carrera::orderBy('carrera', "DESC")
							->get();

    	$carreras = new Data($carreras);
    	return $this->sendResponse($carreras);

    }
}
