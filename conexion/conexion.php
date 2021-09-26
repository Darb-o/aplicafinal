<?php
class Conexion{
    public static function Conectar(){
        define('servidor','localhost');
        define('usuario','root');
        define('password','');
        define('dbname','restaurante');
        //seteo de caracteres
        $op = array(PDO::MYSQL_ATTR_INIT_COMMAND=>'SET NAMES utf8'); 
        try{
            $link = new PDO("mysql:host=".servidor.";dbname=".dbname,usuario,password,$op);
            return $link;
        }catch(Exception $e){
            die("Error al consultar la BD".$e->getMessage());
        }
    }
}
?>