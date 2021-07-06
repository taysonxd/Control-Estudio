<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\Api as ApiHelper;
use App\Http\Resources\Localizacion as Localizacion;
use Illuminate\Support\Facades\Crypt;
use App\Http\Resources\Data;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon as DateTime;
use App\Traits\ApiController;
use App\Models\Persona;
use App\Models\Estudiante;
use App\Models\EstudiantePreinscrito;
use App\Models\EstudianteRequisitos;
use App\Models\Requisito;
use App\Models\EstatusUno;
use App\Models\EstatusDos;
use App\Models\Pensum;
use App\Models\Carrera;
use App\Models\Trayecto;

class EstudianteController extends Controller
{

	use ApiController;

    public function preinscribir(Request $request){

    	$resource = ApiHelper::resource();

			$validator= \Validator::make($request->all()['preinscripcion'],[
				'cedula'    => 'required|unique:personas',
				'nacionalidad' => 'required',
				'sexo'     => 'required',
				'nombre_uno' => 'required',
				'nombre_dos' => 'required',
				'apellido_uno' => 'required',
				'apellido_dos' => 'required',
				'email'    => 'required|unique:users,email',
				'fecha_nac' => 'required',
				'id_provincia_nac' => 'required',
				'id_parroquia' => 'required',
				'direccion'=> 'nullable',
				'id_carrera' => 'required',
				'discapacidad' => 'required',
				'instituto_bachillerato' => 'required',
				'registro_opsu' => 'required',
				'anio_egreso' => 'required|numeric',
				'requisitos_pendientes' => 'required'
			]);

			if($validator->fails()){
				ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
				return $this->sendResponse($resource);
			}

			DB::beginTransaction();

			try{

		    $Persona = new Persona();
		    $Persona->nacionalidad  = $request->input('preinscripcion.nacionalidad');
		    $Persona->cedula  = $request->input('preinscripcion.cedula');
		    $Persona->sexo  = strtoupper($request->input('preinscripcion.sexo'));
		    $Persona->nombre_uno  = strtoupper($request->input('preinscripcion.nombre_uno'));
		    $Persona->nombre_dos  = strtoupper($request->input('preinscripcion.nombre_dos'));
		    $Persona->apellido_uno  = strtoupper($request->input('preinscripcion.apellido_uno'));
		    $Persona->apellido_dos  = strtoupper($request->input('preinscripcion.apellido_dos'));
		    $Persona->email  = $request->input('preinscripcion.email');
		    $Persona->fecha_nac  = $request->input('preinscripcion.fecha_nac');
		    $Persona->id_provincia_nac  = $request->input('preinscripcion.id_provincia_nac');
		    $Persona->id_parroquia  = $request->input('preinscripcion.id_parroquia');
		    $Persona->local_direccion  = $request->input('preinscripcion.direccion');

		    $Persona->save();

		    $EstudiantePreinscrito = new EstudiantePreinscrito();
		    $EstudiantePreinscrito->id_persona = $Persona['id'];
		    $EstudiantePreinscrito->id_carrera = $request->input('preinscripcion.id_carrera');
		    $EstudiantePreinscrito->discapacidad  = $request->input('preinscripcion.discapacidad');
		    $EstudiantePreinscrito->nivel_discapacidad  = $request->input('preinscripcion.nivel_discapacidad');
		    $EstudiantePreinscrito->des_discapacidad  = $request->input('preinscripcion.desc_discapacidad');
		    $EstudiantePreinscrito->inst_bachillerato = $request->input('preinscripcion.instituto_bachillerato');
				$EstudiantePreinscrito->anio_egreso = $request->input('preinscripcion.anio_egreso');
		    $EstudiantePreinscrito->opsu = $request->input('preinscripcion.registro_opsu');

		    $EstudiantePreinscrito->save();

		    $estudianteRequisitos = new EstudianteRequisitos();

		    foreach($request->preinscripcion['requisitos_pendientes'] as $requisito) {

		    	$estudianteRequisitos::insert([
		    		'id_estudiante_preinscrito' =>  $EstudiantePreinscrito->id,
		    		'id_requisito' => $requisito
		    	]);
		    }

		    DB::commit();
		    ApiHelper::success($resource);
			}catch(\Exception $e) {
				DB::rollback();
				ApiHelper::setException($resource, $e);
			}

			return $this->sendResponse($resource);

    }

