<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/jquery-3.4.0.min.js') }}" crossorigin="anonymous"></script>
    <script>window.jQuery || document.write('<script src="{{ asset("js/jquery-3.4.0.min.js") }} }}"><\/script>')</script>
    <script src="{{ asset('js/Bootstrap/bootstrap.min.js') }} "></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/Bootstrap/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/alertify.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample08" aria-controls="navbarsExample08" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample08">
                <ul class="navbar-nav">
                @guest
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('preinscripcion') }}">Preinscripción<span class="sr-only">(current)</span></a>
                    </li>
                @else
                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('preinscritos') }}">Estudiantes preinscritos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Disabled</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Maestros</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown08">
                            <a class="dropdown-item" href="{{ route('lista-materias') }}">Materia</a>
                            <a class="dropdown-item" href="{{ route('lista-mencion') }}">Mención</a>
                            <a class="dropdown-item" href="{{ route('lista-trayecto') }}">Trayecto</a>
                            <a class="dropdown-item" href="{{ route('lista-carrera') }}">Carrera</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Estudiante</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown08">
                           <a class="dropdown-item" href="{{ route('certificado-inscripcion') }}">Certificado de inscripción</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Oferta Academica</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown08">
                           <a class="dropdown-item" href="{{ route('modulo-pensum') }}">Pensum</a>
                           <a class="dropdown-item" href="{{ route('lista-persecuencia') }}">Persecuencia</a>
                        </div>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="dropdown08" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Cohortes</a>
                        <div class="dropdown-menu" aria-labelledby="dropdown08">
                          <a class="dropdown-item" href="{{ route('lista-cohortes') }}">Cohortes</a>
                        </div>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link active" href="{{ route('lista-profesores') }}">Profesores</a>
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

        <main class="py-4">
            <main role="main" class="container">
                @yield('content')
            </main><!-- /.container -->
        </main>
    </div>
</body>
</html>
