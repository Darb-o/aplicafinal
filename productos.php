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
<!doctype html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/dt/dt-1.11.3/b-2.0.1/r-2.2.9/datatables.min.css"/> 
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
                    <a href="./god.php">
                        <span class="icono"><ion-icon name="restaurant-outline"></ion-icon></span>
                        <span class="titulo">Restaurante</span>
                    </a>
                </li>
                <li>
                    <a href="./god.php">
                        <span class="icono"><ion-icon name="home-outline"></ion-icon></span>
                        <span class="titulo">Interfaz</span>
                    </a>
                </li> 
                <li>
                    <a href='./comprarcaja.php'>
                        <span class='icono'><ion-icon name="storefront-outline"></ion-icon></ion-icon></span>
                        <span class='titulo'>Insertar compra</span>
                    </a>
                </li>
                <li>
                    <a href='./facturasestado.php'>
                        <span class='icono'><ion-icon name="reload-outline"></ion-icon></span>
                        <span class='titulo'>Cambiar estado factura</span>
                    </a>
                </li>              
                <?php 
                    if($_SESSION['id_rol'] == 1){                   
                        echo "
                        <li>
                            <a href='./facturas.php'>
                                <span class='icono'><ion-icon name='receipt-outline'></ion-icon></span>
                                <span class='titulo'>Facturas</span>
                            </a>
                        </li>
                        <li>
                            <a href='./productos.php'>
                                <span class='icono'><ion-icon name='fast-food-outline'></ion-icon></ion-icon></span>
                                <span class='titulo'>Productos</span>
                            </a>
                        </li>
                        <li>
                            <a href='./promociones.php'>
                                <span class='icono'><ion-icon name='pricetag-outline'></ion-icon></ion-icon></span>
                                <span class='titulo'>Promociones</span>
                            </a>
                        </li>
                        
                        <li>
                            <a href='./grupoproductos.php'>
                                <span class='icono'><ion-icon name='file-tray-stacked-outline'></ion-icon></ion-icon></span>
                                <span class='titulo'>Secciones productos</span>
                            </a>
                        </li>";
                    }
                ?>
                <!--<li>
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
                </li>-->
                <li>
                    <a href="./tabla.php" >
                        <span class="icono"><ion-icon name="bar-chart-outline"></ion-icon></span>
                        <span class="titulo">Graficas</span>
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
            
            <div class="listaproductos">
              <div class="cardHeader">
                <h2>Productos del restaurante</h2>
                <a href="#" class="btn" id="btnnuevo">Agregar producto</a>
              </div>
              <table id="tablaProductos" class="table table-striped table-bordered table-condense" style="width: 100%">
                <thead class="text-center">
                  <tr>
                    <td>Id</td>
                    <td>Nombre</td>
                    <td>Precio</td>
                    <td>Descripcion</td>
                    <td>Estado</td>
                    <td>Grupo</td>
                    <td>Acciones</td>
                  </tr>
                </thead>
                <tbody>
                </tbody>
              </table>
            </div>
        </div>
    </div>
  
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.11.3/b-2.0.1/r-2.2.9/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <script type="text/javascript" src="./js/scriptProductos.js"></script>
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