		public function getEstudiantes(Request $request){

			$resource = ApiHelper::resource();

      try{

	    	$estudiantes = Persona::selectRaw("personas.cedula, CONCAT(personas.nombre_uno,' ',personas.nombre_dos) as nombres, CONCAT(personas.apellido_uno,' ',personas.apellido_dos) as apellidos, carreras.carrera, municipios.municipio, parroquias.parroquia, personas.created_at as fecha_ingreso, personas.email, personas.id, estudiantes.id_carrera")
							    							->join("estudiantes", "estudiantes.id_persona", "=", "personas.id")
							    							->join("carreras", "carreras.id", "=", "estudiantes.id_carrera")
							    							->join("parroquias", "parroquias.id", "=", "personas.id_parroquia")
							    							->join("municipios", "municipios.id", "=", "parroquias.id_municipio")
							    							->orderBy('cedula', "DESC")
																->get();

				$data  =  new Data($estudiantes);
				$resource = array_merge($resource, $data->toArray($request));
				ApiHelper::success($resource);
			}catch(\Exception $e){

				ApiHelper::setException($resource, $e);
			}
	    	return $this->sendResponse($resource);

    }

    public function listaPreinscritos(){

    	$preinscritos = Persona::selectRaw("personas.cedula, CONCAT(personas.nombre_uno,' ',personas.nombre_dos) as nombres, CONCAT(personas.apellido_uno,' ',personas.apellido_dos) as apellidos, carreras.carrera, municipios.municipio, parroquias.parroquia, personas.created_at as fecha_ingreso, personas.email, personas.id, estudiantes_preinscritos.id_carrera")
    							->join("estudiantes_preinscritos", "estudiantes_preinscritos.id_persona", "=", "personas.id")
    							->join("carreras", "carreras.id", "=", "estudiantes_preinscritos.id_carrera")
    							->join("parroquias", "parroquias.id", "=", "personas.id_parroquia")
    							->join("municipios", "municipios.id", "=", "parroquias.id_municipio")
    							->orderBy('cedula', "DESC")
								->get();

    	$preinscritos = new Data($preinscritos);

    	return $this->sendResponse($preinscritos);

    }

