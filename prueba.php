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

        $id = 989;
        foreach ($_SESSION['user'] as $key => $value) { 
            if($value['idproducto'] == $id){
                array_splice($_SESSION['user'],$key,1);
                break;
            }          
        }
        echo('<pre>');
        var_dump($_SESSION['user']);
        echo('</pre>');
    ?>
</body>
</html>