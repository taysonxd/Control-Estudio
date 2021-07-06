@include('layouts.menu')
<main class="py-4">
  <main role="main" class="container">
    <horarios-module></horarios-module>
  </main><!-- /.container -->
</main>
<set-task></set-task>
@include('layouts.libraries')
<style>
  label.check {
    cursor: pointer
  }

  label.check input {
    position: absolute;
    top: 0;
    left: 0;
    visibility: hidden;
    pointer-events: none
  }

  label.check span {
    padding: 7px 14px;
    border: 2px solid #007bff;
    display: inline-block;
    color: #007bff;
    border-radius: 3px;
    text-transform: uppercase
  }

  label.check input:checked+span {
    border-color: #007bff;
    background-color: #007bff;
    color: #fff
  }

  .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    padding: 3px 3px 8px 3px;
  }

  .bootstrap-datetimepicker-widget a[data-action] {
      border: none;
  }

  #menu{
      margin-top: 30px;
  }

  #days-chose{
  	display: none;
  }

  #days-list{
      margin-top: 10px;
      margin-bottom: 5px;
  }

  #days-list .day-option{
      display: inline-block;
      width: 13.5%;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      padding: 2px 0px 3px 0px;
  }

  .active-day,.active-day:hover,.active-day:focus,.active-day:active{
      border: 1px solid #EC901D;
      background: #EC901D;
      color: #fff;
  }


  .error{
      float: left;
      width: 100%;
      color: #F50000;
  }


  #mynew{
      margin-top: 30px;
      width: 100%;
      float: left;
      display: none;
  }


  .td-time{
      width: 230px;
      text-align: center;
  }

  .table-bordered {
      background: #FFF;
  }

  #alert-error{
      color: #fff;
      background: #C31313;
      position: absolute;
      font-size: 18px;
      border-radius: 4px;
      text-align: center;
      padding: 5px 15px;
      bottom: 15px;
      right: 15px;
      display: none;
      z-index: 9999999;
  }

  #mynew .btn-group-xs>.btn, .btn-xs {
      padding: 0px 3px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 0px;
      margin: 5px auto;
  }

  .nopadding{
      padding: 0px;
  }


  .opacityelement{
      opacity: 0.5;
  }

  .addinfo{
      display: none;
  }

  .delinfo{
      display: none;
  }


  .label-desc{
      text-align: center;
      width: 100%;
      display: block;
      padding-top: 5px;
      padding-bottom: 5px;
      border-radius: 4px;
      color: #fff;
      font-weight: 100;
      font-size: 12px;
  }


  .label-desc a{
      color: #FFF;
      float: right;
      margin-right: 5px;
      cursor: pointer;
      border: none;
      display: none;
  }

  .label-desc:hover a{
      display: block;
  }

  .purple-label{
     background: #8452D4;
     color: #FFF;
  }

  .red-label{
     background: #D45252;
     color: #FFF;
  }

  .blue-label{
    background: #52B6D4;
    color: #FFF;
  }

  .pink-label{
    background: #D659AA;
    color: #FFF;
  }

  .green-label{
      background: #46BD28;
      color: #FFF;
  }


  .horarioheader{
      color: #FFF;
      background: #5cb85c;
  }

  .thead{
      font-size: 16px;
      background: #000;
      color: #FFF;
  }

  .td-time{
      background: #ffffff;
      color: #3392b7;
      font-size: 16px;
      vertical-align : middle!important;
  }

  .hideedittime{
      display: none;
  }

  .td-line{
      width: 111px;
      text-align: center;
      vertical-align : middle!important;
  }

  .panel{
      float: left;
      width: 100%;
  }

  .panel-body{
      float: left;
      width: 100%;
  }

  .panel-heading{
      float: left;
      width: 100%;
  }

  .panel-info>.panel-heading {
      color: #FFF;
      background-color: #31708f;
      border-color: #31708f;
  }

  .icon-clock-index{
      color: rgb(255, 255, 255);
      font-size: 7em;
      margin-top: 185px;
  }

  #modalblue{
      background: #257dc7;
  }


  .changethetime{
      display: none;
  }

  .td-time:hover .changethetime{
      display: inline-block;
  }
</style>
