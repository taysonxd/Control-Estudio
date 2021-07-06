@include('layouts.menu')
<style type="text/css">
    td.details-control {
        background: url('https://datatables.net/examples/resources/details_open.png') no-repeat center center;
        cursor: pointer;
    }
    tr.shown td.details-control {
        background: url('https://datatables.net/examples/resources/details_close.png') no-repeat center center;
    }
</style>
<main class="py-4">
  <main role="main" class="container">
    <manage-estudiantes>
    </manage-estudiantes>
  </main><!-- /.container -->
</main>
@include('layouts.libraries')
