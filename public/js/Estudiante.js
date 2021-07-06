var URL = window.location.protocol + "//" + window.location.host;
var pathdirectory =  location.pathname.split('/');

for (i = 0; i < (pathdirectory.length-1); i++) {
    if(pathdirectory[i] != ''){
        URL = URL + '/' + pathdirectory[i];
    }
}

$(document).ready(function(){

    $('#cargando').hide();

    $(".select-local").on("change", function(){

        $("option:selected", this).each(function(){

            var valor_select = $(this).val();
            var id_select = $(this).parent().attr("id");
            //alert(nombre_select);

            $.ajaxSetup({
                headers: {
                     'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                    async:true,
                    url: URL + '/estudiante/selectDinamicos',
                    cache:false,
                    dataType:"json",
                    type: 'POST',
                    data: {
                        valor_select : valor_select,
                        id_select : id_select,
                        cargar_select_dinamico : "cargar_select_dinamico"
                    },
                    success: function(respuesta){
                        
                        if(id_select == "estado"){

                            $('#local_municipio').html('<option value="">Seleccione una provincia</option>');
                            $.each(respuesta, function(key, value){
                                $('#local_municipio').append('<option value='+value.id+'>'+value.municipio+'</option>');
                            });

                        }else if(id_select == "local_municipio"){

                            $('#local_parroquia').html('<option value="">Seleccione una provincia</option>');
                            $.each(respuesta, function(key, value){
                                $('#local_parroquia').append('<option value='+value.id+'>'+value.parroquia+'</option>');
                            });

                        }else if(id_select == "id_pais_nac"){

                            $('#id_provincia_nac').html('<option value="">Seleccione una provincia</option>');
                            $.each(respuesta, function(key, value){
                                $('#id_provincia_nac').append('<option value='+value.id+'>'+value.provincia+'</option>');
                            });

                        }

                    },
                    beforeSend:function(){},
                    error:function(objXMLHttpRequest){}
            });
        });
    });

    $("select.form-control").on("change", function(){

        var label_parent = $(this).parent().parent().find('label.col-form-label-lg');

        if(label_parent.css('color') == "rgb(245, 84, 84)" && ($(this).val() != '' || $(this).val() != null)){

            label_parent.css("color", "black");
        }
    });

    $("input.form-control").on("keyup", function(){

        var label_parent = $(this).parent().parent().find('label.col-form-label-lg');

        if(label_parent.css('color') == "rgb(245, 84, 84)" && ($(this).val() != '' || $(this).val() != null)){

            label_parent.css("color", "black");
        }
    });

    $("input.form-control").on("keyup", function(){

        var label_parent = $(this).parent().parent().find('label.col-form-label-lg');

        if(label_parent.css('color') == "rgb(245, 84, 84)" && ($(this).val() != '' || $(this).val() != null)){

            label_parent.css("color", "black");
        }
    });

    $("input[type=radio].form-check-input").on("click", function(){

        // if($(this).attr('name') == 'discapacidad'){

        //     var label_parent = $(this).parent().parent().parent().find('label.col-form-label-lg');

        //     if(label_parent.css('color') == "rgb(245, 84, 84)"){

        //         label_parent.css("color", "black");
        //     }
        // }else if($(this).attr('name') == 'nivel_discapacidad'){

        //     var label_parent = $(this).parent().parent().parent().find('label.col-form-label-lg');

        //     if(label_parent.css('color') == "rgb(245, 84, 84)"){

        //         label_parent.css("color", "black");
        //     }
        // }else{

            var label_parent = $(this).parent().parent().find('label.col-form-label-lg');

            if(label_parent.css('color') == "rgb(245, 84, 84)"){

                label_parent.css("color", "black");
            }
        // }
    });

    $("#registrar_pre").click(function(){

        var confirmacion = confirm("Los datos ingresados deben ser verificados.\n\n¿Esta seguro de preinscribir?");

        $('#cargando').show();

        if(confirmacion == true){
                
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });

                var requisitos = [];

                $($('input[name=requisitos]:checked')).each(function(){
                    if($(this).prop("checked") == true){
                       requisitos.push($(this).val());
                    }
                });

                $.ajax({//codigo ajax para envio de las variables
                    data:  {
                     nacionalidad : $("input[name=nacionalidad]:checked").val(),
                     cedula : $('#cedula').val(),
                     sexo :$("input[name=sexo]:checked").val(),
                     nombre_uno : $('#nombre_uno').val(),
                     nombre_dos : $('#nombre_dos').val(),
                     apellido_uno : $('#apellido_uno').val(),
                     apellido_dos : $('#apellido_dos').val(),
                     email : $("#email").val(),
                     fecha_nac : $('#fecha_nac').val(),
                     provincia : $('#id_provincia_nac').val(),
                     parroquia : $("#local_parroquia").val(),
                     local_direccion : $('#local_direccion').val(),
                     carrera : $('#id_carrera').val(),
                     discapacidad : $("input[name=discapacidad]:checked").val(),
                     nivel_discapacidad : $("input[name=nivel_discapacidad]:checked").val(),
                     des_discapacidad : $('#des_discapacidad').val(),
                     opsu : $("input[name=opsu]:checked").val(),
                     inst_bachillerato : $('#inst_bachillerato').val(),
                     anio_egreso : $('#anio_egreso').val(),
                     requisitos : requisitos
                    },
                    url:    URL + '/estudiante/registrar', //archivo donde envia las variables
                    type:  'POST',
                    beforeSend:function () { // funcion para mostrar mensaje ante envio de variables
                      $('#cargando').show();
                    },
                    success:function (response) {
                        console.log(response);
                        if(response.response='OK'){
                            alertify.success("Registro Exitoso"); 
                        }
                     $('#cargando').hide();
                    },
                    error:function (response) {
                        
                        console.log(response);
                        var obj = $.parseJSON(response.responseText);
                        console.log(obj.error.message);
                        $('#message-error').html("");  
                        $('#message-error').show();

                        $.each(obj.error.message, function(key, value) {
                            $('#message-error').append(value + '<br>')  
                        });
                        
                        $('#cargando').hide();
                        alertify.error("Error");
                    }
                });
          
        }
    });
}); // - FIN DEL DOCUMENT -



