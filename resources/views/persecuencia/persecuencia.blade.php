<!-- Scripts -->
<script src="{{ asset('js/jquery-3.4.0.min.js') }}" crossorigin="anonymous"></script>
<script>window.jQuery || document.write('<script src="{{ asset("js/jquery-3.4.0.min.js") }} }}"><\/script>')</script>
<script src="{{ asset('js/Bootstrap/bootstrap.bundle.min.js') }} " integrity="sha384-xrRywqdh3PHs8keKZN+8zzc5TX0GRTLCcmivcbNJWm2rs5C8PRhcEn3czEjhAO9o" crossorigin="anonymous"></script>

<!-- Fonts -->
<link rel="dns-prefetch" href="//fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

<!-- Styles -->
<link href="{{ asset('css/Bootstrap/bootstrap.min.css') }}" rel="stylesheet">

<link rel="stylesheet" type="text/css" href="{{ asset('js/DataTables/DataTables-1.10.20/css/dataTables.bootstrap4.min.css') }} ">
<link rel="stylesheet" type="text/css" href="{{ asset('js/DataTables/Responsive-2.2.3/css/responsive.dataTables.min.css') }}  ">
<link href="{{ asset('js/alertifyjs/css/alertify.min.css') }}" rel="stylesheet">
<link href="{{ asset('js/datepicker/css/bootstrap-datepicker3.min.css') }}" rel="stylesheet">
<style type="text/css">
    td.details-control {
        background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
        cursor: pointer;
    }
    tr.shown td.details-control {
        background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
    }
    table {
        border-collapse: collapse;
    }
    table td.subrayado{
        border-bottom: 1px solid #000;
    }
</style>
<div class="row-fluid justify-content-center">
    <div class="col-md-14">
        <div class="card">
            <!-- Default panel contents -->
            <div class="card-header">
                Gestión de persecuencia
            </div>
            <div class="card-body">
                @csrf
                <input type="hidden" id="id" value="{{ isset($persecuencia)?$persecuencia->id:null }}">
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-2">
                        <label class="col-form-label">Cohorte:</label>
                    </div>
                    <div class="row">
                        <div class="col-md-5">
                            <input id="startDate" name="startDate" type="text" class="datepicker form-control" value="{{ isset($cohorte)? $cohorte[0]:null }}"/>
                        </div>
                        <label class="col-form-label">al</label>
                        <div class="col-md-5">
                            <input id="endDate" name="endDate" type="text" class="datepicker form-control" value="{{ isset($cohorte)? $cohorte[1]:null }}"/>
                        </div>
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-2">
                        <label class="col-form-label">Carrera:</label>
                    </div>
                    <div class="col-md-4">
                        <select class="form-control custom-control-inline" id="id_carrera" name="carrera">
                        @foreach($carreras as $carrera)
                            <option value="{{ $carrera['id'] }}">{{ $carrera['carrera'] }}</option>
                        @endforeach
                        </select>
                    </div>
                </div>
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-2">
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
                <div class="col-md-13">
                    <div class="card-header">
                        <h5>
                            Secciones:
                        </h5>
                    </div>
                </div>
                <div class="form-group card card-body">
                    <div id="container-secciones">
                        @if(isset($secciones))
                            @foreach($secciones as $seccion)
                            @if(reset($secciones) != $seccion)
                                <hr>
                            @endif
                                <div class="form-group row"> <!-- Full Name -->
                                    <input type="hidden" value="{{ $seccion['id'] }}">
                                    <div class="col-md-3">
                                        <label class="col-form-label">Identificador de la sección:</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" id="seccion" name="seccion" value="{{ $seccion['codigo'] }}" aria-label="Sección">
                                    </div>
                                    <div class="col-md-3">
                                        <label class="col-form-label">Cupos limite para esta sección:</label>
                                    </div>
                                    <div class="col-md-2">
                                        <input type="text" class="form-control" id="cupos" name="cupos" value="{{ $seccion['cupos'] }}" aria-label="Cupos">
                                    </div>
                                </div>
                            @endforeach
                        @else
                            <div class="form-group row"> <!-- Full Name -->
                                <input type="hidden" value="">
                                <div class="col-md-3">
                                    <label class="col-form-label">Identificador de la sección:</label>
                                </div>
                                <div class="col-md-2">
                                    <input type="text" class="form-control" id="seccion" name="seccion" aria-label="Sección">
                                </div>
                                <div class="col-md-3">
                                    <label class="col-form-label">Cupos limite para esta sección:</label>
                                </div>
                                <div class="col-md-1">
                                    <input type="text" class="form-control" id="cupos" name="cupos" aria-label="Cupos">
                                </div>
                            </div>
                        @endif
                    </div>
                    <hr>
                    <div class="row"> <!-- Full Name -->
                        <div class="col-md-12">
                            @if(isset($persecuencia))
                                <button class="btn btn-success btn-sm" onclick="registrarSeccion();">Actualizar secciones</button>
                            @endif
                            <button style="float:right;" class="badge badge-pill badge-danger" id="delete_seccion"><strong>-</strong></button>
                            <button style="float:right;" class="badge badge-pill badge-primary" id="other_seccion"><strong>+</strong></button>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <center>
                        <button class="btn btn-primary btn-sm" id="crear" onclick="submitPersecuencia();">{{ isset($persecuencia)? "Modificar persecuencia":"Crear persecuencia" }}</button>
                    </center>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" charset="utf8" src="{{ asset('js/Persecuencia.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/datepicker/js/bootstrap-datepicker.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/alertifyjs/alertify.min.js') }}"></script>
<script type="text/javascript">

var perse_presente = "{{ isset($persecuencia->id)? $persecuencia->id:'' }}";

$("#button-addon2").addClass("active");
$("#button-addon2").attr("aria-pressed", true);

$('#startDate').datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years"
});

$('#endDate').datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years"
});

$('.input-daterange input').each(function(){
    $(this).datepicker('clearDates');
});

actualizacion();

function actualizacion(){

    $(document).ready(function(){

        $("#id_carrera").val({{ isset($persecuencia)?$persecuencia->id_carrera:'' }});
        $("#id_trayecto").val({{ isset($persecuencia)?$persecuencia->id_trayecto:'' }});
    })
}

function abrir(){

    var anio = $("#id_anio").val();
    var carrera = $("#id_carrera").val();
    var url = "{{ url('pensum/form') }}";
    url += '/'+anio+'/'+carrera

    //console.log(url);
    open(url, '_blank', 'top=200,left=550,width=1000,height=758');
}
</script>
