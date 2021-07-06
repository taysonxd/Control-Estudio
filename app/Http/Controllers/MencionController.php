<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data as Data;
use App\Models\Mencion;

class MencionController extends Controller
{
    use ApiController;

    public function registrar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'id_carrera' => 'required',
			'mencion' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Mencion = new Mencion;

			$Mencion->id_carrera = $request->input("id_carrera");
			$Mencion->mencion = $request->input("mencion");
			$Mencion->save();

	        ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

	public function actualizar(Request $request){

		$resource = ApiHelper::resource();

		$validator= \Validator::make($request->all(),[
			'id_carrera' => 'required',
			'mencion' => 'required'
		]);

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		try{

			$Mencion = Mencion::find($request->input("id"));

			$Mencion->id_carrera = $request->input("id_carrera");
			$Mencion->mencion = $request->input("mencion");
			$Mencion->save();

	        ApiHelper::success($resource);

		}catch(\Exception $e){

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

	}

    public function lista(){

    	$menciones = Mencion::selectRaw('menciones.*, carreras.carrera')
    						->join('carreras', 'carreras.id', '=', 'menciones.id_carrera')
    						->orderBy('mencion', "ASC")
							->get();

    	$menciones = new Data($menciones);

    	return $this->sendResponse($menciones);

    }

    public function getMenciones(request $request){

      $resource = ApiHelper::resource();

      try{

        $menciones = Mencion::orderBy('mencion', 'DESC')
                              ->where('id_carrera', $request->input('id_carrera'))
                              ->get();

        $data  =  new Data($menciones);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){

        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

}
