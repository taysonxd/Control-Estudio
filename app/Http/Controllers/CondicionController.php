<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Data;
use App\Models\Condicion;

class CondicionController extends Controller
{
  use ApiController;

  public function getCondiciones(request $request){

    $resource = ApiHelper::resource();

    try{

      $condiciones = Condicion::orderBy('condicion', 'DESC')
                              ->get();

      $data  =  new Data($condiciones);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
    }catch(\Exception $e){

      ApiHelper::setException($resource, $e);
    }

    return $this->sendResponse($resource);

  }
  
}
