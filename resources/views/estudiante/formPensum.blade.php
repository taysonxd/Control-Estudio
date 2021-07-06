<!-- Scripts -->
<script src="{{ asset('js/jquery-3.4.0.min.js') }}" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="{{ asset("js/jquery-3.4.0.min.js") }} }}"><\/script>')</script>
<script src="{{ asset('js/Bootstrap/bootstrap.bundle.min.js') }} " integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>

<!-- Fonts -->
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

<!-- Styles -->    
<link href="{{ asset('css/Bootstrap/bootstrap.min.css') }}" rel="stylesheet">
<link href="{{ asset('css/alertify.css') }}" rel="stylesheet">
<link href="{{ asset('js/alertifyjs/css/alertify.min.css') }}" rel="stylesheet">
<div class="card">
    <!-- Default panel contents -->
    <h5 class="card-header">
    	Incluir materia al pensum.
    </h5>
    <div class="card-body">
        <div class="form-horizontal">
        		@csrf
        		
				<input type="text" id="carrera" name="carrera" value="{{ $carrera->id }}" hidden>
                <input type="text" id="anio" name="anio" value="{{ $anio }}" hidden>
				
	            <div class="form-group"> <!-- Full Name -->
                    <center>
                        <div id="head_estudiante" class="col-md-12">
                            <h1>
                               {!! $anio !!}
                            </h1>
                        </div>
                        <label class="col-md-12 col-form-label col-form-label-lg">{{ $carrera->carrera }}</label>
                    </center>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">Trayecto:</label>
                    </div>
                    <div class="col-md-4">
                        <select class="form-control custom-control-inline" id="id_trayecto" name="trayecto">
                        @foreach($trayectos as $trayecto)
                            <option value="{{ $trayecto['id'] }}">{{ $trayecto['trayecto'] }}</option>
                        @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">Materia:</label>
                    </div>
                    <div class="col-md-4">
                        <select class="form-control custom-control-inline" id="id_materia" name="materia">
                        @foreach($materias as $materia)
                            <option value="{{ $materia['id'] }}">{{ $materia['materia'] }}</option>
                        @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">Codigo de asignatura:</label>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="cod_asignatura" name="cod_asignatura" placeholder="Codigo de la asignatura">
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">Denominación de asignatura:</label>
                    </div>
                    <div class="col-md-8">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Denominacion a la asignatura" id="desc_asignatura" name="desc_asignatura" aria-label="Denominación de la asignatura" aria-describedby="button-addon2">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" id="button-addon2" data-toggle="button" aria-pressed="false" autocomplete="off">Denominación por defecto</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">Caracter de la UC:</label>
                    </div>
                    <div class="col-md-1">
                        <input type="text" class="form-control" id="caracter_uc" name="caracter_uc" maxlength="2">
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-4"> 
                        <label class="col-form-label">Horas practicas semanales:</label>
                        <div>
                            <input type="text" class="form-control" id="hps" style="text-align: center; width: 48px;border:1px #aaa solid;" onkeypress="return soloNumeros(event);" maxlength="2">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label class="col-form-label">Horas totales:</label>
                        <div>
                            <input type="text" class="form-control" id="ht" readonly="readonly" style="text-align: center; width: 60px;border:1px #aaa solid;" onkeypress="return soloNumeros(event);" maxlength="3">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <label class="col-form-label">UC:</label>
                        <div>
                            <input type="text" class="form-control" id="uc" style="text-align: center; width: 40px;border:1px #aaa solid;" onkeypress="return soloNumeros(event);" maxlength="2">
                        </div>
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">prelaciones:</label>
                    </div>
                    <div class="col-md-5">
                        <input type="text" class="form-control" id="caracter_uc" name="caracter_uc">
                    </div>
                </div>
	            <div class="col-md-12">
	                <div class="row justify-content-center">
	                    <div class="col-md-2">
	                        <button type="submit" class="btn btn-primary" id="btn-submit" onclick="incluirMateria();">Incluir</button>
	                    </div>
	                    <div class="col-md-2">
	                        <button type="button" class="btn btn-secondary" id="cancelar" onclick="cerrarVentana();">Cancelar</button>
	                    </div>
	                </div>
	            </div>
	            <!-- <div id="cargando">
	                <div class="progress">
	                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
	                </div>
	                <center>
	                    <label class="col-md-0 col-form-label text-md-right">Cargando</label>
	                </center>
	            </div> -->
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/alertifyjs/alertify.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/Pensum.js') }}"></script>
<script type="text/javascript">
$(document).ready(function(){

    $("#hps").on("keyup",function(){
        
        var semanales_total = $(this).val()*36;

        $("#ht").val(semanales_total);
    });

    $("#id_materia").on("change", function(){
        
        $("#desc_asignatura").val($(":selected",this).text());

        if($("#button-addon2").hasClass("active") == false){

            $("#button-addon2").addClass("active");
            $("#button-addon2").attr("aria-pressed", true);
            $("#desc_asignatura").attr("disabled", true);    
        }
        
    });

    $("#button-addon2").on("click", function(){
        
        if($(this).attr("aria-pressed") != 'true'){
            
            var materia_selec = $("#id_materia :selected").text();
        
            $("#desc_asignatura").val(materia_selec);
            $("#desc_asignatura").attr("disabled", true);
        }else{
            
            $("#desc_asignatura").attr("disabled", false);
            $("#desc_asignatura").val("");            
        }
    });

	var materia_presente = '{{ isset($carrera)? $carrera->id:null }}';

});	
</script>