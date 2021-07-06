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
    	Mención
    </h5>
    <div class="card-body">
        <div class="form-horizontal">
        	<form method="POST">
        		@csrf
        		@if(isset($mencion))
					<input type="text" id="id" value="{{ $mencion->id }}" hidden>
				@endif
                <div class="form-group row"> <!-- Full Name -->
                    <div class="col-md-3"> 
                        <label class="col-form-label">Carrera:</label>
                    </div>
                    <div class="col-md-6">
                        <select class="form-control custom-control-inline" id="id_carrera" name="carrera">
                        @foreach($carreras as $carrera)
                            <option value="{{ $carrera['id'] }}">{{ $carrera['carrera'] }}</option>
                        @endforeach
                        </select>
                    </div>                    
                </div>
	            <div class="form-group row"> <!-- Full Name -->
	                <div class="col-md-3"> 
                        <label class="col-form-label">Carrera:</label>
                    </div>
                    <div class="col-md-6">
                        <input type="text" class="form-control" id="mencion" name="mencion" placeholder="Ingrese la mención" value="{{ isset($mencion)?$mencion->mencion:null }}">
                    </div>                
	            </div>
	            <div class="col-md-12">
	                <div class="row justify-content-center">
	                    <div class="col-md-2">
	                        <button type="submit" class="btn btn-primary" id="btn-submit">{{ isset($mencion)? "Modificar":"Registrar" }}</button>
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

	var mencion_presente = '{{ isset($mencion)? $mencion->id:null }}';

	$.ajaxSetup({
        headers: {
			'X-CSRF-TOKEN': $('input[name="_token"]').val()
        }
    });

	$("#btn-submit").on("click", function(e){

		e.preventDefault();

		if(mencion_presente == ''){

			var datos = {
				id_carrera : $("#id_carrera").val(),
                mencion : $("#mencion").val()
            };

            $.ajax({
            	async:true,
                url: "{{ route('ingresar-mencion') }}",
                cache:false,
                dataType:"json",
                type:  'POST',
            	data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    console.log(response);
                    if(response.response == 'OK'){

                        alertify.alert("Registro exitoso", 'Mención registrada correctamente.', function(){
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
				id_carrera : $("#id_carrera").val(),
                mencion : $("#mencion").val()
            };
            
            $.ajax({
            	async:true,
                url: "{{ route('actualizar-mencion') }}",
                cache:false,
                dataType:"json",
                type:  'PUT',
            	data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    
                    if(response.response == 'OK'){

                        alertify.alert("Actualización exitosa", 'Mención actualizada correctamente.', function(){
                            window.close();
                            window.opener.location.reload();
                        }).set('label', 'Aceptar');
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

    actualizacion();

    function actualizacion(){

        $(document).ready(function(){

            $("#id_carrera").val({{ isset($mencion)?$mencion->id_carrera:'' }});
        })
    }

});	
</script>
