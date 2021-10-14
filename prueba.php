<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <title>Document</title>
</head>
<body>

    <?php
        session_start();
        $_SESSION['user'] = array();
        $datos = array(
            "idproducto" => 400,
            "unidades" => 4,
        ); 
        $datos2 = array(
            "idproducto" => 250,
            "unidades" => 22,
        );
        $datos3 = array(
            "idproducto" => 309,
            "unidades" => 32,
        );
        $datos4 = array(
            "idproducto" => 989,
            "unidades" => 4,
        );
        $datos5 = array(
            "idproducto" => 153,
            "unidades" => 23,
        );  
        array_push($_SESSION['user'],$datos);
        array_push($_SESSION['user'],$datos2);
        array_push($_SESSION['user'],$datos3);
        array_push($_SESSION['user'],$datos4);
        array_push($_SESSION['user'],$datos5);
        echo('<pre>');
        var_dump($_SESSION['user']);
        echo('</pre>');

        echo "el tamaño del array es: ".sizeof($_SESSION['user']);
        $id = 989;
        array_splice($_SESSION['user'],0,sizeof($_SESSION['user']));
        echo('<pre>');
        var_dump($_SESSION['user']);
        echo('</pre>');
    ?>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>
     <script src="./js/prueba.js" type="text/javascript"></script>   
    </body>
</html>