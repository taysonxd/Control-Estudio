@include('layouts.menu')
<style type="text/css">
    td.details-control {
        background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
        cursor: pointer;
    }
    tr.shown td.details-control {
        background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
    }
    table {
        border-collapse: collapse;
    }
    table td.subrayado{
        border-bottom: 1px solid #000;
    }
</style>
<main class="py-4">
  <main role="main" class="container">
    <certificado-inscripcion>
    </certificado-inscripcion>
  </main><!-- /.container -->
</main>
@include('layouts.libraries')
