@extends('layouts.pdfFrame')

@section('content')
<div class="row mg-top justify-content-center">
    <FONT SIZE=4><center><b><u>Pensum de estudio</u></b></center></FONT>
</div>
<div class="row mg-top justify-content-center">
    <p>
        <FONT FACE="Helvetica" SIZE=3>
            En el presente documento se refleja el pensum de estudio completo que comprende la carrera {{ $estudiante->carrera->carrera }}:
        </FONT>
    </p>
    <!-- <div class="row justify-content-center">
        <div clas="col-md-6">
            <div class="col-md-12">
                Apellidos y Nombres: <b>{{ $estudiante->persona->apellido_uno.' '.$estudiante->persona->apellido_dos.' '.$estudiante->persona->nombre_uno.' '.$estudiante->persona->nombre_dos }}</b>
            </div>                
            <div class="col-md-12">
                C.I. Nº:/Pasaporte: <b>{{ $estudiante->persona->cedula }}</b>
            </div>                
            <div class="col-md-12">
                Inscrito en: <b>{{ $estudiante->carrera->carrera }}</b>
            </div>
        </div>
    </div> -->   
</div>
<div class="row mg-top justify-content-center">
    <div class="col-md-12">
        <div>
            <FONT SIZE=4><center><b><u>Pensum de estudio</u></b></center></FONT>
        </div>
    </div>
</div>
<div class="row mg-top justify-content-center">
    <table cellpadding="0" border = "0">
        @foreach($trayectosAcademicos as $idTa => $ta)
        <thead>
            <tr>
                <td colspan="7" class="alert-info">
                    <FONT SIZE=4>
                        <center>
                            <b>
                                Trayecto {{ $ta->trayecto->trayecto }}
                            </b>
                        </center>
                    </FONT>
                </td>
            </tr>
            <tr style="border-bottom: solid 1.5px #BABDB6;">
                <th width='17%'' style='text-align: center;'>Código</th>
                <th width='55%' style='text-align: left;'>Unidad Curricular</th>
                <th width='5%' style='text-align: center;'>HPS</th>
                <th width='5%' style='text-align: center;'>HT</th>
                <th width='5%' style='text-align: center;'>N</th>
                <th width='5%' style='text-align: center;'>UC</th>
                <th width='5%' style='text-align: center;'>Prelación</th>
            </tr>
        </thead>
        @foreach($ta->asignaturas as $idAsig => $asignatura)    
        <tr class=\"asignaturas anio-{{ $ta->trayecto->trayecto }}" id="{{ $asignatura->id }}">
            <td style='text-align: center;' class=".$subrayado.">
                <font FACE=\"Helvetica\" SIZE=2>
                    {{ $ta->carrera->codcarrera."-".$asignatura->codigo }}
                </font>
            </td>
            <td class=".$subrayado.">
                <font FACE=\"Helvetica\" SIZE=3>
                    {{ $asignatura->desc_asignatura == 'default'? $asignatura->materia->materia : $asignatura->desc_asignatura }}
                </font>
            </td>
            <td style='text-align: center;' class=\"horas_semana ".$subrayado."\" id=\"hs\">
                <font FACE=\"Helvetica\" SIZE=3 id=\"horas_semana\">
                    {{ $asignatura->hps }}
                </font>
            </td>
            <td style='text-align: center;' class=".$subrayado.">
                <font FACE=\"Helvetica\" SIZE=3 id=\"horas_totales\">
                    {{ $asignatura->ht }}
                </font>
            </td>
            <td style='text-align: center;' class=\"".$subrayado."\" id=\"n\">
                <font FACE=\"Helvetica\" SIZE=3 id=\"N\">
                    {{ $asignatura->N }}
                </font>
            </td>
            <td style='text-align: center;' class=\"".$subrayado."\" id=\"uc\">
                <font FACE=\"Helvetica\" SIZE=3 id=\"uc\">
                    {{ $asignatura->UC }}
                </font>
            </td>
            <td style='text-align: center;' class=\"".$subrayado."\" id=\"uc\">
                <font FACE=\"Helvetica\" SIZE=2>
                    {{ $asignatura->prelaciones }}
                </font>
            </td>
        </tr>
        @if(!$ta->asignaturas->has($idAsig+1))
        <tr style="border-top: solid 1.5px #BABDB6;" class="total-anio-{{$ta->trayecto->trayecto}}">
            <td class="subrayado">
            </td>
            <td style="text-align: right;" class="subrayado">
                <FONT FACE="Helvetica" SIZE=3>
                    <b>Total Horas por Semana</b>
                </FONT>
            </td>
            <td style="text-align: center;" class="subrayado"> 
                {{ $totales[$idTa]["total_hps"] }}
            </td>
            <td style="text-align: center;" class="subrayado"> 
                {{ $totales[$idTa]["total_ht"] }}
            </td>
            <td style="text-align: center;" class="subrayado"> 
                
            </td>
            <td style="text-align: center;" class="subrayado">
                {{ $totales[$idTa]["total_uc"] }}
            </td>
            <td style="text-align: center;" class="subrayado">
                
            </td>
        </tr>
        @endif
        @endforeach
    @endforeach
    </table>
</div>
<div class="row" style="font-size: 13px;">
    <div class="col-md-3" style="border: solid 1px;">
        <div style="border-bottom: 0px; border-right: 0px;"><strong>HPS:</strong> Horas por Semana</div>
        <div style="border-bottom: 0px; border-left: 0px;"><strong>UC:</strong> Unidades de Crédito</div>
        <div style="border-top: 0px; border-right: 0px;"><strong>HT:</strong> Horas totales por Periodo Academico</div>
    </div>
</div>
<div class="row mg-top justify-content-center">
    <div>
        <div colspan="2" style="text-align: center; padding: 7px;">
        Documento que se expide a solicitud de parte interesada en Independencia el {{ date('d') }} de {{ date('m') }} de {{ date('Y') }}.
        <br>
        <br>
        <br>
        <br>
        Rosanna Del Valle Silva Fernández<br>
        V-10.370.031<br>
        Secretaria General<br>
        Resolucion Nº 045 del MPPEUCT<br>
        G.O. 41.134 del 20/04/2017<br>
        <br>
        </div>
    </div>
</div>
@endsection
