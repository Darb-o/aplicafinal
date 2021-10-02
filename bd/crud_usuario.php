<?php
session_start();
include("./conexion.php");
$ob = new Conexion();
$link = $ob->Conectar();
$nombre_r=(isset($_REQUEST['nombre_r']))?$_REQUEST['nombre_r']:'';
$correo_r=(isset($_REQUEST['correo_r']))?$_REQUEST['correo_r']:'';
$tel_r=(isset($_REQUEST['tel_r']))?$_REQUEST['tel_r']:'';
$password_r=(isset($_REQUEST['password_r']))?$_REQUEST['password_r']:'';
$fechanac_r=(isset($_REQUEST['fechanac_r']))?$_REQUEST['fechanac_r']:'';
$direccion_r=(isset($_REQUEST['direccion_r']))?$_REQUEST['direccion_r']:'';
$opcion=(isset($_REQUEST['opcion']))?$_REQUEST['opcion']:'';
$id_rol=(isset($_REQUEST['id_rol']))?$_REQUEST['id_rol']:'';

switch($opcion){
    case 1: //insertar
        $sql = "select * from usuario where correo = '$correo_r'";
        $res = $link -> prepare($sql);
        $res->execute();
        if($res->rowCount()>=1){
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $password_r = password_hash($password_r,PASSWORD_DEFAULT);
            $sql = "insert into usuario values('$correo_r','$password_r','$nombre_r','$tel_r','$fechanac_r','$direccion_r',$id_rol)"; 
            $res = $link->prepare($sql); //prepara la consulta
            $res->execute(); //ejecuta la consulta
            //mostrar los datos
            $data = null;
        }  
        break;
    case 2: //actualizar
        $sql = "update usuario set nombre='$nombre_r',telefono='$tel_r',fecha_nac='$fechanac_r', direccion='$direccion_r' where correo = '$correo_r'";
        $res = $link->prepare($sql);
        $res->execute();
        $data = $res->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3: //consultar datos usuario actual en sesion
        $user = $_SESSION['user'];
        $sql = "select * from usuario where correo = '$user'";
        $res = $link -> prepare($sql);
        $res->execute();
        $data = $res->fetchAll(PDO::FETCH_ASSOC);                  
        break;
    case 4: //consultar usuario con correo
        $sql = "select * from usuario where correo = '$correo_r'";
        $res = $link->prepare($sql);
        $res->execute();
        if($res->rowCount()>=1){
            $data = $res->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $data = null;
        }
        break;
    case 5: //actualizar contraseña actualizar       
        $password_r = password_hash($password_r,PASSWORD_DEFAULT);
        $sql = "update usuario set clave='$password_r' where correo = '$correo_r'";
        $res = $link->prepare($sql);
        $res->execute();
        $_SESSION['datosusuario'][0]['clave'] = $password_r;
        break;

}

//se envia el array en formato JSON a AJAX
print json_encode($data);

?>