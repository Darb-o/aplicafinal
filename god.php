<?php
session_start();
if(isset( $_SESSION['user'])){
  if($_SESSION['id_rol'] == 3){
    header('Location: inicio.php');
  }
}else{
  header('Location: inicio.php');
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.css"/>  
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre&display=swap" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./css/estiloadmin.css"/>
    <title>Administrador</title>
</head>
<body>
    <div class="contenedor">
        <div class="navegacion">
            <ul>
                <li>
                    <a href="">
                        <span class="icono"><ion-icon name="restaurant-outline"></ion-icon></span>
                        <span class="titulo">Restaurante</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span class="icono"><ion-icon name="home-outline"></ion-icon></span>
                        <span class="titulo">Interfaz</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span class="icono"><ion-icon name="receipt-outline"></ion-icon></span>
                        <span class="titulo">Facturas</span>
                    </a>
                </li>
                <?php 
                    if($_SESSION['id_rol'] == 1){                   
                        echo "
                        <li>
                            <a href='./CRUD_Productos.php' class='irProductos'>
                                <span class='icono'><ion-icon name='fast-food-outline'></ion-icon></ion-icon></span>
                                <span class='titulo'>Productos</span>
                            </a>
                        </li>
                        <li>
                            <a href=''>
                                <span class='icono'><ion-icon name='pricetag-outline'></ion-icon></ion-icon></span>
                                <span class='titulo'>Promociones</span>
                            </a>
                        </li>
                        
                        <li>
                            <a href=''>
                                <span class='icono'><ion-icon name='file-tray-stacked-outline'></ion-icon></ion-icon></span>
                                <span class='titulo'>Secciones productos</span>
                            </a>
                        </li>";
                    }
                ?>
                <li>
                    <a href="">
                        <span class="icono"><ion-icon name="people-outline"></ion-icon></span>
                        <span class="titulo">Clientes</span>
                    </a>
                </li>
                <li>
                    <a href="">
                        <span class="icono"><ion-icon name="settings-outline"></ion-icon></span>
                        <span class="titulo">Mi perfil</span>
                    </a>
                </li>
                <li>
                    <a href="#" class="cerrarSesion">
                        <span class="icono"><ion-icon name="log-out-outline"></ion-icon></span>
                        <span class="titulo">Cerrar sesion</span>
                    </a>
                </li>
            </ul>
        </div>

        <!-- main-->
        <div class="main">
            <div class="topbar">
                <div class="toggle">
                    <ion-icon name="menu-outline"></ion-icon>
                </div>
                <div class="usuario">
                    <span><ion-icon name="accessibility-outline"></ion-icon></span>
                    <span class="nombre">
                        <?php 
                            if($_SESSION['id_rol'] == 1){
                                echo "Bienvenido administrador ".$_SESSION['datosusuario'][0]['nombre'];
                            }else{
                                echo "Bienvenido empleado ".$_SESSION['datosusuario'][0]['nombre'];
                            }
                        ?>
                    </span>
                </div>
                <!-- usuario-->
            </div>

            <!-- cartas--> 
            <div class="cardBox" >
            
            </div>
            
            <div class="detalles">
                <!-- Lista de ordenes --> 
                <div class="ordenesrecientes">
                    <div class="cardHeader">
                        <h2>Ordenes Recientes</h2>
                        <a href="#" class="btn">Ver todos</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>Precio</td>
                                <td>Pago</td>
                                <td>Tipo</td>
                                <td>Fecha</td>
                                <td>Estado</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Recoger</td>
                                <td>2021-12-10</td>
                                <td><span class="estado entregado">entregado</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado pendiente">pendiente</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">en progreso</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado devuelto">devuelto</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado entregado">entregado</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">En progreso</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">En progreso</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">En progreso</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">En progreso</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">En progreso</span></td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>$4500</td>
                                <td>Pendiente</td>
                                <td>Domicilio</td>
                                <td>2021-12-10</td>
                                <td><span class="estado progreso">En progreso</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Clientes nuevos -->
                <div class="clientesregistrados">
                    <div class="cardHeader">
                        <h2>Clientes registrados</h2>         
                    </div>
                    <table class="tablaUsuarios">
                    </table>
                </div>
            </div>


        </div>
    </div>

    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script src="./js/funcionesadmin.js" type="text/javascript"></script>
    <script>
        //menu desplegable
        let toggle = document.querySelector('.toggle');
        let navegacion = document.querySelector('.navegacion');
        let main = document.querySelector('.main');
        toggle.onclick = function() {
            navegacion.classList.toggle('active');
            main.classList.toggle('active');
        }
        //lo del hovered para que se quede con el hover aun si el raton no esta encima
        let list = document.querySelectorAll('.navegacion li');
        function activelink(){
            list.forEach((item)=>
            item.classList.remove('hovered'));
            this.classList.add('hovered');
        }
        list.forEach((item)=>
        item.addEventListener('mouseover', activelink))
    </script>
</body>
</html>