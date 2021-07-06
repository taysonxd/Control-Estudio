<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Traits\ApiController;
use App\Http\Resources\Localizacion as Localizacion;
use App\Models\Documento;

class DocumentosController extends Controller
{

	use ApiController;

	public function pdf(Request $request){

		$resource = ApiHelper::resource();

		try {

			$tipo = $request->input('tipo');
			$codigo = $request->input('codigo');
			$fecha_pub = $request->input('fecha_pub');
			$documento = $request->input('documento');
			$pdf = $request->file('pdf');

			$pdf_file = strtolower(chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90)).chr(rand(65,90))).'.'.$pdf->getClientOriginalExtension();
			$destinationPath = public_path('pdfs');

			$document = new Documento;
			$document->tipo = $tipo;
			$document->codigo = $codigo;
			$document->fecha_publicacion = $fecha_pub;
			$document->documento = $documento;
			$document->file = $pdf_file;
			$document->save();

			$move = $pdf->move($destinationPath, $pdf_file);

			ApiHelper::success($resource);

		} catch (\Exception $e) {

			ApiHelper::setException($resource, $e);

		}

		return $this->sendResponse($resource);

  	}

  	public function listado(){

  		$documentos = Documento::all();

  		$documentos = new Localizacion($documentos);

    	return $this->sendResponse($documentos);

  	}

}