		public function getEstudiante(request $request){

      $resource = ApiHelper::resource();

      try{

        $estudiante = Estudiante::select('p.id as id_persona','p.nacionalidad', 'p.sexo', 'p.nombre_uno',
																						'p.nombre_dos', 'p.apellido_uno', 'p.apellido_dos',
																						'p.email', 'p.fecha_nac', 'p.fecha_nac', 'p.id_provincia_nac',
																						'pa.id as id_pais', 'p.id_parroquia', 'mu.id as id_municipio', 'es.id as id_estado',
																						'p.local_direccion as direccion', 'estudiantes.id', 'estudiantes.id_carrera', 'estudiantes.discapacidad', 'estudiantes.nivel_discapacidad',
																						'estudiantes.des_discapacidad', 'estudiantes.inst_bachillerato as instituto_bachillerato', 'estudiantes.anio_egreso', 'estudiantes.opsu as registro_opsu')
										                    		->join('personas as p', 'estudiantes.id_persona', '=', 'p.id')
																						->join('parroquias as par', 'p.id_parroquia', '=', 'par.id')
																						->join('municipios as mu', 'par.id_municipio', '=', 'mu.id')
																						->join('estados as es', 'mu.id_estado', '=', 'es.id')
																						->join('provincias as pro', 'p.id_provincia_nac', '=', 'pro.id')
																						->join('paises as pa', 'pro.id_pais', '=', 'pa.id')
																						->where('p.id', $request->input('id_estudiante'))
										                        ->first();

        $data  =  new Data($estudiante);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){

        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

		public function getPreinscrito(request $request){

      $resource = ApiHelper::resource();

      try{

        $estudiante = EstudiantePreinscrito::select('p.id as id_persona','p.nacionalidad', 'p.sexo', 'p.nombre_uno',
																						'p.nombre_dos', 'p.apellido_uno', 'p.apellido_dos',
																						'p.email', 'p.fecha_nac', 'p.fecha_nac', 'p.id_provincia_nac',
																						'pa.id as id_pais', 'p.id_parroquia', 'mu.id as id_municipio', 'es.id as id_estado',
																						'p.local_direccion as direccion', 'estudiantes_preinscritos.id', 'estudiantes_preinscritos.id_carrera', 'estudiantes_preinscritos.discapacidad', 'estudiantes_preinscritos.nivel_discapacidad',
																						'estudiantes_preinscritos.des_discapacidad', 'estudiantes_preinscritos.inst_bachillerato as instituto_bachillerato', 'estudiantes_preinscritos.anio_egreso', 'estudiantes_preinscritos.opsu as registro_opsu')
										                    		->join('personas as p', 'estudiantes_preinscritos.id_persona', '=', 'p.id')
																						->join('parroquias as par', 'p.id_parroquia', '=', 'par.id')
																						->join('municipios as mu', 'par.id_municipio', '=', 'mu.id')
																						->join('estados as es', 'mu.id_estado', '=', 'es.id')
																						->join('provincias as pro', 'p.id_provincia_nac', '=', 'pro.id')
																						->join('paises as pa', 'pro.id_pais', '=', 'pa.id')
																						->where('p.id', $request->input('id_preinscrito'))
										                        ->first();
				$estudiante->requisitos_pendientes;

        $data  =  new Data($estudiante);
        $resource = array_merge($resource, $data->toArray($request));
        ApiHelper::success($resource);
      }catch(\Exception $e){

        ApiHelper::setException($resource, $e);
      }

      return $this->sendResponse($resource);

    }

		public function getRequisitos(){

    	$requisitos = Requisito::orderBy('requisito', 'DESC')
																->get();

    	$requisitos = new Data($requisitos);

    	return $this->sendResponse($requisitos);

    }

		public function getStatus(request $request){

			$resource = ApiHelper::resource();

			try{

				$status1 = EstatusUno::orderBy('estatus1', 'DESC')
															->get();

				$status2 = EstatusDos::orderBy('estatus2', 'DESC')
															->get();

				$data  =  new Data([$status1, $status2]);
				$resource = array_merge($resource, $data->toArray($request));
				ApiHelper::success($resource);
			}catch(\Exception $e){

				ApiHelper::setException($resource, $e);
			}

			return $this->sendResponse($resource);

		}

    public function confirmarInscripcion(Request $request){

    	$resource = ApiHelper::resource();

			$validator= \Validator::make($request->all(),[
				'inscripcion.id_carrera' => 'required',
				'inscripcion.id_condicion' => 'required',
				'inscripcion.id_estatus1' => 'required',
				'inscripcion.id_estatus2' => 'required'
			]);

			if($validator->fails()){
				ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
				return $this->sendResponse($resource);
			}

			if(count($request->input('inscripcion.asignaturas_seleccionadas')) == 0){
				ApiHelper::setError($resource, 0, 422, 'No ha seleccionado ninguna carga academica.');
				return $this->sendResponse($resource);
			}

			DB::beginTransaction();

			try{

	      $estudiantePreinscrito = EstudiantePreinscrito::where('id_persona', $request->input('inscripcion.id_persona'))
    																										->first();

	      $estudiante = new Estudiante();

	      $estudiante->discapacidad  = $estudiantePreinscrito->discapacidad;
	      $estudiante->nivel_discapacidad  = $estudiantePreinscrito->nivel_discapacidad;
	      $estudiante->des_discapacidad  = $estudiantePreinscrito->des_discapacidad;
	      $estudiante->opsu  = $estudiantePreinscrito->opsu;
	      $estudiante->inst_bachillerato  = $estudiantePreinscrito->inst_bachillerato;
	      $estudiante->anio_egreso  = $estudiantePreinscrito->anio_egreso;
	      $estudiante->id_estatus1  = $request->input('inscripcion.id_estatus1');
	      $estudiante->id_estatus2  = $request->input('inscripcion.id_estatus2');
	      $estudiante->id_persona  = $estudiantePreinscrito->id_persona;
	      $estudiante->id_carrera  = $request->input('inscripcion.id_carrera');
	      $estudiante->id_mencion  = $request->input('inscripcion.id_mencion');
	      $estudiante->id_condicion  = $request->input('inscripcion.id_condicion');
	      $estudiante->cohorte  = DateTime::now()->year;

	      $estudiante->save();

				foreach($request->input('inscripcion.asignaturas_seleccionadas') as $asignatura){

					$estudiante->asignaturas_en_curso()->attach($asignatura['id_oferta_academica'], ['created_at' => DateTime::now(), 'updated_at' => DateTime::now()]);
				}
	      $estudiantePreinscrito->delete();

	      DB::commit();
	      ApiHelper::success($resource);
			} catch (\Exception $e) {
				DB::rollback();
				ApiHelper::setException($resource, $e);
			}

			return $this->sendResponse($resource);

    }

    public function certificadoInscripcion(Request $request){

    	$resource = ApiHelper::resource();

			$validator= \Validator::make($request->all(),[
				'cedula_estudiante' => 'required|numeric'
			]);

			if($validator->fails()){
				ApiHelper::setError($resource, 0, 422, $validator->errors()->all());
				return $this->sendResponse($resource);
			}

      $estudiante = Estudiante::select('estudiantes.*', 'carreras.tipo')
				      									->join('personas', 'personas.id', '=', 'estudiantes.id_persona')
				      									->join('carreras', 'carreras.id', '=', 'estudiantes.id_carrera')
				      									->where('personas.cedula', $request->input('cedula_estudiante'))
				      									->first();

			$table_content = '';

      if($estudiante->id_estatus2 == '1' && $estudiante->tipo == 'PNF'){

      	$asignaturas = $estudiante->asignaturas_en_curso()->with(['seccion','asignatura.materia','asignatura.trayectoAcademico.carrera'])->get();

				$table_content = '<table cellpadding="0" align="center" border = "0" width="100%" id="tabla_pensum">';

		    $total_hps = 0;
		    $total_ht = 0;
		    $total_uc = 0;

		    $table_content .= "
              <tr class='alert-info'>
              <td style='text-align: center;' colspan='7'>
                  <FONT FACE=\"Helvetica\" SIZE=4>
                      <strong>
						TI - Trayecto Inicial
                      </strong>
                  </FONT>
              </td>
              </tr>
              <tr>
                  <th width='10%'' style='text-align: center;'>Código</th>
                  <th width='55%' style='text-align: left;'>Unidad Curricular</th>
									<th width='10%' style='text-align: center;'>Sección</th>
                  <th width='5%' style='text-align: center;'>HPS</th>
                  <th width='5%' style='text-align: center;'>HT</th>
                  <th width='5%' style='text-align: center;'>N</th>
                  <th width='5%' style='text-align: center;'>UC</th>
              </tr>
	            ";

		    foreach($asignaturas as $asig_curso){

	        $total_hps += $asig_curso->asignatura->hps;
	        $total_ht += $asig_curso->asignatura->ht;
	        $total_uc += $asig_curso->asignatura->UC;

	        if($asignaturas->last()->id == $asig_curso->id){
	        	$subrayado = "subrayado";
	        }else{
	        	$subrayado = "";
	        }

	        $table_content .= "
	              <tr class=\"asignaturas anio-".$asig_curso->asignatura->trayectoAcademico->trayecto."\" id=\"".$asig_curso->id."\">
	                  <td style='text-align: center;' class=".$subrayado.">
	                      <font FACE=\"Helvetica\" SIZE=1>
	                          ".$asig_curso->asignatura->trayectoAcademico->carrera->codcarrera."-".$asig_curso->asignatura->codigo."
	                      </font>
	                  </td>
	                  <td class=".$subrayado.">
	                      <font FACE=\"Helvetica\" SIZE=3>
	                          ".($asig_curso->asignatura->desc_asignatura=='default'? $asig_curso->asignatura->materia->materia:$asig_curso->asignatura->desc_asignatura)."
	                      </font>
	                  </td>
										<td style='text-align: center;' class=".$subrayado.">
	                      <font FACE=\"Helvetica\" SIZE=3>
	                          ".$asig_curso->seccion->codigo."
	                      </font>
	                  </td>
	                  <td style='text-align: center;' class=\"horas_semana ".$subrayado."\" id=\"hs\">
	                      <font FACE=\"Helvetica\" SIZE=3 id=\"horas_semana\">
	                          ".$asig_curso->asignatura->hps."
	                      </font>
	                  </td>
	                  <td style='text-align: center;' class=".$subrayado.">
	                      <font FACE=\"Helvetica\" SIZE=3 id=\"horas_totales\">
	                          ".$asig_curso->asignatura->ht."
	                      </font>
	                  </td>
	                  <td style='text-align: center;' class=\"".$subrayado."\" id=\"n\">
	                      <font FACE=\"Helvetica\" SIZE=3 id=\"N\">
	                          ".$asig_curso->asignatura->N."
	                      </font>
	                  </td>
	                  <td style='text-align: center;' class=\"".$subrayado."\" id=\"uc\">
	                      <font FACE=\"Helvetica\" SIZE=3 id=\"uc\">
	                          ".$asig_curso->asignatura->UC."
	                      </font>
	                  </td>
	              </tr>
	          	";

		    }

		    $subrayado = "subrayado";

		    $table_content .= '
	            <tr class="total-anio-'.$asig_curso->asignatura->trayectoAcademico->trayecto.'">
	                <td class="'.$subrayado.'">
	                </td>
	                <td style="text-align: right;" colspan="2" class="'.$subrayado.'">
	                    <FONT FACE="Helvetica" SIZE=3>
	                        <b>Total Horas por Semana</b>
	                    </FONT>
	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">
	                    '.$total_hps.'
	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">
	                    '.$total_ht.'
	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">

	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">
	                    '.$total_uc.'
	                </td>
	            </tr>
            ';

		    $table_content .= '</table></center>';

		    $table_content .= '
			        <table border="01" width="50%" align="right" style="font-size: 11px;">
			            <tr>
			                <td style="border-bottom: 0px; border-right: 0px;">HPS: Horas por Semana</td>
			                <td style="border-bottom: 0px; border-left: 0px;">UC: Unidades de Crédito</td>
			            </tr>
			            <tr>
			                <td style="border-top: 0px; border-right: 0px;">HT: Horas totales por Periodo Academico</td>
			                <td style="border-top: 0px; border-left: 0px;"></td>
			            </tr>
			        </table>
	    			';

      }else if($estudiante->id_estatus2 == '1' && $estudiante->tipo == 'N'){

				$asignaturas = $estudiante->asignaturas_en_curso()->with(['seccion','asignatura.materia','asignatura.trayectoAcademico.carrera'])->get();

				$table_content = '<table cellpadding="0" align="center" border = "0" width="100%" id="tabla_pensum">';

		    $total_hps = 0;
		    $total_ht = 0;
		    $total_uc = 0;

	    	$table_content .= "
	            <tr class='alert-info'>
	            	<td style='text-align: center;' colspan='7'>
	                <FONT FACE=\"Helvetica\" SIZE=4>
	                    <strong>
												Trayecto 1
	                    </strong>
	                </FONT>
	            	</td>
	            </tr>
	            <tr>
	                <th width='10%'' style='text-align: center;'>Código</th>
	                <th width='55%' style='text-align: left;'>Unidad Curricular</th>
									<th width='10%' style='text-align: center;'>Sección</th>
	                <th width='5%' style='text-align: center;'>HPS</th>
	                <th width='5%' style='text-align: center;'>HT</th>
	                <th width='5%' style='text-align: center;'>N</th>
	                <th width='5%' style='text-align: center;'>UC</th>
	            </tr>
            ";

		    foreach($asignaturas as $asig_curso){

		        $total_hps += $asig_curso->asignatura->hps;
		        $total_ht += $asig_curso->asignatura->ht;
		        $total_uc += $asig_curso->asignatura->UC;

		        if($asignaturas->last()->id == $asig_curso->asignatura->id){
		        	$subrayado = "subrayado";
		        }else{
		        	$subrayado = "";
		        }

		        $table_content .= "
	                <tr class=\"asignaturas anio-".$asig_curso->asignatura->trayectoAcademico->trayecto."\" id=\"".$asig_curso->asignatura->id."\">
	                    <td style='text-align: center;' class=".$subrayado.">
	                        <font FACE=\"Helvetica\" SIZE=1>
	                            ".$asig_curso->asignatura->trayectoAcademico->carrera->codcarrera."-".$asig_curso->asignatura->codigo."
	                        </font>
	                    </td>
	                    <td class=".$subrayado.">
	                        <font FACE=\"Helvetica\" SIZE=3>
	                            ".($asig_curso->asignatura->desc_asignatura=='default'? $asig_curso->asignatura->materia->materia:$asig_curso->asignatura->desc_asignatura)."
	                        </font>
	                    </td>
											<td style='text-align: center;' class=".$subrayado.">
		                      <font FACE=\"Helvetica\" SIZE=3>
		                          ".$asig_curso->seccion->codigo."
		                      </font>
		                  </td>
	                    <td style='text-align: center;' class=\"horas_semana ".$subrayado."\" id=\"hs\">
	                        <font FACE=\"Helvetica\" SIZE=3 id=\"horas_semana\">
	                            ".$asig_curso->asignatura->hps."
	                        </font>
	                    </td>
	                    <td style='text-align: center;' class=".$subrayado.">
	                        <font FACE=\"Helvetica\" SIZE=3 id=\"horas_totales\">
	                            ".$asig_curso->asignatura->ht."
	                        </font>
	                    </td>
	                    <td style='text-align: center;' class=\"".$subrayado."\" id=\"n\">
	                        <font FACE=\"Helvetica\" SIZE=3 id=\"N\">
	                            ".$asig_curso->asignatura->N."
	                        </font>
	                    </td>
	                    <td style='text-align: center;' class=\"".$subrayado."\" id=\"uc\">
	                        <font FACE=\"Helvetica\" SIZE=3 id=\"uc\">
	                            ".$asig_curso->asignatura->UC."
	                        </font>
	                    </td>
	                </tr>
	            	";

		    }

		    $subrayado = "subrayado";

		    $table_content .= '
	            <tr class="total-anio-'.$asig_curso->asignatura->trayectoAcademico->trayecto.'">
	                <td class="'.$subrayado.'">
	                </td>
	                <td colspan="2" style="text-align: right;" class="'.$subrayado.'">
	                    <FONT FACE="Helvetica" SIZE=3>
	                        <b>Total Horas por Semana</b>
	                    </FONT>
	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">
	                    '.$total_hps.'
	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">
	                    '.$total_ht.'
	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">

	                </td>
	                <td style="text-align: center;" class="'.$subrayado.'">
	                    '.$total_uc.'
	                </td>
	            </tr>
            ';

		    $table_content .= '</table></center>';

		    $table_content .= '
			        <table border="01" width="50%" align="right" style="font-size: 11px;">
			            <tr>
			                <td style="border-bottom: 0px; border-right: 0px;">HPS: Horas por Semana</td>
			                <td style="border-bottom: 0px; border-left: 0px;">UC: Unidades de Crédito</td>
			            </tr>
			            <tr>
			                <td style="border-top: 0px; border-right: 0px;">HT: Horas totales por Periodo Academico</td>
			                <td style="border-top: 0px; border-left: 0px;"></td>
			            </tr>
			        </table>
		    		';

			}

			$data  =  new Data([$table_content]);
      $resource = array_merge($resource, $data->toArray($request));
      ApiHelper::success($resource);
			return $this->sendResponse($resource);

  	}
}
