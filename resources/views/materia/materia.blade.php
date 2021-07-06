@extends('layouts.app')

@section('content')
<link href="{{ asset('js/alertifyjs/css/alertify.min.css') }}" rel="stylesheet">
<div class="card">
    <!-- Default panel contents -->
    <h5 class="card-header">
    	Materia
    </h5>
    <div class="card-body">
        <div class="form-horizontal">
        	<form method="POST">
        		@csrf
        		@if(isset($materia))
					<input type="text" id="id" value="{{ $materia->id }}" hidden>
				@endif

	            <div class="form-group"> <!-- Full Name -->
	                <label class="col-md- offset-md-1 col-form-label col-form-label-lg">Materia</label>
	                <div class="col-md-6 offset-md-1 input-group">
	                    <input type="text" class="form-control" id="materia" name="materia" placeholder="Ingrese la materia" value="{{ isset($materia)?$materia->materia:null }}">
	                </div>
	            </div>
	            <div class="col-md-12">
	                <div class="row justify-content-center">
	                    <div class="col-md-2">
	                        <button type="submit" class="btn btn-primary" id="btn-submit">{{ isset($materia)? "Modificar":"Registrar" }}</button>
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
        	</form>
        </div>
    </div>
</div>
<script type="text/javascript" src="{{ asset('js/alertifyjs/alertify.min.js') }}"></script>
<script type="text/javascript" src="{{ asset('js/Estudiante.js') }}"></script>
<script type="text/javascript">
$(document).ready(function(){

	var materia_presente = '{{ isset($materia)? $materia->id:null }}';

	$.ajaxSetup({
        headers: {
			'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

	$("#btn-submit").on("click", function(e){
		
		e.preventDefault();

		if(materia_presente == ''){

			var datos = {
				materia : $("#materia").val(),
            };
            
            $.ajax({
            	async:true,
                url: "{{ route('ingresar-materia') }}",
                cache:false,
                dataType:"json",
                type:  'POST',
            	data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    console.log(response);
                    if(response.response == 'OK'){

                        alertify.alert("Registro exitoso", 'Materia registrada correctamente.', function(){
                            window.close();
                            window.opener.location.reload();
                        }).set('label', 'Cerrar');
                        //console.log(response);
                    }else{

                        alertify.error("Error interno, no se pudo realizar la operacion.");
                        console.log(response.response);
                    }
                },
                error:function (response) {
                    console.log(response);
                    alertify.error("Error Interno");
                }
            });
		}else{
			
			var datos = {
				id : $("#id").val(),
				materia : $("#materia").val(),
            };
            
            $.ajax({
            	async:true,
                url: "{{ route('actualizar-materia') }}",
                cache:false,
                dataType:"json",
                type:  'PUT',
            	data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    
                    if(response.response == 'OK'){

                        alertify.alert("Actualización exitosa", 'Materia actualizada correctamente.', function(){
                            window.close();
                            window.opener.location.reload();
                        }).set('label', 'Cerrar');
                        //console.log(response);
                    }else{

                        alertify.error("Error interno, no se pudo realizar la operacion.");
                        console.log(response.response);
                    }
                },
                error:function (response) {
                    console.log(response);
                    alertify.error("Error Interno");
                }
            });			
		}
	});

});	
</script>
@endsection