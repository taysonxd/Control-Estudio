var URL = window.location.protocol + "//" + window.location.host;
var pathdirectory =  location.pathname.split('/');

for (i = 0; i < (pathdirectory.length-1); i++) {
    if(pathdirectory[i] != ''){
        URL = URL + '/' + pathdirectory[i];
    }
}

$(document).on(".horas_semana",{
    mouseenter: function (){
        $(this).parent().css('background-color','#edeef5'); 
    },
    mouseleave: function (){
        $(this).parent().css('background-color','white');
    }
});

$(document).ready(function(){

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('input[name="_token"]').val()
        }
    });   
}); // - FIN DEL DOCUMENT -

function nuevoPensum(){

    var datos = {
        anio : $("#anio_pensum").val(),
        carrera : $("#id_carrera").val()
    };

    alertify.alert("Confirmación", "Va a crear un nuevo pensum para el año: "+datos.anio+"\n\n¿Confirma el registro?", function(){

        $.ajax({
            async:true,
            url: URL+'/nuevo',
            cache:false,
            dataType:"json",
            type:  'POST',
            data:  datos,
            beforeSend:function () {
            },
            success:function (response) {
                //console.log(response);
                if(response.response == 'OK'){

                    alertify.success("Pensum creado");
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
    }).set('label', 'Cerrar');
}

function incluirMateria(){

    var denom_asignatura = $("#button-addon2").attr("aria-pressed") != 'true'? $("#desc_asignatura").val():'default';

    var prelaciones = [];

    var datos = {
        anio : $("#anio").val(),
        trayecto_academico : $("#id_trayecto").val(),
        materia : $("#id_materia").val(),
        cod_asignatura : $("#cod_asignatura").val(),
        desc_asignatura : denom_asignatura,
        caracter_uc : $("#caracter_uc").val(),
        hps : $("#hps").val(),
        ht : $("#ht").val(),
        uc : $("#uc").val(),
        prelaciones : $("#prelaciones").val()
    };

    var URLa = window.location.protocol + "//" + window.location.host;
    var paths = pathdirectory.length-2;
    
    for (i = 0; i < (paths-1); i++) {
        if(pathdirectory[i] != ''){
            URLa = URLa + '/' + pathdirectory[i];
        }
    }

    $.ajax({
        async:true,
        url: URLa+'/incluir',
        cache:false,
        dataType:"json",
        type:  'POST',
        data:  datos,
        beforeSend:function () {
        },
        success:function (response) {
            //console.log(response);
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
}

function cargarMaterias(){

    var anio = $("#id_anio").val();
    var id_carrera = $("#id_carrera").val();

    $.ajax({
        async:true, 
        cache:false,
        dataType:"html", 
        type: 'POST',   
        url: URL+'/cargarMaterias',
        data: {
            anio : anio,
            id_carrera : id_carrera
        },
        success:  function(respuesta){
            //alert(respuesta);
            $("#contenedor_materias").html(respuesta);
            
        },
        beforeSend:function(){},
        error:function(objXMLHttpRequest){}
    });
}

var destino = '';

function modificarAsignatura(td){
    //columna modificable.
    var tr = $(td).parent();
    var index_td = $(td).index();
    //primer campoalert
    var valor_anterior = $(td).find("font").text().trim();

    $(td).html('<button type="button" class="badge badge-pill badge-success" style="display:inline;">✔</button>'+'<input value="'+valor_anterior+'" type="text" style="text-align: center; width: 30px;border:1px #aaa solid;">');
    
    $(td).css("background", "#FFFFFF");
    $(td).removeAttr("onclick");
    $(td).off();
    $(td).find("input").focus();
              
    /************************************************************/
                  
    $(td).find("button").on("click", function(){

        if($(td).attr('id') == 'hs'){
            destino = 'horas_semanales';
        }else if($(td).attr('id') == 'n'){
            destino = 'caracter_uc';
        }else if($(td).attr('id') == 'uc'){
            destino = 'unidad_credito';
        }

        var valor = $(td).find("input").val().trim();
        
        if(valor == valor_anterior){
            
            $(td).html("<font FACE=\"Helvetica\" SIZE=3 id=\""+$(td).attr('id')+"\">"+valor_anterior+"</font>");

            $(td).on("click", function(){

                var celda = this;
                $(td).on("click", function () {
                    
                    modificarAsignatura(celda);
                });
            });
        }else if(valor == ''){
            
            if(valor_anterior != '0' && valor_anterior != ''){
                
                $(td).html("<font FACE=\"Helvetica\" SIZE=3 id=\""+$(td).attr('id')+"\">"+valor_anterior+"</font>");
            }else{
                
                $(td).html("<font FACE=\"Helvetica\" SIZE=3 id=\""+$(td).attr('id')+"\">"+valor_anterior+"</font>");
            }
            
            $(td).on("click", function(){
                var celda = this;
                $(td).on("click", function () {
                    
                    modificarAsignatura(celda);
                });
            });
        }else if($(td).attr('id') == 'hs' && valor == "0"){
            
            if(valor_anterior != ''){
                
                $(td).html("<font FACE=\"Helvetica\" SIZE=3 id=\""+$(td).attr('id')+"\">"+valor+"</font>");
            }else{
                
                $(td).html("<font FACE=\"Helvetica\" SIZE=3 id=\""+$(td).attr('id')+"\">"+valor+"</font>");
                $(td).css("background", "#E2E4ED");
            }
            
            $(td).on("click", function(){

                var celda = this;
                $(td).on("click", function () {
                    
                    modificarAsignatura(celda);
                });
            });
        }else{
            
            $(td).html("<font FACE=\"Helvetica\" SIZE=3 id=\""+$(td).attr('id')+"\">"+valor+"</font>");
            $(td).css("background", "#FFFFFF");

            $(td).on("click", function(){

                var celda = this;
                $(td).on("click", function () {
                    
                    modificarAsignatura(celda);
                });
            });

        }

        if(destino == 'horas_semanales'){

            horasTotalesSemana(tr, valor, valor_anterior);
            horasTotales($(tr).parents("table"),$(tr).attr("class").split(' '), valor, valor_anterior);
        }else{

            horasTotales($(tr).parents("table"),$(tr).attr("class").split(' '), valor, valor_anterior);
        }

        actualizarAsignatura(tr, destino);
    });
}

function actualizarAsignatura(tr, destino){

    var datos;

    if(destino == 'horas_semanales'){

        datos = {
            carrera : $(tr).attr('id'),
            hps : $(tr).find("td").eq('2').find('font').text().trim(),
            ht : $(tr).find("td").eq('3').find('font').text().trim()
        };
    }else if(destino == 'caracter_uc'){
        
        datos = {
            carrera : $(tr).attr('id'),
            N : $(tr).find("td").eq('4').find('font').text().trim()
        };
    }else if(destino == 'unidad_credito'){
        
        datos = {
            carrera : $(tr).attr('id'),
            UC : $(tr).find("td").eq('5').find('font').text().trim()
        };
    }

    $.ajax({
        async:true,
        url: URL+'/actualizar',
        cache:false,
        dataType:"json",
        type:  'PUT',
        data:  datos,
        beforeSend:function () {
        },
        success:function (response) {
            //console.log(response);
            if(response.response == 'OK'){

                alertify.success("Asignatura actualizada");
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

function horasTotalesSemana(tr, horasxSemana, valorAnterior){
    
    if(((valorAnterior == '') || (valorAnterior == '0')) && horasxSemana == valorAnterior){
        
    }else{

        if(horasxSemana == ''){
            
            //$("td #horas_totales", tr).text("-");
        }else if(horasxSemana == '0'){
            
            $("td #horas_totales", tr).text("-");
        }else{
            
            htotales = horasxSemana*36;
            $("td #horas_totales", tr).text(htotales);
        }
    }
}

function horasTotales(tabla, clase_tr, horasxSemana, valorAnterior){
    
    var totalHoras = 0;
    var totalSemanas = 0;
    var totalUc = 0;
    var td_verif = 0;
    
    if(destino == 'horas_semanales'){
        td_verif = 2;
    }else{
        td_verif = 5;
    }

    if(((valorAnterior == '') || (valorAnterior == '0')) && horasxSemana == valorAnterior){
        
    }else{

        if(horasxSemana == ''){
            
            //$("td #horas_totales", tr).text("-");
        }else if(horasxSemana == '0'){

            $(tabla).find("."+clase_tr[1]).each(function(){
                
                if(td_verif == 2){
                    //Calculo desde el TD de horas semanales
                    if(!isNaN($(this).find("font").eq('2').text())){

                        totalHoras += parseInt($(this).find("font").eq('2').text());
                        totalSemanas += parseInt($(this).find("font").eq('3').text());
                    }
                }else{
                    //Calculo desde el TD de unidades de credito
                    if(!isNaN($(this).find("font").eq('5').text())){

                        totalUc += parseInt($(this).find("font").eq('5').text());
                    }
                }
            });

            if(destino == 'horas_semanales'){
                $(".total-"+clase_tr[1]).find("td").eq('2').text(totalHoras);
                $(".total-"+clase_tr[1]).find("td").eq('3').text(totalSemanas);
            }else{
                $(".total-"+clase_tr[1]).find("td").eq('5').text(totalUc);
            }
        }else{
            
            $(tabla).find("."+clase_tr[1]).each(function(){
                
                if(td_verif == 2){
                    //Calculo desde el TD de horas semanales
                    if(!isNaN($(this).find("font").eq('2').text())){

                        totalHoras += parseInt($(this).find("font").eq('2').text());
                        !isNaN($(this).find("font").eq('3').text())?
                        totalSemanas += parseInt($(this).find("font").eq('3').text())
                        : null;
                    }
                }else{
                    //Calculo desde el TD de unidades de credito
                    if(!isNaN($(this).find("font").eq('5').text())){

                        totalUc += parseInt($(this).find("font").eq('5').text());
                    }
                }
            });

            if(destino == 'horas_semanales'){
                $(".total-"+clase_tr[1]).find("td").eq('2').text(totalHoras);
                $(".total-"+clase_tr[1]).find("td").eq('3').text(totalSemanas);
            }else{
                $(".total-"+clase_tr[1]).find("td").eq('5').text(totalUc);
            }
        }
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

function cerrarVentana(){

    window.close();
}
