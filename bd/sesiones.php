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
    $nombre=(isset($_POST['nombre'])?$_POST['nombre']:'');
    $telefono=(isset($_POST['telefono'])?$_POST['telefono']:'');
    $fecha=(isset($_POST['fecha'])?$_POST['fecha']:'');
    $direccion=(isset($_POST['direccion'])?$_POST['direccion']:'');
    $opcion=(isset($_REQUEST['opcion']))?$_REQUEST['opcion']:'';

    switch($opcion){
        case 1://login
            $sql = "select  u.correo, u.nombre, u.clave, u.telefono, u.fecha_nac, u.direccion, u.id_rol from usuario u join rol r on u.id_rol=r.id_rol
            where u.correo = '$user'";
            $res = $link -> prepare($sql);
            $res->execute();
            if($res->rowCount()>=1){
                $data = $res->fetchAll(PDO::FETCH_ASSOC);
                if(password_verify($password,$data[0]['clave'])){
                    //crear las variables de sesiones
                    $_SESSION['user'] = $user;
                    $_SESSION['password'] = $password;
                    $_SESSION['datosusuario'] = $data;
                    $_SESSION['id_rol'] = $data[0]['id_rol'];
                }else{
                    $data = null;
                }      
            }else{
                $_SESSION['user'] = null;
                $data = null;
            }
            break;
        case 2: //logout
            unset($_SESSION['session']);
            unset($_SESSION['user']);
            unset($_SESSION['id_rol']);
            unset($_SESSION['datosusuario']);
            unset($_SESSION['rol']);
            session_destroy();
            break;
        case 3: //traer datos sesion
            $data = $_SESSION['datosusuario']; 
            break;
        case 4: //verificar password
            if(password_verify($password,$_SESSION['datosusuario'][0]['clave'])){      
                $data = $_SESSION['datosusuario'];
            }else{
                $data = null;
            }
            break;
        case 5: //renovar sesion
            $_SESSION['datosusuario'][0]['nombre'] = $nombre;
            $_SESSION['datosusuario'][0]['telefono'] = $telefono;
            $_SESSION['datosusuario'][0]['fecha'] = $fecha;
            $_SESSION['datosusuario'][0]['direccion'] = $direccion;
            break;


    }

    print json_encode($data);
    $link = null;
?>