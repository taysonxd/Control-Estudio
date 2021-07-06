var URL = window.location.protocol + "//" + window.location.host;
var pathdirectory =  location.pathname.split('/');

for (i = 0; i < (pathdirectory.length-1); i++) {
    if(pathdirectory[i] != ''){
        URL = URL + '/' + pathdirectory[i];
    }
}

$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').val()
        }
    });

    $("#other_seccion").on("click", function(){
        
        var seccion = '<input type="text" class="form-control" id="seccion" name="seccion" aria-label="Sección">';
        var cupos = '<input type="text" class="form-control" id="cupos" name="cupos" aria-label="Sección">';
        var seccion_content = '<hr><div class="form-group row">'
                                    +'<input type="hidden" value="">'
                                    +'<div class="col-md-3">' 
                                        +'<label class="col-form-label">Identificador de la sección:</label>'
                                    +'</div>'
                                    +'<div class="col-md-2">'
                                        +seccion
                                    +'</div>'
                                    +'<div class="col-md-3">' 
                                        +'<label class="col-form-label">Cupos limite para esta sección:</label>'
                                    +'</div>'
                                    +'<div class="col-md-2">'
                                        +cupos
                                    +'</div>';

        $("#container-secciones").append(seccion_content).fadeIn('1000');
    });

    $("#delete_seccion").on("click", function(){
        
        var secciones = $("#container-secciones div.form-group");
        
        if(secciones.length > 1){

            $("#container-secciones").find('div.form-group').eq(secciones.length-1).remove();
            $("#container-secciones").find('hr').eq(secciones.length-2).remove();
        }
        // $("#container-secciones").find('div .form-group');
    });
}); // - FIN DEL DOCUMENT -

function registrarSeccion(){

    var secciones = [];

    $("#container-secciones div.form-group").each(function(){
        
        secciones.push(
            {   
                'id' : $(this).find('input').eq('0').val()!='' ? $(this).find('input').eq('0').val(): '',
                'codigo' : $(this).find('input').eq('1').val(),
                'cupos' : $(this).find('input').eq('2').val()
            }
        );
    });
    
    var datos = {
        id_persecuencia : perse_presente,
        secciones : secciones
    };

    alertify.confirm(
        "Confirmación",
        "Va a actualizar las secciones para la cohorte: "+$("#startDate").val()+"-"+$("#endDate").val()+"<br><br>¿Confirma la operación?",
        function(){

            var URLa = window.location.protocol + "//" + window.location.host;
            var paths = pathdirectory.length-2;
            
            for (i = 0; i < (paths-1); i++) {
                if(pathdirectory[i] != ''){
                    URLa = URLa + '/' + pathdirectory[i];
                }
            }

            $.ajax({
                async:true,
                url: URLa+'/persecuencia/seccion/actualizar',
                cache:false,
                dataType:"json",
                type:  'POST',
                data:  datos,
                beforeSend:function () {
                },
                success:function (response) {
                    //console.log(response);
                    if(response.response == 'OK'){

                        alertify.alert("Actualización exitosa", "Las secciones de esta persecuencia se han actualizado correctamenta.", function(){
                            window.close();
                        }).set('label', 'Aceptar');
                        //console.log(response);
                    }else if(response.error.status_code == '220'){
                        alertify.error(response.error.message);
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
        },
        function(){
        }
    );
}

function submitPersecuencia(){

    var secciones = [];

    $("#container-secciones div.form-group").each(function(){
        
        secciones.push(
            {   
                'id' : $(this).find('input').eq('0').val()!='' ? $(this).find('input').eq('0').val(): '',
                'codigo' : $(this).find('input').eq('1').val(),
                'cupos' : $(this).find('input').eq('2').val()
            }
        );
    });
    
    var datos = {
        id : $("#id").val()!='' ? $("#id").val() : '',
        cohorte : $("#startDate").val()+"-"+$("#endDate").val(),
        carrera : $("#id_carrera").val(),
        trayecto : $("#id_trayecto").val(),
        secciones : secciones
    };

    if(perse_presente != ''){

        var URLa = window.location.protocol + "//" + window.location.host;
        var paths = pathdirectory.length-2;
        
        for (i = 0; i < (paths-1); i++) {
            if(pathdirectory[i] != ''){
                URLa = URLa + '/' + pathdirectory[i];
            }
        }

        alertify.confirm(
            "Confirmación",
            "Va modificar esta persecuencia para la cohorte: "+datos.cohorte+"<br><br>¿Confirma la modificación?",
            function(){

                $.ajax({
                    async:true,
                    url: URLa+'/persecuencia/actualizar',
                    cache:false,
                    dataType:"json",
                    type:  'POST',
                    data:  datos,
                    beforeSend:function () {
                    },
                    success:function (response) {
                        //console.log(response);
                        if(response.response == 'OK'){

                            alertify.success("Modificación de persecuencia exitosa.");
                            vaciarCampos();
                            //console.log(response);
                        }else if(response.error.status_code == '220'){
                            
                            alertify.error(response.error.message);
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
            },
            function(){
            }
        );
    }else{

        alertify.confirm(
            "Confirmación",
            "Va a crear una nueva persecuencia para la cohorte: "+datos.cohorte+"<br><br>¿Confirma el registro?",
            function(){

                $.ajax({
                    async:true,
                    url: URL+'/crear',
                    cache:false,
                    dataType:"json",
                    type:  'POST',
                    data:  datos,
                    beforeSend:function () {
                    },
                    success:function (response) {
                        //console.log(response);
                        if(response.response == 'OK'){

                            alertify.success("Creacion de persecuencia exitosa.");
                            window.opener.location.reload();
                            vaciarCampos();
                            //console.log(response);
                        }else if(response.error.status_code == '220'){
                            
                            alertify.error(response.error.message);
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
            },
            function(){
            }
        );
    }
}

function soloNumeros(e){

    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function vaciarCampos(){

    $('input').val('');
    $('select').val('');
}

function cerrarVentana(){

    window.close();
}
