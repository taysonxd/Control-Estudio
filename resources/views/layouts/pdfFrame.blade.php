<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->    
    <link href="{{ asset('css/Bootstrap/bootstrap.min.css') }}" rel="stylesheet">
    <style>
        @page{
            margin: 0;
        }
        
        body{
            padding: 4em 4em 1em 4em;
        }

        table {border-collapse: collapse; width: 620px; margin: 0 0 0 0;}

        table td.subrayado{border-top: 1px solid #000;}

        .mg-top{margin-top: 1rem;}
    </style>
</head>
<body>
    <div class="container">
        @yield('content')
    </div>
</body>
</html>
