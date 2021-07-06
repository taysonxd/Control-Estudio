@extends('layouts.app')

@section('content')
<link href="{{ asset('js/alertifyjs/css/alertify.min.css') }}" rel="stylesheet">
<div class="card">
    <!-- Default panel contents -->
    <h5 class="card-header">
    	Cohorte
    </h5>
    <div class="card-body">
        <div class="form-horizontal">
        	<form method="POST">
        		@csrf
        		@if(isset($cohorte))
					<input type="text" id="id" value="{{ $cohorte->id }}" hidden>
				@endif
	            <div class="form-group"> 
	                <label class="col-md-5 col-form-label">cogido cohorte</label>
                    <div class="col-md-4 input-group">
                        <input type="text" class="form-control" id="codigo_cohorte" name="codigo_cohorte" placeholder="Codigo de la cohorte" value="{{ isset($cohorte)?$cohorte->codigo_cohorte:null }}">
                    </div>                  
	            </div>
                <div class="form-group"> 
                    <label class="col-md-5 col-form-label">cohorte</label>
                    <div class="col-md-6 input-group">
                        <input type="text" class="form-control" id="cohorte" name="cohorte" placeholder="Ingrese cohorte" value="{{ isset($cohorte)?$cohorte->cohorte:null }}">
                    </div>
                </div>

	            <div class="col-md-12">
	                <div class="row justify-content-center">
	                    <div class="col-md-2">
	                        <button type="submit" class="btn btn-primary" id="btn-submit">{{ isset($cohorte)? "Modificar":"Registrar" }}</button>
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
<script type="text/javascript">
$(document).ready(function(){

    var cohorte_presente = '{{ isset($cohorte)? $cohorte->id:null }}';

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $("#btn-submit").on("click", function(e){
        
        e.preventDefault();

        if(cohorte_presente == '' ){

            var datos = {
                cohorte : $("#cohorte").val(),
                codigo_cohorte : $("#codigo_cohorte").val(),
            };
            
            $.ajax({
                async:true,
                url: "{{ route('ingresar-cohorte') }}",
                cache:false,
                dataType:"json",
                type:  'POST',
                data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    
                    if(response.response == 'OK'){

                        alertify.alert("Registro exitoso", 'Cohorte registrada correctamente.', function(){
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
                cohorte : $("#cohorte").val(),
                codigo_cohorte : $("#codigo_cohorte").val()
            };
            
            $.ajax({
                async:true,
                url: "{{ route('actualizar-cohorte') }}",
                cache:false,
                dataType:"json",
                type:  'PUT',
                data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    
                    if(response.response == 'OK'){

                        alertify.alert("Actualización exitosa", response.exito, function(){
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