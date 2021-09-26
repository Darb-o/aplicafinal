<?php
    session_start();
    include('./conexion.php');
    //crear el objeto conexion
    $con = new Conexion();
    //apuntar a la clase
    $link = $con->Conectar();
    //validacion de usuario y password
    $user=(isset($_POST['user'])?$_POST['user']:'');
    $password=(isset($_POST['password'])?$_POST['password']:'');
    $sql = "select u.id_rol, u.nombre, r.nombre_rol as rol from usuario u join rol r on u.id_rol=r.id_rol
    where u.correo = '$user' and u.clave = '$password'";
    $res = $link -> prepare($sql);
    $res->execute();
    if($res->rowCount()>=1){
        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        //crear las variables de sesiones
        $_SESSION['user'] = $user;
        $_SESSION['nombre'] = $data[0]['nombre'];
        //controlar el rol de la sesiones
        $_SESSION['id_rol'] = $data[0]['id_rol'];
        //rol por el alias en la consulta
        $_SESSION['rol'] = $data[0]['rol'];
    }else{
        $_SESSION['user'] = null;
        $data = null;
    }
    print json_encode($data);
    $link = null;
?>