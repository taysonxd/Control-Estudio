<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\Localizacion as Localizacion;
use App\Models\Seccion;

class SeccionController extends Controller
{
	use ApiController;

	public function actualizarRegistrar(Request $request){

		$resource = ApiHelper::resource();

		for($i = 0; $i < count($request->input('secciones')); $i++){
			
			$validator= \Validator::make($request->input('secciones.'.$i),[
				'codigo' => "required",
				'cupos' => "required"
			]);

			if($validator->fails()){
				
				break;
			}

		}

		if($validator->fails()){
			ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
			return $this->sendResponse($resource);
		}

		DB::beginTransaction();

		try{

			foreach($request->input('secciones') as $seccion){

				if(isset($seccion['id'])){

					$Seccion = Seccion::find($seccion['id']);
				}else{

					$Seccion = new Seccion;

					$Seccion->id_persecuencia = $request->input('id_persecuencia');	
				}				

				$Seccion->codigo = $seccion['codigo'];
				$Seccion->cupos = $seccion['cupos'];
				
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

}
