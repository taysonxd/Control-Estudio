<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('location')->group(function () {

	Route::post('/list', 'CountryController@index');
	Route::post('/province/list', 'CountryController@province');
	Route::post('/state/list', 'CountryController@state');
	Route::post('/municipio/list', 'CountryController@municipio');
	Route::post('/parroquia/list', 'CountryController@parroquia');

});

Route::get('/preinscripcion', function (){

    return view('estudiante.preinscripcion');

})->name('preinscripcion');

Auth::routes();

Route::redirect('', 'home');

Route::get('/home', 'HomeController@index')->name('home');

// ESTUDIANTES
Route::prefix('estudiante')->group(function(){

  Route::get('/preinscritos', function(){

    return view('estudiante.preinscritos');

  })->name('preinscritos');

	Route::post('/get_preinscrito', 'EstudianteController@getPreinscrito')->name('get_Preinscrito');
	Route::post('/get_requisitos', 'EstudianteController@getRequisitos')->name('get_requisitos');
  Route::put('/preinscribir', 'EstudianteController@preinscribir')->name('nuevo_estudiante');

  Route::post('/selectDinamicos', 'LocalizacionController@selectDinamicos')->name('selectDinamicos');

  Route::get('/actualizarInscripcion/{persona}/{id_carrera}', function(App\Models\Persona $persona, $id_carrera){

    $carreras = App\Models\Carrera::orderBy('carrera', 'ASC')->get();
    $cohortes = App\Models\Cohorte::orderBy('cohorte', 'ASC')->get();
    $estatus1 = App\Models\EstatusUno::orderBy('estatus1', 'ASC')->get();
    $estatus2 = App\Models\EstatusDos::orderBy('estatus2', 'ASC')->get();
    $condiciones = App\Models\Condicion::orderBy('condicion', 'ASC')->get();

    return view('estudiante.actualizarInscripcion')
            ->with('persona', $persona)
            ->with('carreras', $carreras)
            ->with('id_carrera', $id_carrera)
            ->with('cohortes', $cohortes)
            ->with('estatus1', $estatus1)
            ->with('estatus2', $estatus2)
            ->with('condiciones', $condiciones);

  })->name('actualizarInscripcion');

  Route::put('/confirmarInscripcion', 'EstudianteController@confirmarInscripcion')->name('confirmarInscripcion');
	Route::post('/get_status', 'EstudianteController@getStatus')->name('get_status');

  Route::get('/certificadoInscripcion', function(){

    $carreras = App\Models\Carrera::orderBy('carrera', 'ASC')->get();
    $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')->get();

    return view('estudiante.certificadoInscripcion')->with('carreras', $carreras)
                                                    ->with('trayectos', $trayectos);

  })->name('certificado-inscripcion');

  Route::post('/cargaAcademica','EstudianteController@certificadoInscripcion')->name('cargaAcademica');

	Route::get('/registrados', function(){

    return view('estudiante.gestion');

  })->name('gestion-estudiantes');

	Route::post('/get_registrados', 'EstudianteController@getEstudiantes')->name('getRegistrados');
	Route::post('/get_estudiante', 'EstudianteController@getEstudiante')->name('getEstudiante');

  //Tablas
  Route::post('/get_preinscritos', 'EstudianteController@listaPreinscritos')->name('dataTablesPreinscritos');

  //PDF
  Route::prefix('pdf')->group(function(){

    Route::get('/certificadoInscripcion/{estudiante}','pdfController@pdfInscripcion')->name('pdf-inscripcion');

    Route::get('/pensumEstudio/{estudiante}', 'pdfController@pdfPensumEstudio')->name('pdf-pensum');

  });

});

Route::prefix('usuarios')->group(function(){

  Route::post('/registradas', 'MateriaController@lista')->name('dataTablesMaterias');// ---

  Route::get('/module', function(){

    return view('usuarios');

  })->name('usuarios');

  Route::get('/editar/{materia}', function(App\Models\Materia $materia){

    return view('materia.materia')
            ->with('materia', $materia);

  })->name('editarMateria');

  Route::post('/nueva','MateriaController@registrar')->name('ingresar-materia');

  Route::put('/actualizar','MateriaController@actualizar')->name('actualizar-materia');
});

// Modulo Materias
Route::prefix('materia')->group(function(){

  Route::get('/module', function(){

    return view('materia');

  })->name('materias');

	Route::post('/list', 'MateriaController@getMaterias')->name('get_materias');// ---
	Route::post('/get','MateriaController@Lista')->name('get-materias');
	Route::put('/add','MateriaController@registrar')->name('add_materia');
  Route::put('/update','MateriaController@actualizar')->name('update_materia');
	Route::post('/delete','MateriaController@delete')->name('delete_materia');
});

