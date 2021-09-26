<?php
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
            $sql = "insert into usuario values('$correo_r','$password_r','$nombre_r','$tel_r','$fechanac_r','$direccion_r',$id_rol)"; 
            $res = $link->prepare($sql); //prepara la consulta
            $res->execute(); //ejecuta la consulta
            //mostrar los datos
            $data = null;
        }  
        break;
    case 2: //actualizar
        /*$sql = "update alumnos set nomb_a ='$nom',apel_a='$ape',email_a='$email' where id_a = $cod";
        $res = $link->prepare($sql);
        $res->execute();
        //mostrar los datos
        $data = mostrar($link);
        break;*/
    case 3: //consultar
        /*$data = mostrar($link);
        break; */
}

//se envia el array en formato JSON a AJAX
print json_encode($data,JSON_UNESCAPED_UNICODE);

function mostrar($link){
    //mostrar los datos
    $sql = "select * from usuario";
    $res = $link->prepare($sql);
    $res->execute();
    //guarda la tabla en un array
    $data = $res->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

?>