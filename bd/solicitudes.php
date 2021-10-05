<?php
    include './conexion.php';
 
    $ob=new conexion();
    $link=$ob->conectar();
    //traer las variables enviadas desde el formulario
    $opcion=(isset($_POST['opcion']))?$_POST['opcion']:'';
    $id_grupo=(isset($_POST['id_grupo']))?$_POST['id_grupo']:'';
    $nombre_grupo=(isset($_POST['nombre_grupo']))?$_POST['nombre_grupo']:'';
    $descripcion_grupo=(isset($_POST['descripcion_grupo']))?$_POST['descripcion_grupo']:'';
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
    $data = null;
    

    switch($opcion){
        //case 1 a case 4 se realiza la edicion,adicion y eliminacion de filas en la tabla grupos
        case 1://insertar valores nombre de grupo y descripcion del grupo en la tabla grupo
            $sql="insert into grupo (nombre_grupo,descripcion_grupo) values ('$nombre_grupo','$descripcion_grupo')" ;
            $res=$link->prepare($sql);
            $res->execute();
            //mostrar los datos insertados
            $sql="select * from grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 2://actualizacion de datos tabla grupo
            $sql="update grupo set nombre_grupo='$nombre_grupo',descripcion_grupo='$descripcion_grupo' where id_grupo='$id_grupo'";
            $res=$link->prepare($sql);
            $res->execute();
            //mostrar los datos insertados
            $sql="select * from grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 3://elimina datos de la tabla grupo
            $sql="delete from grupo where id_grupo = $id_grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 4://consulta los datos de la tabla grupos
            $sql="select * from grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        //case 5 a case 9 se realiza la edicion,adicion y eliminacion de filas en la tabla productos
        case 5://insertar valores nombre de producto, precio, descripcion del producto, imagen del producto y grupo del producto en la tabla productos
            $sql="insert into productos (nombre_produc,precio,descripcion,img,grupo) values ('$nom_p','$precio','$desc','$img','$grupo')";
            $res=$link->prepare($sql);
            $res->execute();
            //mostrar los datos insertados
            $sql="select * from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 6://actualizacion de datos tabla productos
            $sql="update productos set nombre_produc='$nom_p',precio='$precio',descripcion='$desc',img='$img',grupo='$grupo' where id_producto='$id_p'";
            $res=$link->prepare($sql);
            $res->execute();
            //mostar los datos en la tabla
            $sql="select * from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 7://elimina datos de la tabla productos
            $sql="delete from productos where id_producto='$id_p'";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 8://consulta los datos de la tabla productos
            $sql="select * from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 9://consulta grupo de productos
            $sql="select id_grupo,nombre_grupo from grupo";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 10://Cambiar estado del producto de la tabla producto
            $sql="update productos set estado_producto='$estado' where id_producto='$id_p'";
            $res=$link->prepare($sql);
            $res->execute();
            //mostar los datos en la tabla
            $sql="select * from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        //case 11 a case 16 se realiza la edicion,adicion y eliminacion de filas en la tabla descuentos
        case 11://insertar valores id de producto, descuento, fecha de inicio, fecha final en la tabla descuentos
            $sql="insert into descuentos (id_producto,descuento,fecha_i,fecha_f) values ('$id_p','$descuento','$fecha_i','$fecha_f')";
            $res=$link->prepare($sql);
            $res->execute();
            //mostrar los datos insertados
            $sql="select * from descuentos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 12://actualizacion datos de la tabla descuentos
            $sql="update descuentos set id_producto='$id_p', descuento='$descuento',fecha_i='$fecha_i',fecha_f='$fecha_f' where id_descuento='$id_d'";
            $res=$link->prepare($sql);
            $res->execute();
            //mostar los datos en la tabla
            $sql="select * from descuentos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 13://elimina datos de la tabla descuentos
            $sql="delete from descuentos where id_descuento='$id_d'";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 14://consulta los datos de la tabla descuentos
            $sql="select * from descuentos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 15://consulta productos
            $sql="select id_producto,nombre_produc from productos";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 16://selecciona los descuentos que se aplican el dia actual
            $sql="select * from descuentos where CURDATE() between fecha_i and fecha_f";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 17://selecciona los productos por grupo
            $sql="select * from productos where grupo='$grupo' and estado_producto='1'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 18://
            $sql="select * from productos where id_producto='$id_p'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 19://consultar si existe una factura para el dia actual para el usuario
            $sql="select id_factura from pedido where correo='$usuario' and fecha_pedido=CURDATE() and estado_pedido is NULL";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 20://crear una nueva factura
            $sql="insert into pedido (correo) values ('$usuario')";
            $res=$link->prepare($sql);
            $res->execute();
            $sql="select id_factura from pedido where correo='$usuario' and fecha_pedido=CURDATE()";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 21://ingresar datos en orden_producto
            $sql="insert into orden_productos (id_producto,id_orden,unidades) values ('$id_p','$id_orden','$unidades')";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 22://ingresar datos a orden
            $sql="insert into orden (id_factura) values ('$id_factura')";
            $res=$link->prepare($sql);
            $res->execute();
            $sql="select id_orden from orden where id_factura='$id_factura'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 23://consulta el id_orden 
            $sql="select id_orden from orden where id_factura='$id_factura'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 24://
            $sql="select id_producto,unidades from orden_productos where id_orden='$id_orden'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 25://
            $sql="select productos.id_producto, productos.nombre_produc,productos.precio, orden_productos.unidades FROM productos INNER JOIN orden_productos ON orden_productos.id_producto=productos.id_producto WHERE orden_productos.id_orden='$id_orden'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 26://
            $sql="update pedido set tipo_pedido='3',valor_total='$total',estado_pedido=2 where id_factura='$id_factura'";
            $res=$link->prepare($sql);
            $res->execute();
            break;
        case 27://
            $sql="select pedido.id_factura, pedido.correo,pedido.fecha_pedido,pedido.tipo_pedido,pedido.valor_total, orden.id_orden FROM pedido INNER JOIN orden ON orden.id_factura=pedido.id_factura WHERE pedido.estado_pedido='$estadoP'";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 28://
            $sql="select valor_total FROM pedido where estado_pedido=2";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
        case 29://consultar productos para el carrito 
            session_start();
            //separa los ids por comas
            $ids = implode(',',array_column($_SESSION['carrito'], 'idproducto'));
            $sql="select * from productos where id_producto in ($ids)";
            $res=$link->prepare($sql);
            $res->execute();
            $data=$res->fetchAll(PDO::FETCH_ASSOC);
            break;
    }
    
    print json_encode($data,JSON_UNESCAPED_UNICODE);//enviado el vector en formato json a AJAX
?>