// Modulo Condicion de estudiante
Route::prefix('condicion')->group(function(){

  Route::post('/get_condiciones', 'CondicionController@getCondiciones')->name('get_condiciones');
});

// Modulo Trayectos
Route::prefix('trayecto')->group(function(){
// --- VISTA DE LISTADO
  Route::get('/module', function(){

		$carreras = App\Models\Carrera::orderBy('carrera', 'ASC')->get();

    return view('trayecto.trayecto')->with('carreras', $carreras);

  })->name('trayectos');

	Route::post('/dinamic_list','TrayectoController@getTrayectoByCarrera')->name('get_trayectos');
  Route::post('/get','TrayectoController@Lista')->name('get_trayectos');
	Route::put('/add','TrayectoController@registrar')->name('add_trayecto');
	Route::put('/update','TrayectoController@actualizar')->name('update_trayecto');
	Route::post('/delete','TrayectoController@delete')->name('delete_trayecto');

});

// Modulo Carreras
Route::prefix('carrera')->group(function(){
// --- VISTA DE LISTADO
  Route::get('/listado', function(){
    return view('carrera.carreraListadas');
  })->name('lista-carrera');

  Route::post('/registradas', 'CarreraController@lista')->name('dataTablesCarrera');

  Route::get('/form', function(){
    return view('carrera.carrera');
  })->name('vista-carrera');

  Route::get('/editar/{carrera}', function(App\Models\Carrera $carrera){
    return view('carrera.carrera')->with('carrera', $carrera);
  })->name('editarCarrera');

  Route::post('/nueva','CarreraController@registrar')->name('ingresar-carrera');
  Route::put('/actualizar','CarreraController@actualizar')->name('actualizar-carrera');

});

// Modulo Menciones
Route::prefix('mencion')->group(function(){
// --- VISTA DE LISTADO
  Route::get('/listado', function(){

    return view('mencion.mencionListadas');

  })->name('lista-mencion');

  Route::post('/registradas', 'MencionController@lista')->name('dataTablesMencion');
		Route::post('/get_menciones', 'MencionController@getMenciones')->name('get_menciones');

  Route::get('/form', function(){

    $carreras = App\Models\Carrera::orderBy('carrera', 'ASC')
                                  ->get()
                                  ->toArray();

    return view('mencion.mencion')->with('carreras', $carreras);

  })->name('vista-mencion');

  Route::get('/editar/{mencion}', function(App\Models\Mencion $mencion){

    $carreras = App\Models\Carrera::orderBy('carrera', 'DESC')
                                  ->get()
                                  ->toArray();

    return view('mencion.mencion')->with('mencion', $mencion)
                                  ->with('carreras', $carreras);

  })->name('editarMencion');

  Route::post('/nueva','MencionController@registrar')->name('ingresar-mencion');

  Route::put('/actualizar','MencionController@actualizar')->name('actualizar-mencion');

});

// Modulo Pensum
Route::prefix('pensum')->group(function(){
// --- VISTA DE LISTADO
  Route::get('/modulo', function(){

    $carreras = App\Models\Carrera::all();
    $anios = App\Models\Pensum::selectRaw('DISTINCT anio')
                              ->orderBy('anio', 'DESC')
                              ->get();

    return view('pensum.pensum')->with('carreras', $carreras)
                                ->with('anios', $anios);

  })->name('modulo-pensum');

  Route::get('/form/{anio}/{carrera}', function($anio, App\Models\Carrera $carrera){

    $trayectos = App\Models\TrayectoAcademico::select('trayecto_academico.id','t.trayecto')
                                      ->join('trayectos as t', 't.id', '=', 'trayecto_academico.id_trayecto')
                                      ->where('trayecto_academico.id_carrera', $carrera->id)
                                      ->orderBy('trayecto', 'ASC')
                                      ->get();

    $materias = App\Models\Materia::orderBy('materia', 'ASC')
                                    ->get();

    return view('pensum.formPensum')->with('anio', $anio)
                                    ->with('carrera', $carrera)
                                    ->with('trayectos', $trayectos)
                                    ->with('materias', $materias);
  })->name('nueva-matPensum');

  Route::put('/add', 'PensumController@registrar')->name('añadir_asignatura');

  Route::put('/actualizar', 'PensumController@actualizar')->name('actualizar-asignatura');

  Route::post('/get_asigs_pensum', 'PensumController@cargarAsignaturas')->name('cargar_asignaturas');
	Route::post('/get_asigs_byTrayecto', 'PensumController@cargarAsignaturasByTrayecto')->name('cargar_asignaturasByTrayecto');

  Route::post('/asignaturasPreladoras', 'PensumController@cargarPreladoras')->name('carga-preladoras');

  Route::post('/nuevo', 'PensumController@nuevo')->name('nuevo-pensum');

});

