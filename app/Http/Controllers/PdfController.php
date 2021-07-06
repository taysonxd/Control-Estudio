<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade as PDF;
use App\Models\Estudiante;
use App\Models\Prelacion;

class pdfController extends Controller
{
	public function pdfInscripcion(Estudiante $estudiante){

		$total_hps = 0;
		$total_ht = 0;
		$total_uc = 0;
		$totales = [
					'total_hps' => 0,
                  	'total_ht' => 0,
                  	'total_uc' => 0
                  ];

        $trayectoAcademico = $estudiante->carrera->trayectosAcademicos->where('trayecto.trayecto', 'TI');

		$asignaturas = $trayectoAcademico['1']->asignaturas;

		foreach($asignaturas as $asignatura){
			$totales['total_hps'] += $asignatura['hps'];
			$totales['total_ht'] += $asignatura['ht'];
			$totales['total_uc'] += $asignatura['UC'];
		}

		if($estudiante->id_estatus2 == 1){

			$trayectoAcademico = $estudiante->carrera->trayectosAcademicos->where('trayecto.trayecto', 'TI');

			$asignaturas = $trayectoAcademico['1']->asignaturas;

		}		

		$pdf = PDF::loadView('pdf.certificadoInscripcion', compact('estudiante', 'totales', 'asignaturas'));

        return $pdf->stream('certificadoInscripcion.pdf');

	}

	public function pdfPensumEstudio(Estudiante $estudiante){

		// $asignaturas = App\Models\Pensum::select('pensum.*', 'trayectos.trayecto', 'carreras.codcarrera', "carreras.tipo", 'materias.materia')
  //                 ->join('materias', 'materias.id', '=', 'pensum.id_materia')
  //                 ->join('trayecto_academico as ta', 'ta.id', '=', 'pensum.id_trayecto_academico')
  //                 ->join('carreras', 'carreras.id', '=', 'ta.id_carrera')
  //                 ->join('trayectos', 'trayectos.id', '=', 'ta.id_trayecto')
  //                 ->where('anio', '=', function($query){
  //                                       $query->selectRaw('max(anio) from pensum');
  //                                     })
  //                 ->where('id_carrera', '=', $estudiante->carrera->id)
  //                 ->orderBy('trayectos.trayecto', "ASC")
  //                 ->orderBy('pensum.desc_asignatura', "ASC")
  //                 ->get();
      	
        $trayectosAcademicos = $estudiante->carrera->trayectosAcademicos->sortByDesc('trayecto.trayecto');

		$total_hps = 0;
		$total_ht = 0;
		$total_uc = 0;

		foreach($trayectosAcademicos as $idTa => $ta){
			foreach($ta->asignaturas as $idAsig => $asignatura){

				$prelaciones = $asignatura->prelaciones;
				$prelas = '';

				foreach($prelaciones as $prelacion){
				  $prelas .= " ".Prelacion::find($prelacion['id'])->prelas->codigo;
				}

				$asignatura->prelaciones = $prelas;

				$total_hps += $asignatura->hps;
				$total_ht += $asignatura->ht;
				$total_uc += $asignatura->UC;

				$totales[$idTa] = [
				  'total_hps' => $total_hps,
				  'total_ht' => $total_ht,
				  'total_uc' => $total_uc
				]; 

				if(!$ta->asignaturas->has($idAsig+1)){
				  $total_hps = 0;
				  $total_ht = 0;
				  $total_uc = 0;
				}

			}
		}

		// for($x = 0; $x < count($asignaturas); $x++){  

		// 	$prelaciones = App\Models\Pensum::find($asignaturas[$x]['id'])->prelaciones;
		// 	$prelas = '';

		// 	foreach($prelaciones as $id => $prelacion){
		// 	  $prelas .= " ".App\Models\Prelacion::find($prelacion['id'])->prelas->codigo;
		// 	}

		// 	$asignaturas[$x]['prelas'] = $prelas;

		// 	$total_hps += $asignaturas[$x]['hps'];
		// 	$total_ht += $asignaturas[$x]['ht'];
		// 	$total_uc += $asignaturas[$x]['UC'];

		// 	$totales[$o] = [
		// 	  'total_hps' => $total_hps,
		// 	  'total_ht' => $total_ht,
		// 	  'total_uc' => $total_uc
		// 	]; 

		// 	if(array_key_exists($x+1, $asignaturas) && ($asignaturas[$x]['trayecto'] != $asignaturas[$x+1]['trayecto'])){
		// 	  $o = $asignaturas[$x+1]['trayecto'];
		// 	  $total_hps = 0;
		// 	  $total_ht = 0;
		// 	  $total_uc = 0;
		// 	}

		// }s

		$pdf = PDF::loadView('pdf.pensumEstudio', compact('estudiante', 'trayectosAcademicos', 'totales'));
		
		return $pdf->stream('pensumEstudio.pdf');

	}

}
