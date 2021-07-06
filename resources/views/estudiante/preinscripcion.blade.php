@include('layouts.menu')
<main class="py-4">
  <main role="main" class="container">
    <preinscripcion>
    </preinscripcion>
  </main><!-- /.container -->
</main>
@include('layouts.libraries')
<script type="text/javascript">

	$("input[name=discapacidad]").on("change", function(){

	    var discapacidad = $("input[name=discapacidad]:checked").val();

	    if(discapacidad =='Si'){
	        $('#contenedor_discapacidad').show();
	        $('#contenedor_discapacidad').find("input").prop("disabled", false);
	    }else{
	        $('#contenedor_discapacidad').hide();
	        $('#contenedor_discapacidad').find("input").prop("disabled", true);
	    }
	});

	$("input[name=opsu]").on("change", function(){
	  $(".opsu").css("color", "black");
	});

	$("input[name=discapacidad]").on("change", function(){
	  $(".discapacidad").css("color", "black");
	});

	$('#contenedor_discapacidad').hide();
</script>
