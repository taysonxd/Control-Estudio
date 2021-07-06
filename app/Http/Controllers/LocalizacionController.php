<?php

namespace App\Http\Controllers;

use App\Traits\ApiController;
use Illuminate\Http\Request;
use App\Http\Resources\Localizacion as Localizacion;
use App\Models\Estado;
use App\Models\Provincia;
use App\Models\Municipio;
use App\Models\Parroquia;
use App\Models\Mencion;

class LocalizacionController extends Controller{

	use ApiController;

    public function selectDinamicos(Request $request){

		if($request->input('id_select') == "estado"){

	    	$municipios = Municipio::select('municipios.id', 'municipios.municipio')
									->join('estados', 'estados.id', '=', 'municipios.id_estado')
									->where('estados.id',(int)$request->input("valor_select"))
									->get();

			$municipios  =  new Localizacion($municipios);

			return $this->sendResponse($municipios);

	    }else if($request->input('id_select') == "local_municipio"){

			$parroquias = Parroquia::select()
									->join('municipios', 'municipios.id', '=', 'parroquias.id_municipio')
									->where('municipios.id',(int) $request->input("valor_select"))
									->get();

			$parroquias  =  new Localizacion($parroquias);

			return $this->sendResponse($parroquias);

	    }else if($request->input('id_select') == "id_pais_nac"){

			$provincias = Provincia::select('provincias.id', 'provincias.provincia')
									->join('paises', 'paises.id', '=', 'provincias.id_pais')
									->where('paises.id',(int) $request->input("valor_select"))
									->get();

			$provincias  =  new Localizacion($provincias);

			return $this->sendResponse($provincias);

	    }else if($request->input('id_select') == 'id_carrera'){

	    	$menciones = Mencion::where('id_carrera', $request->input('id_carrera'))
	    									->orderBy('mencion', 'ASC')
	    									->get();

	    	$menciones = new Localizacion($menciones);

	    	return $this->sendResponse($menciones);

	    }

    }
}
