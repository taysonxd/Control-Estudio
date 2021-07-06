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
                    Menciones registradas
                </div>
                <div class="card-body">
                    <table id="tabla-menciones" class="table table-striped table-bordered display dt-responsive no-wrap">
                        <thead>
                            <tr>
                                <th>Carrera</th>
                                <th>Mención</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                    </table>
                    <button class="btn btn-primary btn-sm" onclick="abrir(null);">Nuevo</button>
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

    var table = $("#tabla-menciones").DataTable({
        responsive: true,
        ajax : {
            type : "POST",
            url : "{{ route('dataTablesMencion') }}",
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
            {"data": "carrera"},
            {"data": "mencion"},
            {
                "data": null,
                "width": "15%"
            }
        ],
        columnDefs: [
            {
                targets: -1,
                className: 'details-control',
                orderable: false,
                data: null,
                render: function(data, type, row){
                    return '<button class="btn btn-primary btn-sm" onclick="abrir('+data.id+');">Actualizar</button>'
                }
            }
        ],
        order: [
            [0, 'desc']
        ]
    });

    function abrir(id){

        if(id !== null){

            var url = "{{ url('mencion/editar') }}";
            url += '/'+id;
        }else{

            var url = "{{ route('vista-mencion') }}";
        }

        //console.log(url);
        open(url, '_blank', 'top=200,left=550,width=1000,height=280'); 
    } 
</script>
@endsection
