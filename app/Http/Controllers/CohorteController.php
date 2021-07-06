<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Localizacion as Localizacion;
use App\Models\Cohorte;

class CohorteController extends Controller
{
    use ApiController;

    public function registrar(Request $request){

        $resource = ApiHelper::resource();

        $validator= \Validator::make($request->all(),[
            'cohorte' => 'required'
        ]);

        if($validator->fails()){
            ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
            return $this->sendResponse($resource);

        }

        try{

            $Cohorte = new Cohorte;

            $Cohorte->cohorte = $request->input("cohorte");
            $Cohorte->codigo_cohorte = $request->input("codigo_cohorte");
            $Cohorte->save();

            ApiHelper::success($resource);

        }catch(\Exception $e){

            ApiHelper::setException($resource, $e);

        }

        return $this->sendResponse($resource);

    }

    public function actualizar(Request $request){

        $resource = ApiHelper::resource();

        $validator= \Validator::make($request->all(),[
            'cohorte' => 'required'
        ]);

        if($validator->fails()){
            ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
            return $this->sendResponse($resource);
        }

        try{

            $Cohorte = Cohorte::find($request->input("id"));

            $Cohorte->cohorte = $request->input("cohorte");
            $Cohorte->codigo_cohorte = $request->input("codigo_cohorte");
            $Cohorte->save();

            ApiHelper::success($resource);

        }catch(\Exception $e){

            ApiHelper::setException($resource, $e);

        }

        return $this->sendResponse($resource);

    }

    public function lista(){

        $cohortes = Cohorte::orderBy('cohorte', "DESC")
                            ->get();

        $cohortes = new Localizacion($cohortes);

        return $this->sendResponse($cohortes);

    }
}
