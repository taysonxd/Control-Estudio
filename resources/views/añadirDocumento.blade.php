@extends('layouts.app')

@section('content')
<link href="{{ asset('js/alertifyjs/css/alertify.min.css') }}" rel="stylesheet">
<div class="card">
    <!-- Default panel contents -->
    <h5 class="card-header">
    	Añadir Documento
    </h5>
    <div class="card-body">
        <div class="form-horizontal">
        	<form method="POST" action="{{ route('nuevo_estudiante') }}" enctype="multipart/form-data">
        		@csrf
	            <div class="form-group"> <!-- Zip Code-->
	                <label for="id_carrera" class="col-md-3 offset-md-1 col-form-label-lg">Tipo de documento</label><br/><br/>
	                <div class="col-md-2 offset-md-1 input-group">
	                    <select class="form-control" id="id_tipo" name="tipo_documento">
	                    	<option value="RESOLUCION">Resolución</option>
	                    </select>
	                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
	                <label class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Codigo</label><br><br>
	                <div class="col-md-3 offset-md-1 input-group">
	                    <input type="text" class="form-control" id="codigo" name="codigo" placeholder="codigo del documento">
	                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
	                <label class="col-md-3 offset-md-1 col-form-label col-form-label-lg">Fecha de publicación</label><br><br>
	                <div class="col-md-3 offset-md-1 input-group">
	                    <input type="date" class="form-control" id="fecha_pub" name="fecha_pub">
	                </div>
	            </div>
	            <div class="form-group"> <!-- Full Name -->
		            <div class="col-md-12">
		            	<div class="row">
			                <div class="col-md-5">
		                        <label class="col-md-4 offset-md-2 col-form-label-lg">Documento</label>
				                <div class="col-md-9 offset-md-2 input-group">
				                    <input type="text" class="form-control custom-control-inline" readonly="readonly" id="documento" name="documento">
				                </div>
		                    </div>
		                    <div class="col-md-7">
		                        <label class="col-md-7 col-form-label-lg">Agregar documento PDF</label>
				                <div class="col-md-9 input-group">
				                    <input id="pdf-file" name="pdf-file" type="file" accept="application/pdf"/>
				                </div>
		                    </div>
	                    </div>
	                </div>
                </div>
        	</form>
            <div class="col-md-12">
                <div class="row justify-content-center">
                    <div class="col-md-3">
                        <button type="submit" class="btn btn-primary" id="añadir_doc">Añadir documento</button>
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
<script type="text/javascript" src="{{ asset('js/Estudiante.js') }}"></script>
<script type="text/javascript">

	$('#pdf-file').change(function(){
		var file = $('#pdf-file')[0].files[0].name.split('.');
 		$("#documento").val(file[0]);
	});

	$("#añadir_doc").on("click", function(){

		var formData = new FormData();
		formData.append('tipo',$('#id_tipo').val());
		formData.append('codigo',$('#codigo').val());
		formData.append('fecha_pub',$('#fecha_pub').val());
		formData.append('documento',$('#documento').val());
	    formData.append('pdf',$('#pdf-file')[0].files[0]);
	    
	    $.ajaxSetup({
            headers: {
                 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

		$.ajax({
			 url :  '{{ route("añadir-doc") }}',
			 method : "POST",
			 data: formData,
			 contentType:false,
			 processData:false
		}).done(function(data) {
			alertify.success('Documento agregado correctamente.');
		}).fail(function(error, textStatus) {
		    console.log(error);
		    var obj = $.parseJSON(error.responseText);
		    console.log(obj);
		    alertify.error(obj.error.message);
		});
	});
</script>
@endsection