function modificar(){

    if(validarRegistro()){

        if(!verifCamposCambiados()){

            alertify.error("Error<br>Ningun dato ha sido modificado en los campos.");
        }else{

            var datos = {
                modificacion : "modificar",
                id_persona : id_persona,
                id_estudiante : id_estudiante,
                nacionalidad : $("input[name=Nacionalidad]:checked").val(),
                cedula : $('#cedula').val(),
                nombre_uno : $('#nombre_uno').val(),
                nombre_dos : $('#nombre_dos').val(),
                apellido_uno : $('#apellido_uno').val(),
                apellido_dos : $('#apellido_dos').val(),
                sexo : $("input[name=Sexo]:checked").val(),
                fecha_nac : $('#fecha_nac').val(),
                pais : $('#id_pais').val(),
                provincia : $('#id_provincia').val(),
                edo_civil : $("input[name=EdoCivil]:checked").val(),
                direccion : $('#direccion').val(),
                parroquia : $('#id_parroquia').val(),
                cohorte : $('#id_cohorte').val(),
                estatus1 : $('#id_estatus1').val(),
                estatus2 : $('#id_estatus2').val(),
                condicion : $('#id_condicion').val(),
                carrera : $('#id_carrera').val(),
                mencion : $('#id_mencion').val(),
            };

            $.ajax({
                async:true,
                cache:false,
                dataType:"html",
                type:  'POST',
                url:   '../Controlador/CtrlEstudiante.php',
                data:  datos,
                beforeSend:function () {
                  $('#cargando').show();
                },
                success:function (response){
                    //alert(response);
                    if(response.debug === undefined){

                        if(response.error === undefined){

                            if(response == "modificado"){
                                alertify.success("Modificacion exitosa.");
                            }else if(response == "error"){
                                alertify.error("Error.<br><br>No se pudo modificar.");
                            }else if(response == "duplicado"){
                                alertify.error("Atencion.<br><br>La cedula ya existe en otro estudiante.");
                            }
                            //console.log(response);
                        }else{

                            alertify.error(response);
                        }
                    }else{
                        alertify.error("Debug Activo");
                        console.log(response);
                    }

                    $('#cargando').hide();
                },
                error:function (response) {
                    console.log(response);
                    alertify.error("Error Interno");
                    $('#cargando').hide();
                }
            });
        }
    }
}