// Modulo oferta academica
Route::prefix('oferta_academica')->group(function(){
// --- VISTA DE LISTADO
  Route::get('/lista', function(){

    $carreras = App\Models\Carrera::all();
    $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
                                    ->get();

    return view('persecuencia.persecuencias')->with('carreras', $carreras)
                                            ->with('trayectos', $trayectos);

  })->name('lista-persecuencia');

  Route::post('/list', 'OfertaAcademicaController@lista')->name('get_ofertas_academicas');
	Route::post('/get', 'OfertaAcademicaController@get')->name('get_oferta_academica');
	Route::put('/add', 'OfertaAcademicaController@crear')->name('crear_oferta_academica');
	Route::put('/modify', 'OfertaAcademicaController@modify')->name('modificar_oferta_academica');

	Route::put('/update_secciones', 'OfertaAcademicaController@updateSecciones')->name('update_secciones');
	Route::put('/modify_seccion', 'OfertaAcademicaController@modifySeccion')->name('modify_seccion');
	Route::put('/delete_seccion', 'OfertaAcademicaController@deleteSeccion')->name('delete_seccion');
	Route::post('/get_all_secciones', 'OfertaAcademicaController@getAllSecciones')->name('get_all_secciones');
	Route::post('/get_available_secciones', 'OfertaAcademicaController@getAvailableSecciones')->name('get_available_secciones');
	Route::post('/get_carga_academica', 'OfertaAcademicaController@getCargaAcademica')->name('get_carga_academica');

	Route::get('/horarios', function(){

    $carreras = App\Models\Carrera::all();
    $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
                                    ->get();

    return view('persecuencia.horarios')->with('carreras', $carreras)
                                        ->with('trayectos', $trayectos);

  })->name('horarios');

	Route::post('/generate_horario', 'OfertaAcademicaController@generateHorario')->name('generate_horario');
	Route::post('/get_horario', 'OfertaAcademicaController@getHorario')->name('get_horario');
	Route::post('/get_clases', 'OfertaAcademicaController@getClases')->name('get_clases');
	Route::post('/check_availability', 'OfertaAcademicaController@checkClassAvailability')->name('check_availability');
	Route::post('/check_hour_availability', 'OfertaAcademicaController@checkHourAvailability')->name('check_hour_availability');
	Route::put('/save_horario', 'OfertaAcademicaController@saveHorario')->name('save_horario');
	Route::put('/modify_horario', 'OfertaAcademicaController@modifyHorario')->name('modify_horario');

	//
  // Route::get('/modulo', function(){
	//
  //   $carreras = App\Models\Carrera::all();
  //   $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
  //                                   ->get();
	//
  //   return view('persecuencia.persecuencia')->with('carreras', $carreras)
  //                                           ->with('trayectos', $trayectos);
	//
  // })->name('modulo-persecuencia');

  // Route::get('/editar/{persecuencia}', function(App\Models\Persecuencia $persecuencia){
	//
  //   $secciones = $persecuencia->secciones->toArray();
  //   $carreras = App\Models\Carrera::all();
  //   $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
  //                                   ->get();
	//
  //   $cohorte = explode('-', $persecuencia->cohorte);
	//
  //   return view('persecuencia.persecuencia')->with('cohorte', $cohorte)
  //                                           ->with('carreras', $carreras)
  //                                           ->with('trayectos', $trayectos)
  //                                           ->with('persecuencia', $persecuencia)
  //                                           ->with('secciones', $secciones);
	//
  // })->name('editar-persecuencia');

  // Route::post('/actualizar', 'PersecuenciaController@actualizar')->name('actualizar-persecuencia');
	//
  // Route::post('/seccion/actualizar', 'SeccionController@actualizarRegistrar')->name('actualizarRegistrar-persecuencia');

});

