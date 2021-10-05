<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php
        session_start();
        $_SESSION['user'] = array();
        $datos = array(
            "idproducto" => 1,
            "unidades" => 1,
        ); 
        $datos2 = array(
            "idproducto" => 2,
            "unidades" => 2,
        );
        $datos3 = array(
            "idproducto" => 3,
            "unidades" => 3,
        );
        $datos4 = array(
            "idproducto" => 4,
            "unidades" => 4,
        );
        $datos5 = array(
            "idproducto" => 5,
            "unidades" => 5,
        );  
        array_push($_SESSION['user'],$datos);
        array_push($_SESSION['user'],$datos2);
        array_push($_SESSION['user'],$datos3);
        array_push($_SESSION['user'],$datos4);
        array_push($_SESSION['user'],$datos5);
        echo('<pre>');
        var_dump($_SESSION['user']);
        echo('</pre>');

        $producto = 3;
        foreach ($_SESSION['user'] as $key => $value) { 
            echo "The index is = " . $key . ", and value is = ". $value['idproducto']; 
            echo "<br>";
            if($value['idproducto'] == $producto){
                $_SESSION['user'][$key]['unidades'] = 5000;
                break;
            }          
        } 
        echo "<br>";
        echo('<pre>');
        var_dump($_SESSION['user']);
        echo('</pre>');

        echo implode(",",array_column($_SESSION['user'], 'idproducto'));
    ?>
</body>
</html>