function validarActuInscripcion(){

    var validar;

    if(
        $('#id_cohorte').val() != ''&& $('#id_estatus1').val() != ''
        && $('#id_estatus2').val() != '' && $('#id_condicion').val() != ''
        && $('#id_carrera').val() != ''
        && (
            ($("#id_mencion").is(":enabled") == true && $("#id_mencion").val() != '') 
            || ($("#id_mencion").is(":disabled"))
        )
    ){

        validar = true;

    }else{

        validar = false;
    }

    return validar;
}

function validarRegistro(){

    var validar;

    if($("input[name=Nacionalidad]").is(":checked") == true && $('#cedula').val().length != 0
    && $('#nombre_uno').val().length != 0 && $('#nombre_dos').val().length != 0
    && $('#apellido_uno').val().length != 0 && $('#apellido_dos').val().length != 0
    && $("input[name=Sexo]").is(":checked") && $('#fecha_nac').val() != null
    && $('#id_pais').val() != '' && $('#id_provincia').val() != '' && $("input[name=EdoCivil]").is(":checked")
    && $('#direccion').val().length != 0 && $('#id_estado').val() != '' && $('#id_municipio').val() != ''
    && $('#id_parroquia').val() != '' && $('#id_cohorte').val() != '' && $('#id_estatus1').val() != ''
    && $('#id_estatus2').val() != '' && $('#id_condicion').val() != '' && $('#id_carrera').val() != ''
    && (($("#id_mencion").is(":enabled") == true && $("#id_mencion").val() != '') || ($("#id_mencion").is(":disabled")))){

        validar = true;

    }else{

        validar = false;
    }

    return validar;
}

function selectMencion(select){
    
    var id_select = $(select).parent().val();
    // alert(nombre_select);
    if(id_select != ""){

        $.ajax({
            async:true,
            cache:false,
            dataType:"html",
            type: 'POST',
            url: "../Controlador/Funciones.php",
            data: {
                id_select : id_select,
                cargar_select_dinamico : "cargar_select_dinamico"
            },
            success:  function(respuesta){
                // console.log(respuesta);
                if(respuesta != 0){
                    $("#id_mencion").prop("disabled", false);
                    $("#id_mencion").html(respuesta);
                }else{
                    $("#id_mencion").prop("disabled", true);
                    $("#id_mencion").html("<option value='' selected>NO HAY MENCION.</option>");
                }
            },
            beforeSend:function(){},
            error:function(objXMLHttpRequest){}
        });
    }else{

        $("#id_mencion").prop("disabled", true);
        $("#id_mencion").html("<option value='' selected>NO HAY MENCION.</option>");
    }
}