// Modulo Persecuencia
Route::prefix('persecuencia')->group(function(){
// --- VISTA DE LISTADO
  Route::get('/lista', function(){

    $carreras = App\Models\Carrera::all();
    $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
                                    ->get();

    return view('persecuencia.persecuencias')->with('carreras', $carreras)
                                            ->with('trayectos', $trayectos);

  })->name('lista-persecuencia');

  Route::post('/registradas', 'PersecuenciaController@lista')->name('dataTablesPersecuencias');

  Route::get('/modulo', function(){

    $carreras = App\Models\Carrera::all();
    $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
                                    ->get();

    return view('persecuencia.persecuencia')->with('carreras', $carreras)
                                            ->with('trayectos', $trayectos);

  })->name('modulo-persecuencia');

  Route::get('/editar/{persecuencia}', function(App\Models\Persecuencia $persecuencia){

    $secciones = $persecuencia->secciones->toArray();
    $carreras = App\Models\Carrera::all();
    $trayectos = App\Models\Trayecto::orderBy('trayecto', 'ASC')
                                    ->get();

    $cohorte = explode('-', $persecuencia->cohorte);

    return view('persecuencia.persecuencia')->with('cohorte', $cohorte)
                                            ->with('carreras', $carreras)
                                            ->with('trayectos', $trayectos)
                                            ->with('persecuencia', $persecuencia)
                                            ->with('secciones', $secciones);

  })->name('editar-persecuencia');

  Route::put('/add', 'PersecuenciaController@crear')->name('crear_persecuencia');

  Route::post('/actualizar', 'PersecuenciaController@actualizar')->name('actualizar-persecuencia');

  Route::post('/seccion/actualizar', 'SeccionController@actualizarRegistrar')->name('actualizarRegistrar-persecuencia');

});

// Modulo Cohorte
Route::prefix('cohorte')->group(function(){

// --- VISTA DE LISTADO
  Route::get('/listado', function(){

    return view('cohorte.cohortesListadas');

  })->name('lista-cohortes');

  Route::post('/registradas', 'CohorteController@lista')->name('dataTablesCohortes');
// ---

  Route::get('/form', function(){

    return view('cohorte.cohorte');

  })->name('vista-cohorte');

  Route::get('/editar/{cohorte}', function(App\Models\Cohorte $cohorte){

    return view('cohorte.cohorte')
            ->with('cohorte', $cohorte);

  })->name('editarCohorte');

  Route::post('/nueva','CohorteController@registrar')->name('ingresar-cohorte');

  Route::put('/actualizar','CohorteController@actualizar')->name('actualizar-cohorte');
});


// Modulo Profesores
Route::prefix('profesor')->group(function(){

    // --- VISTA DE LISTADO
      Route::get('/modulo-profesores', function(){

        return view('profesor.profesor');

      })->name('modulo-profesores');

			Route::post('/verificar_existencia', 'ProfesorController@verificarExistencia')->name('verificar_existencia');
			Route::put('/registrar','ProfesorController@store')->name('registrar_profesor');
      Route::post('/get_registrados', 'ProfesorController@lista')->name('get_registrados');
			Route::post('/get_profesor', 'ProfesorController@getProfesor')->name('get_profesor');
			Route::put('/modificar','ProfesorController@update')->name('modificar_profesor');
			Route::post('/delete','ProfesorController@delete')->name('delete_profesor');
			Route::put('/update_asignaturas_impartidas','ProfesorController@updateAsignaturasImpartidas')->name('update_asignaturas_impartidas');


      Route::get('/form', function(){

        return view('profesor.profesor');

      })->name('vista-profesor');

      Route::get('/editar/{profesor}', function(App\Models\Profesor $profesor){

        return view('profesor.profesor')
        ->with('profesor', $profesor);

      })->name('editarProfesor');


    });

// Modulo Configuracion
Route::prefix('configuracion')->group(function(){
		// --- VISTA DE LISTADO
	  Route::get('/instalaciones', function(){
	    return view('configuracion.instalaciones');
	  })->name('modulo-instalaciones');

	  Route::post('/get_instalaciones', 'ConfiguracionController@listaInstalaciones')->name('get_instalaciones');

	  Route::get('/editar/{carrera}', function(App\Models\Carrera $carrera){
	    return view('carrera.carrera')->with('carrera', $carrera);
	  })->name('editarCarrera');

	  Route::put('/nueva_cede','ConfiguracionController@registrarInstalacion')->name('nueva_cede');
	  Route::put('/modificar_cede','ConfiguracionController@modificarInstalacion')->name('modificar_cede');
		Route::put('/delete_cede', 'ConfiguracionController@deleteInstalacion')->name('delete_cede');
		Route::put('/modify_aula', 'ConfiguracionController@modifyAula')->name('modify_aula');
		Route::put('/delete_aula', 'ConfiguracionController@deleteAula')->name('delete_aula');
		Route::put('/add_aulas', 'ConfiguracionController@addAulas')->name('add_aulas');
});
