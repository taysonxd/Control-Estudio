@extends('layouts.pdfFrame')

@section('content')
<br>
<div class="row mg-top justify-content-center">
    <FONT SIZE=4><center><b><u>Certificación de inscripción</u></b></center></FONT>
</div>
<div class="row mg-top justify-content-center">
    <p>
        <FONT FACE="Helvetica" SIZE=3>
            En el presente documento se certifica la inscripción del(la) ciudadano(a) y se reflejan las unidades curriculares que cursara en el proximo periodo:
        </FONT>
    </p>
</div>
<div class="row justify-content-center">
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
</div>   
<div class="row mg-top justify-content-center">
    <div class="col-md-12">
        <div>
            <FONT SIZE=4><center><b><u>Asignaturas</u></b></center></FONT>
        </div>
    </div>
</div>
<div class="row mg-top justify-content-center">    
<table cellpadding="0" align="center" border = "0" width="100%">
<thead>
    <tr>
        <th width='20%'' style='text-align: center;'>Código</th>
        <th width='55%' style='text-align: left;'>Unidad Curricular</th>
        <th width='5%' style='text-align: center;'>HPS</th>
        <th width='5%' style='text-align: center;'>HT</th>
        <th width='5%' style='text-align: center;'>N</th>
        <th width='5%' style='text-align: center;'>UC</th>
    </tr>
    <tr>
        <th colspan="6"><hr></th>
    </tr>
</thead>
@foreach($asignaturas as $asignatura)
<tr class=\"asignaturas anio-{{ $asignatura->trayecto['trayecto'] }}" id="{{ $asignatura['id'] }}">
    <td style='text-align: center;' class=".$subrayado.">
        <font FACE=\"Helvetica\" SIZE=2>
            {{ $estudiante->carrera->codcarrera."-".$asignatura['codigo'] }}
        </font>
    </td>
    <td class=".$subrayado.">
        <font FACE=\"Helvetica\" SIZE=3>
            {{ $asignatura['desc_asignatura']=='default'? $asignatura->materia['materia']:$asignatura['desc_asignatura'] }}
        </font>
    </td>
    <td style='text-align: center;' class=\"horas_semana ".$subrayado."\" id=\"hs\">
        <font FACE=\"Helvetica\" SIZE=3 id=\"horas_semana\">
            {{ $asignatura['hps'] }}
        </font>
    </td>
    <td style='text-align: center;' class=".$subrayado.">
        <font FACE=\"Helvetica\" SIZE=3 id=\"horas_totales\">
            {{ $asignatura['ht'] }}
        </font>
    </td>
    <td style='text-align: center;' class=\"".$subrayado."\" id=\"n\">
        <font FACE=\"Helvetica\" SIZE=3 id=\"N\">
            {{ $asignatura['N'] }}
        </font>
    </td>
    <td style='text-align: center;' class=\"".$subrayado."\" id=\"uc\">
        <font FACE=\"Helvetica\" SIZE=3 id=\"uc\">
            {{ $asignatura['UC'] }}
        </font>
    </td>
</tr>
@endforeach
<tr>
    <th colspan="6"><hr></th>
</tr>
<tr class="total-anio-'.$asignatura->trayecto['trayecto'].'">
    <td class="'.$subrayado.'">
    </td>
    <td style="text-align: right;" class="'.$subrayado.'">
        <FONT FACE="Helvetica" SIZE=3>
            <b>Total Horas por Semana</b>
        </FONT>
    </td>
    <td style="text-align: center;" class="'.$subrayado.'"> 
        {{ $totales["total_hps"] }}
    </td>
    <td style="text-align: center;" class="'.$subrayado.'"> 
        {{ $totales["total_ht"] }}
    </td>
    <td style="text-align: center;" class="'.$subrayado.'"> 
        
    </td>
    <td style="text-align: center;" class="'.$subrayado.'">
        {{ $totales["total_uc"] }}
    </td>
</tr>
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
        Certificación que se expide a solicitud de parte interesada en Independencia el {{ date('d') }} de {{ date('m') }} de {{ date('Y') }}.
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