function Edicion(){

    if(id_persona != null && id_estudiante != null){

        $.ajax({
            async:true,
            cache:false,
            dataType:"html",
            type:  'POST',
            url:   '../Controlador/CtrlEstudiante.php',
            data:  {
                editar : "editar",
                id_estudiante : id_estudiante
            },
            success:function (response){
                //alert(response);
                if(response.debug === undefined){

                    if(response.error === undefined){

                        estudiante = $.parseJSON(response);
                        var nombres = estudiante.nombres.toString().split(" ");
                        var apellidos = estudiante.apellidos.toString().split(" ");

                        $.ajax({
                            async:true,
                            cache:false,
                            dataType:"html",
                            type: 'POST',
                            url: "../Controlador/Funciones.php",
                            data: {
                                id_select : estudiante.id_pais.toString(),
                                nombre_select : "pais",
                                cargar_select_dinamico : "cargar_select_dinamico"
                            },
                            success:  function(respuesta){
                                //alert(respuesta);
                                $("#id_provincia").html(respuesta);
                                $('#id_provincia').val(estudiante.id_provincia.toString());
                            }
                        });

                        $.ajax({
                            async:true,
                            cache:false,
                            dataType:"html",
                            type: 'POST',
                            url: "../Controlador/Funciones.php",
                            data: {
                                id_select : estudiante.id_estado.toString(),
                                nombre_select : "estado",
                                cargar_select_dinamico : "cargar_select_dinamico"
                            },
                            success:  function(respuesta){
                                //alert(respuesta);
                                $("#id_municipio").html(respuesta);
                                $('#id_municipio').val(estudiante.id_municipio.toString());
                            }
                        });

                        $.ajax({
                            async:true,
                            cache:false,
                            dataType:"html",
                            type: 'POST',
                            url: "../Controlador/Funciones.php",
                            data: {
                                id_select : estudiante.id_municipio.toString(),
                                nombre_select : "municipio",
                                cargar_select_dinamico : "cargar_select_dinamico"
                            },
                            success:  function(respuesta){
                                //alert(respuesta);
                                $("#id_parroquia").html(respuesta);
                                $('#id_parroquia').val(estudiante.id_parroquia.toString());
                            }
                        });

                        if(estudiante.id_mencion != undefined){

                            $.ajax({
                                async:true,
                                cache:false,
                                dataType:"html",
                                type: 'POST',
                                url: "../Controlador/Funciones.php",
                                data: {
                                    id_select : estudiante.id_carrera.toString(),
                                    nombre_select : "carrera",
                                    cargar_select_dinamico : "cargar_select_dinamico"
                                },
                                success:  function(respuesta){
                                    //alert(respuesta);
                                    $("#id_mencion").html(respuesta);
                                    $('#id_mencion').val(estudiante.id_mencion.toString());
                                }
                            });
                        }else{

                            $('#id_mencion').prop("disabled", true);
                        }

                        $("input[name=Nacionalidad][value="+estudiante.nacionalidad.toString()+"]").prop("checked", true);
                        $('#cedula').val(estudiante.cedula.toString());
                        $('#nombre_uno').val(nombres[0]);
                        $('#nombre_dos').val(nombres[1]);
                        $('#apellido_uno').val(apellidos[0]);
                        $('#apellido_dos').val(apellidos[1]);
                        $("input[name=Sexo][value="+estudiante.sexo.toString()+"]").prop("checked", true);
                        $('#fecha_nac').val(estudiante.fecha_nac.toString());
                        $('#id_pais').val(estudiante.id_pais.toString());
                        $("input[name=EdoCivil][value="+estudiante.edo_civil.toString()+"]").prop("checked", true);
                        $('#direccion').val(estudiante.direccion.toString());
                        $('#id_estado').val(estudiante.id_estado.toString());
                        $('#fecha-ingreso').text(estudiante.fecha_ingreso.toString())
                        $('#id_cohorte').val(estudiante.id_cohorte.toString());
                        $('#id_estatus1').val(estudiante.id_estatus1.toString());
                        $('#id_estatus2').val(estudiante.id_estatus2.toString());
                        $('#id_condicion').val(estudiante.id_condicion.toString());
                        $('#id_carrera').val(estudiante.id_carrera.toString())
                    }else{

                        alertify.error(response);
                    }
                }else{
                    alertify.error("Debug Activo");
                    console.log(response);
                }

                $('#cargando').hide();
            },
            error:function (response) {
                console.log(response);
                alertify.error("Error Interno");
            }
        });
    }
}

function verifCamposCambiados(){

    var selectoresCampos = ["input[name=Nacionalidad]:checked", "#cedula", "#nombre_uno", "#nombre_dos"
    , "#apellido_uno", "#apellido_dos", "input[name=Sexo]:checked", "#fecha_nac", "#id_pais"
    , "#id_provincia", "input[name=EdoCivil]:checked", "#direccion", "#id_estado", "#id_municipio"
    , "#id_parroquia", "#id_cohorte", "#id_estatus1", "#id_estatus2", "#id_condicion", "#id_carrera"
    , "#id_mencion"];
    var nombres;
    var apellidos;
    var cambia = false;

    for(var i = 0; i < selectoresCampos.length; i ++){

        if(i < 2){

            if($(selectoresCampos[i]).val() != estudiante[i]){

                cambia = true;
                break;
            }
        }else if(i == 2){

            nombres = estudiante[i].split(" ");

            if($(selectoresCampos[i]).val() != nombres[0]){

                cambia = true;
                break;
            }
        }else if(i == 3){

            if($(selectoresCampos[i]).val() != nombres[1]){

                cambia = true;
                break;
            }
        }else if(i == 4){

            apellidos = estudiante[3].split(" ");

            if($(selectoresCampos[i]).val() != apellidos[0]){

                cambia = true;
                break;
            }
        }else if(i == 5){

            if($(selectoresCampos[i]).val() != apellidos[1]){

                cambia = true;
                break;
            }
        }else if(i > 5 && i != 20){

            if($(selectoresCampos[i]).val() != estudiante[i-2]){

                cambia = true;
                break;
            }
        }else{

            if($("#id_mencion").is(":disabled") != true){

                if($(selectoresCampos[i]).val() != estudiante[i]){

                    cambia = true;
                    break;
                }
            }
        }
    }

    return cambia;
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

function cerrarVentana(){

    window.close();
}
