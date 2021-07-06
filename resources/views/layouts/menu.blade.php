@include('layouts.header')
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
        <ul class="navbar-nav">
        @guest
            <li class="nav-item">
                <a class="nav-link active" href="{{ route('preinscripcion') }}">Preinscripción<span class="sr-only"></span></a>
            </li>
        @else
            <li class="nav-item">
                <a class="nav-link" href="{{ route('preinscritos') }}">Estudiantes preinscritos</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Maestros</a>
                <div class="dropdown-menu" aria-labelledby="dropdown08">
                    <a class="dropdown-item" href="{{ route('materias') }}">Materia</a>
                    <a class="dropdown-item" href="{{ route('lista-mencion') }}">Mención</a>
                    <a class="dropdown-item" href="{{ route('trayectos') }}">Trayecto academico</a>
                    <a class="dropdown-item" href="{{ route('lista-carrera') }}">Carrera</a>
                    <a class="dropdown-item" href="{{ route('usuarios') }}">Usuarios</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Estudiante</a>
                <div class="dropdown-menu" aria-labelledby="dropdown08">
                  <a class="dropdown-item" href="{{ route('gestion-estudiantes') }}">Gestión</a>
                  <a class="dropdown-item" href="{{ route('certificado-inscripcion') }}">Certificado de inscripción</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Oferta Academica</a>
                <div class="dropdown-menu" aria-labelledby="dropdown08">
                   <a class="dropdown-item" href="{{ route('modulo-pensum') }}">Pensum</a>
                   <a class="dropdown-item" href="{{ route('lista-persecuencia') }}">Persecuencia</a>
                   <a class="dropdown-item" href="{{ route('horarios') }}">Horarios</a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Configuración</a>
                <div class="dropdown-menu" aria-labelledby="dropdown08">
                   <a class="dropdown-item" href="{{ route('modulo-instalaciones') }}">Instalaciones</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="{{ route('modulo-profesores') }}">Profesores</a>
            </li>



        @endguest
        </ul>
    </div>

    <!-- Right Side Of Navbar -->
    <ul class="navbar-nav ml-auto">
        <!-- Authentication Links -->
        @guest
            <li class="nav-item">
                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
            </li>
        @else
            <li class="nav-item dropdown">
                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                    {{ Auth::user()->name }} <span class="caret"></span>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="{{ route('logout') }}"
                       onclick="event.preventDefault();
                                     document.getElementById('logout-form').submit();">
                        {{ __('Logout') }}
                    </a>
                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                        @csrf
                    </form>
                </div>
            </li>
        @endguest
    </ul>
</nav>
