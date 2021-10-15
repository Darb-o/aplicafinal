<?php
    include './conexion.php';
    session_start();
    $ob=new conexion();
    $link=$ob->conectar();
    $opcion=(isset($_POST['opcion']))?$_POST['opcion']:'';
    //grupo
    $id_grupo=(isset($_POST['id_grupo']))?$_POST['id_grupo']:'';
    $nombre_grupo=(isset($_POST['nombre_grupo']))?$_POST['nombre_grupo']:'';
    $descripcion_grupo=(isset($_POST['descripcion_grupo']))?$_POST['descripcion_grupo']:'';
    //productos
    $id_p=(isset($_POST['id_p']))?$_POST['id_p']:'';
    $nom_p=(isset($_POST['nom_p']))?$_POST['nom_p']:'';
    $precio=(isset($_POST['precio']))?$_POST['precio']:'';
    $desc=(isset($_POST['desc']))?$_POST['desc']:'';
    $img=(isset($_POST['img']))?$_POST['img']:'';
    $estado=(isset($_POST['estado']))?$_POST['estado']:'';
    $grupo=(isset($_POST['grupo']))?$_POST['grupo']:'';
    $id_d=(isset($_POST['id_d']))?$_POST['id_d']:'';
    $descuento=(isset($_POST['descuento']))?$_POST['descuento']:'';
    $fecha_i=(isset($_POST['fecha_i']))?$_POST['fecha_i']:'';
    $fecha_f=(isset($_POST['fecha_f']))?$_POST['fecha_f']:'';
    $usuario=(isset($_POST['usuario']))?$_POST['usuario']:'';
    $id_factura=(isset($_POST['id_factura']))?$_POST['id_factura']:'';
    $unidades=(isset($_POST['unidades']))?$_POST['unidades']:'';
    $id_orden=(isset($_POST['id_orden']))?$_POST['id_orden']:'';
    $total=(isset($_POST['total']))?$_POST['total']:'';
    $estadoP=(isset($_POST['estadoP']))?$_POST['estadoP']:''; 

    //factura
    $direccion = (isset($_POST['direccion']))?$_POST['direccion']:'';
    $fechaPedido = (isset($_POST['fechaPedido']))?$_POST['fechaPedido']:'';
    $tipoPedido = (isset($_POST['tipoPedido']))?$_POST['tipoPedido']:'';
    $estadoPedido = (isset($_POST['estadoPedido']))?$_POST['estadoPedido']:'';
    $data = null;
    $datos = null;
    $valorunidad = 0;
    $subtotal = 0;

    switch($opcion){
        case 1: // Consulta la tabla grupo y llenar la tabla grupos
            $sql="select * from grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2: // Insertar un nuevo grupo de productos
            $sql = "insert into grupo values (null,'$nombre_grupo','$descripcion_grupo')";
            $res = $link->prepare($sql);
            $res->execute();
            break;
        case 3: // Editar un grupo de productos
            $sql = "update grupo set nombre_grupo = '$nombre_grupo', descripcion_grupo = '$descripcion_grupo' where id_grupo = $id_grupo";
            $res = $link->prepare($sql);
            $res->execute();
            break;
        case 4: // Borrar un grupo de productos
            $sql="delete from grupo where id_grupo = $id_grupo";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 5: // Consulta los descuentos que se aplican el dia actual
            $sql="select * from descuentos where CURDATE() between fecha_i and fecha_f";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 6: // Consulta el grupo de productos
            $sql="select id_grupo,nombre_grupo from grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 7:// Consulta los productos por grupo
            $sql="select * from productos where grupo='$grupo' and estado_producto='1'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 8: // Devuelve el valor total del carrito
            $valortotal = 0;
            foreach ($_SESSION['carrito'] as $key => $value) {
                $valortotal+=$_SESSION['carrito'][$key]['subtotal']; 
            }
            $data = $valortotal;
            break;
        case 9: // Cambia las unidades del carrito
            foreach ($_SESSION['carrito'] as $key => $value) { 
                if($value['idproducto'] == $id_p){
                    $_SESSION['carrito'][$key]['unidades'] = $unidades;
                    $_SESSION['carrito'][$key]['subtotal'] = $_SESSION['carrito'][$key]['precio']*$_SESSION['carrito'][$key]['unidades'];
                    $data =  $_SESSION['carrito'][$key]['unidades'];
                    break;
                }          
            }
            break;  
        case 10: // Elimina un producto del carrito
            foreach ($_SESSION['carrito'] as $key => $value) { 
                if($value['idproducto'] == $id_p){
                    array_splice($_SESSION['carrito'],$key,1);
                    $data = "si sirvio";
                    break;
                }          
            }
            break; 
        case 11: // Consulta los datos de la tabla productos
            $sql="select * from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break; 
        case 12: // Agrega productos al carrito
            $bandera = true;
            foreach ($_SESSION['carrito'] as $key => $value) { 
                if($value['idproducto'] == $id_p){
                    $_SESSION['carrito'][$key]['unidades'] += $unidades;
                    $_SESSION['carrito'][$key]['subtotal'] = $_SESSION['carrito'][$key]['precio']*$_SESSION['carrito'][$key]['unidades'];
                    $bandera = false;
                    break;
                }          
            }
            if($bandera){
                $unidades = (int)$unidades;
                $valorunidad = (double)$precio;
                $subtotal = $valorunidad * $unidades;
                $datos = array(
                    "idproducto" => $id_p,
                    "nombreproducto" => $nom_p,
                    "descripcion" => $desc,
                    "precio" => $precio,
                    "descuento" => $descuento,
                    "unidades" => $unidades,
                    "subtotal" => $subtotal,    
                );
                array_push($_SESSION['carrito'],$datos);
            }  
            $data = $_SESSION['carrito'];
            break;
        case 13: // Trae los datos del carrito
            $data = $_SESSION['carrito']; 
            break;
        case 14: // Inserta un producto en la base de datos 
            $numGrupoP = (isset($_POST['selectGrupo']))?$_POST['selectGrupo']:'';
            $nombreP = (isset($_POST['nombrePro']))?$_POST['nombrePro']:'';
            $precioP = (isset($_POST['precioPro']))?$_POST['precioPro']:'';
            $descripcionP = (isset($_POST['desPro']))?$_POST['desPro']:'';
            $imagenP =$_FILES['imgPro'];
            $ruta = null;
            $status = 0;
            switch($imagenP['type']){
                case "image/jpeg":
                    $ruta = "../img/".md5($imagenP['tmp_name']).".jpeg";
                    break;
                case "image/jpg":
                    $ruta = "../img/".md5($imagenP['tmp_name']).".jpg";
                    break;
                case "image/png":
                    $ruta = "../img/".md5($imagenP['tmp_name']).".png";
                    break;
            }
            if($ruta != null){
                $sql = "insert into productos values (null,'$nombreP',$precioP,'$descripcionP','$ruta',$status,$numGrupoP)";
                $res = $link->prepare($sql);
                if($res->execute()){
                    move_uploaded_file($imagenP['tmp_name'],$ruta);
                    $data = null;
                }else{
                    $data = "error al insertar la imagen"; 
                }
            }else{ 
                $data = "formato no valido";
            }
            break;
        case 15: // Consulta la imagen de un producto 
            $sql="select img,nombre_produc from productos where id_producto = $id_p";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 16: // Edita un producto
            $numGrupoP = (isset($_POST['selectGrupo']))?$_POST['selectGrupo']:'';
            $nombreP = (isset($_POST['nombrePro']))?$_POST['nombrePro']:'';
            $precioP = (isset($_POST['precioPro']))?$_POST['precioPro']:'';
            $descripcionP = (isset($_POST['desPro']))?$_POST['desPro']:'';
            $idProducto = (isset($_POST['idProducto']))?$_POST['idProducto']:'';
            $imagenP = $_FILES['imgPro'];
            //$data = "esto llego: grupo: ".$numGrupoP.", nombre: ".$nombreP.", precio: ".$precioP.", descripcion: ".$descripcionP.", id producto: ".$idProducto;
            if($_FILES['imgPro']['tmp_name']!=''){
                $ruta = null;
                $status = 0;
                switch($imagenP['type']){
                    case "image/jpeg":
                        $ruta = "../img/".md5($imagenP['tmp_name']).".jpeg";
                        break;
                    case "image/jpg":
                        $ruta = "../img/".md5($imagenP['tmp_name']).".jpg";
                        break;
                    case "image/png":
                        $ruta = "../img/".md5($imagenP['tmp_name']).".png";
                        break;
                }
                if($ruta != null){
                    $sql = "update productos set nombre_produc = '$nombreP', precio = $precioP , descripcion= '$descripcionP', img= '$ruta', grupo = $numGrupoP where id_producto = $idProducto";
                    $res = $link->prepare($sql);
                    if($res->execute()){
                        move_uploaded_file($imagenP['tmp_name'],$ruta);
                        $data = null;
                    }else{
                        $data = "error al insertar la imagen"; 
                    }
                }else{ 
                    $data = "formato no valido";
                }
            }else{
                $sql = "update productos set nombre_produc = '$nombreP', precio = $precioP , descripcion= '$descripcionP', grupo = $numGrupoP where id_producto = $idProducto";
                $res = $link->prepare($sql);
                $res->execute();
                $data = null;           
            }         
            break;
        case 17: // Cambia el estado del producto en la tabla producto
            $sql="update productos set estado_producto='$estado' where id_producto='$id_p'";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 18: // Elimina productos de la tabla producto 
            $sql="delete from productos where id_producto = $id_p";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 19: // Consulta productos de la tabla producto 
            $sql="select id_producto,nombre_produc from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 20: // Lista descuentos para la tabla descuentos
            $sql = "select d.id_descuento,p.nombre_produc,d.descuento,d.fecha_i,d.fecha_f from descuentos d join productos p on (d.id_producto = p.id_producto)";
            $res = $link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 21: // Inserta un descuento en la base de datos
            $sql="insert into descuentos values (null,'$id_p','$descuento','$fecha_i','$fecha_f')";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 22: // Edita una promocion de la tabla descuentos
            $sql = "update descuentos set descuento = $descuento, fecha_i = '$fecha_i', fecha_f = '$fecha_f' where id_descuento = $id_d";
            $res = $link->prepare($sql);
            $res->execute();
            break;
        case 23: // Elimina un dato de la tabla descuentos
            $sql="delete from descuentos where id_descuento='$id_d'";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 24: // Crear una nueva factura
            $correo = $_SESSION['datosusuario'][0]['correo'];
            if($direccion!=""){
                $sql="update usuario set direccion = '$direccion' where correo = '$correo'";
                $res=$link->prepare($sql);
                $res->execute();
                $_SESSION['datosusuario'][0]['direccion'] = $direccion;
            }
            $valortotal = 0;
            foreach ($_SESSION['carrito'] as $key => $value) {
                $valortotal+=$_SESSION['carrito'][$key]['subtotal']; 
            }         
            $sql="insert into pedido values(null,'$correo','$fechaPedido',$tipoPedido,$valortotal,$estadoPedido)";
            $res=$link->prepare($sql);
            $res->execute();
            $sql="select p1.id_factura from pedido p1 where id_factura = (select max(p2.id_factura) from pedido p2)";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            $idFactura = $data[0]['id_factura'];
            $value['idproducto'];
            foreach ($_SESSION['carrito'] as $key => $value) {
                $idProducto = $value['idproducto'];
                $unidades = $value['unidades'];
                $subtotal = $value['subtotal'];
                $sql="insert into orden values($idFactura,$idProducto,$unidades,$subtotal)";
                $res=$link->prepare($sql);
                $res->execute();                
            }
            array_splice($_SESSION['carrito'],0,sizeof($_SESSION['carrito']));
            break;
        case 25: // listar las facturas
            $sql="select * from pedido";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 26: // numero de ordenes nuevas
            $sql="select count(*) as total FROM pedido where fecha_pedido between '$fecha_i' and '$fecha_f'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 27: // numero de ventas del ultimo mes, es decir las que tienen como estado entregado
            $sql = "select count(*) as total FROM pedido where estado_pedido = 2 and fecha_pedido between '$fecha_i' and '$fecha_f'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 28: //numero de usuarios registrados en el sistema
            $sql = "select count(*) as total from usuario where id_rol = 3";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 29: //ganancias totales del ultimo mes
            $sql = "select SUM(valor_total) as total FROM pedido where estado_pedido = 2 and fecha_pedido between '$fecha_i' and '$fecha_f'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;

    }
    print json_encode($data,JSON_UNESCAPED_UNICODE);
?>