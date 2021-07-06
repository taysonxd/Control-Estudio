@include('layouts.menu')
<main class="py-4">
  <main role="main" class="container">
    <manage-trayecto v-bind:carreras="{{ $carreras }}">
    </manage-trayecto>
  </main><!-- /.container -->
</main>
@include('layouts.libraries')
