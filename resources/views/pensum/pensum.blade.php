@include('layouts.menu')
<main class="py-4">
  <main role="main" class="container">
    <pensum-module>
    </pensum-module>
  </main><!-- /.container -->
</main>
<modal-add-pensum>
</modal-add-pensum>
@include('layouts.libraries')
<script type="text/javascript">

$("#anio_pensum").attr("disabled", true);
$("#button-addon2").addClass("active");
$("#button-addon2").attr("aria-pressed", true);

$('#anio_pensum').datepicker({
    format: "yyyy",
    viewMode: "years",
    minViewMode: "years"
});

$("#button-addon2").on("click", function(){

    if($(this).attr("aria-pressed") != 'true'){

        $("#anio_pensum").val(new Date().getFullYear());
        $("#anio_pensum").attr("disabled", true);
    }else{

        $("#anio_pensum").val("");
        $("#anio_pensum").attr("disabled", false);
    }
});
</script>
