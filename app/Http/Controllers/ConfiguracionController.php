<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon as CarbonDate;
use App\Http\Resources\Data as Data;
use App\Models\Instalacion;
use App\Models\Aula;

class ConfiguracionController extends Controller
{
  use ApiController;

  public function listaInstalaciones(){

    $instalaciones = Instalacion::with('aulas')->get();

    $instalaciones = new Data($instalaciones);
    return $this->sendResponse($instalaciones);

  }

  public function registrarInstalacion(Request $request){

    $resource = ApiHelper::resource();

    $validator= \Validator::make($request->input('instalacion'),[
      'cede' => "required"
    ]);

    for($i = 0; $i < count($request->input('instalacion.aulas')); $i++){

      $validator2= \Validator::make($request->input('instalacion.aulas.'.$i),[
        'name' => "required"
      ]);

      if($validator2->fails()){
        break;
      }

    }

    if($validator->fails()){
      ApiHelper::setError($resource, 3, 422, 'Verifique el campo de cede');
      return $this->sendResponse($resource);
    }

    if(isset($validator2) && $validator2->fails()){
      ApiHelper::setError($resource, 3, 422, 'Verifique los campos de aula');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      $instalacion = new Instalacion;
      $instalacion->cede = $request->input('instalacion.cede');
      $instalacion->save();

      $aulas = [];

      foreach($request->input('instalacion.aulas') as $aula){
          array_push($aulas, new Aula(['name' => $aula['name'], 'created_at' => CarbonDate::now(),'updated_at' => CarbonDate::now()]));
      }

      $instalacion->aulas()->saveMany($aulas);

      DB::commit();
      ApiHelper::success($resource);
    }catch(\Exception $e){
      DB::rollback();
      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function modificarInstalacion(Request $request){

    $resource = ApiHelper::resource();
    $instalacion = Instalacion::find($request->input('instalacion.id'));

    DB::beginTransaction();

    try{

      $instalacion->cede = $request->input('instalacion.cede');
      $instalacion->save();

      DB::commit();
      ApiHelper::success($resource);
    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function deleteInstalacion(Request $request){

    $resource = ApiHelper::resource();

    DB::beginTransaction();

    try{

      $instalacion = Instalacion::find($request->input('instalacion_id'));
      $instalacion->delete();

      DB::commit();
      ApiHelper::success($resource);
    }catch(\Exception $e){
      DB::rollback();
      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function modifyAula(Request $request){

    $resource = ApiHelper::resource();

    $validator= \Validator::make($request->input('aula'),[
      'name' => "required"
    ]);

    if($validator->fails()){
      ApiHelper::setError($resource, 0, 422, 'Verifique el campo de texto del aula correspondiente.');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      $aula = Aula::find($request->input('aula.id'));
      $aula->name = $request->input('aula.name');
      $aula->save();

      DB::commit();
      ApiHelper::success($resource);

    }catch(\Exception $e){

      DB::rollback();
      ApiHelper::setException($resource, $e);

    }

    return $this->sendResponse($resource);

  }

  public function deleteAula(Request $request){

    $resource = ApiHelper::resource();

    DB::beginTransaction();

    try{

      $aula = Aula::find($request->input('aula_id'));
      $aula->delete();

      DB::commit();
      ApiHelper::success($resource);
    }catch(\Exception $e){
      DB::rollback();
      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

  public function addAulas(Request $request){

    $resource = ApiHelper::resource();
    $instalacion = Instalacion::find($request->input('instalacion.id'));
    $to_attach = collect($request->input('instalacion.aulas'))->diffKeys(collect($instalacion->aulas->toArray()));

    for($i = 0; $i < count($to_attach); $i++){

      $validator= \Validator::make($to_attach[$i],[
        'name' => "required"
      ]);

      if($validator->fails()){
        break;
      }

    }

    if($validator->fails()){
      ApiHelper::setError($resource, 3, 422, 'Verifique el(los) campos de identificador del aula');
      return $this->sendResponse($resource);
    }

    DB::beginTransaction();

    try{

      $aulas = [];

      foreach($to_attach as $aula_attach){
        array_push($aulas, new Aula(['name' => $aula_attach['name'], 'created_at' => CarbonDate::now(),'updated_at' => CarbonDate::now()]));
      }

      $instalacion->aulas()->saveMany($aulas);
      $instalacion->refresh();

      DB::commit();
      $data = new Data($instalacion);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){
      DB::rollback();
      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }

}
