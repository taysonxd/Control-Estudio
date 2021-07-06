@extends('layouts.app')

@section('content')
<link rel="stylesheet" type="text/css" href="{{ asset('js/DataTables/DataTables-1.10.20/css/dataTables.bootstrap4.min.css') }} ">
<link rel="stylesheet" type="text/css" href="{{ asset('js/DataTables/Responsive-2.2.3/css/responsive.dataTables.min.css') }}  ">
<style type="text/css">
    td.details-control {
        background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
        cursor: pointer;
    }
    tr.shown td.details-control {
        background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
    }
</style>
<div class="container">
    <div class="row-fluid justify-content-center">
        <div class="col-md-14">
            <div class="card">
                <div class="card-header">
                    Documentos publicados
                </div>
                <div class="card-body">
                    <table id="tabla-documentos" class="table table-striped table-bordered display dt-responsive no-wrap">
                        <thead>
                            <th></th>
                            <th>Tipo</th>
                            <th>Codigo</th>
                            <th>Nombre de documento</th>
                            <th>Fecha de publicación</th>
                        </thead>
                    </table>
                    <a class="btn btn-primary" href="{{ route('nuevo-doc') }}" target="_BLANK">Nuevo</a>
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" charset="utf8" src="{{ asset('js/DataTables/DataTables-1.10.20/js/jquery.dataTables.min.js') }} "></script>
<script type="text/javascript" charset="utf8" src="{{ asset('js/DataTables/DataTables-1.10.20/js/dataTables.bootstrap4.min.js') }}"></script>
<script type="text/javascript" charset="utf8" src="{{ asset('js/DataTables/Responsive-2.2.3/js/dataTables.responsive.min.js') }}"></script>
<script type="text/javascript">

    $.ajaxSetup({
        headers:{
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var table = $("#tabla-documentos").DataTable({
        responsive: true,
        ajax : {
            type : "POST",
            url : "{{ route('dataTablesDocumentos') }}",
            dataSrc : ""
        },
        language : {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                    "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
        },
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            {"data": "tipo"},
            {"data": "codigo"},
            {"data": "documento"},
            {"data": "fecha_publicacion"}
        ],
        order: [
            [1, 'desc']
        ],
    });

     // Add event listener for opening and closing details
    $('#tabla-documentos tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

    /* Formatting function for row details - modify as you need */
function format(d){
    
    // `d` is the original data object for the row
    return '<div>'+
        "<embed src='pdfs/"+d.file+"' type='application/pdf' width='100%' height='600px'/>"+
        '<div>'+
            '<span><strong>Accion:</strong></span>'+
            "&nbsp;&nbsp;&nbsp;<span><button class='btn btn-primary btn-sm'>Actualizar</button></span>"+
        '</div>'+
    '</div>';
}

    function abrir(persona, estudiante, id_carrera){

        var url = "{{ url('estudiante/actualizarInscripcion') }}";
        //console.log(url);
        open(url+'/'+persona+'/'+id_carrera+'', '_blank', 'top=200,left=550,width=1000,height=750'); 
    } 
</script>
@endsection
