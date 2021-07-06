<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Auth\Guard;
use App\Http\Controllers\Controller;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Models\Pais;
use App\Models\Estado;
use App\Models\Provincia;
use App\Models\Municipio;
use App\Models\Parroquia;
use App\Http\Resources\Data;
use Illuminate\Support\Facades\Auth;

class CountryController extends Controller
{
    use ApiController;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $resource = ApiHelper::resource();

        try{

            $data  =  new Data(Pais::orderBy('pais', 'ASC')->get());
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){

            ApiHelper::setException($resource, $e);
        }

        return $this->sendResponse($resource);

    }

    public function state(Request $request)
    {

        $resource = ApiHelper::resource();
        try{

            $results = Estado::orderBy('estado', 'DESC')
                              ->get();

            $data  =  new Data($results);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){
            ApiHelper::setException($resource, $e);
        }
        return $this->sendResponse($resource);

    }

    public function province(Request $request)
    {

        $resource = ApiHelper::resource();
        try{

            $results = Provincia::where('id_pais','=', $request->input('id_pais'))
                                  ->orderBy('provincia', 'ASC')
                                  ->get();

            $data  =  new Data($results);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){
            ApiHelper::setException($resource, $e);
        }
        return $this->sendResponse($resource);

    }

    public function municipio(Request $request)
    {

        $resource = ApiHelper::resource();

        try{

            $results = Municipio::where('id_estado','=', $request->input('id_estado'))
                                  ->orderBy('municipio', 'ASC')
                                  ->get();

            $data  =  new Data($results);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){

            ApiHelper::setException($resource, $e);
        }

        return $this->sendResponse($resource);

    }

    public function parroquia(Request $request)
    {

        $resource = ApiHelper::resource();

        try{

            $results = Parroquia::where('id_municipio','=', $request->input('id_municipio'))
                                  ->orderBy('parroquia', 'ASC')
                                  ->get();

            $data  =  new Data($results);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){

            ApiHelper::setException($resource, $e);
        }

        return $this->sendResponse($resource);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {


        $resource = ApiHelper::resource();
        $validator = \Validator::make($request->all(), [
            'name' => 'required|unique:countries|max:200',
            'code' => 'required|unique:countries|max:6'
        ]);
        if($validator->fails()){
            ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
            return $this->sendResponse($resource);
        }

        try{
            $Pais = new Pais;
            $Pais->name = $request->input('name');
            $Pais->code = $request->input('code');
            $Pais->save();
            $data = new PaisResource($Pais);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){
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
    public function show(Request $request, $id)
    {

        $resource = ApiHelper::resource();
        try{
            $Pais = Pais::where('id', (int)$id)->first();
            if(is_null($Pais)){
              ApiHelper::setError($resource, 0, 404, 'Pais not found');
              return $this->sendResponse($resource);
            }
            $data = new PaisResource($Pais);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){
            ApiHelper::setException($resource, $e);
        }
        return $this->sendResponse($resource);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $resource = ApiHelper::resource();
        $validator = \Validator::make($request->all(), [
            'name' => 'required|unique:localities_countries,name,'.(int)$id.'|max:100',
            'code' => 'required|unique:localities_countries,code,'.(int)$id.'|max:5'
        ]);
        if($validator->fails()){
            ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
            return $this->sendResponse($resource);
        }
        try{
            $Pais = Pais::where('id', (int)$id)->firstOrFail();
            $Pais->name = $request->input('name', $Pais->name);
            $Pais->code = $request->input('code', $Pais->code);
            $Pais->save();

            $data = new PaisResource($Pais);
            $resource = array_merge($resource, $data->toArray($request));
            ApiHelper::success($resource);
        }catch(\Exception $e){
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
    public function destroy($id)
    {
        $resource = ApiHelper::resource();
        try{
            $Pais = Pais::find($id);
            if($Pais === null){
                ApiHelper::setError($resource, 0, 404, 'Pais not found');
                return $this->sendResponse($resource);
            }

            $Pais->delete();

            $Pais = Pais::find($id);
            if($Pais === null){
                ApiHelper::success($resource);
            }else{
                ApiHelper::setError($resource, 0, 422, 'Pais has not been eliminated');
            }
        }catch(\Exception $e){
            ApiHelper::setException($resource, $e);
        }
        return $this->sendResponse($resource);
    }
}
