<?php 
session_start();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="./css/estilos.css"/>
    <title>Inicio</title>
</head>
<body>
  <!-- MENU -->
    <div class="container-fluid">
     <div class="row">
       <div class="col-12">
        <nav class="navbar navbar-expand-lg navbar-light">
         <div class="container-fluid">       
          <a class="navbar-brand" id="texto" href="./inicio.php">Restaurante</a>
          <button class="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
             
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
               <span id="iconosMenu" class="material-icons">restaurant_menu</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
               <li><a class="dropdown-item" href="#">Menu</a></li>
               <li><a class="dropdown-item" href="#">Promociones</a></li>
              </ul>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span id="iconosMenu" class="material-icons">account_circle</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <?php 
                  if(isset( $_SESSION['user'])){
                    if($_SESSION['user']!=null){
                      echo "<li><button type='button' id='btnPerfil' class='btn dropdown-item' data-toggle='modal'>Mi perfil</button></li>
                      <li><button type='button' id='btnSalirSesion' class='btn dropdown-item' data-toggle='modal'>Cerrar sesion</button></li>";
                    }               
                  }else{
                    echo "<li><button type='button' id='btnInicioSesion' class='btn dropdown-item' data-toggle='modal'>Iniciar sesion</button></li>
                    <li><button type='button' id='btnRegistrarse' class='btn dropdown-item' data-toggle='modal'>Registrarse</button></li>";
                  } 
                ?>
               
              </ul>
            </li>

             <li class="nav-item">
              <button type="button" id="btnCarro" class="btn">
                <span id="iconosMenu" class="material-icons">shopping_cart</span>
              </button>
             </li>
             
             <li class="nav-item ">
              <h5 class="navbar-brand" id="texto"> 
                <?php           
                if(isset( $_SESSION['user'])){
                  if($_SESSION['user']!=null){
                    echo "Bienvenido ".$_SESSION['nombre'];
                  }               
                }          
                ?></h5>
             </li>
             
            </ul>
           </div>
         </div>
        </nav>        
      </div>
     </div>
    </div>

    <!-- MODAL INICIO SESION-->

    <div class="modal fade" id="modalInicioSesion" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
              
                <div class="modal-header">
                    <h4 id="texto" class="modal-title">Inicio Sesion</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>          
                </div>
                
                <!--FORMULARIO-->
                
                <form id="formInicioSesion">
                    <div class="modal-body px-5">

                      <div class="input-group px-4">
                        <label for="" id="txtlabel" class="col-md-12 col-form-label">Correo electronico:</label>
                        <span class="input-group-text material-icons" id="iconosModal">person</span>
                        <input type="email" id="user" class="form-control" required>
                      </div>

                      <div class="input-group mb-4 px-4">
                        <label for="" id="txtlabel" class="col-md-12 col-form-label">Contraseña:</label>
                        <span class="input-group-text material-icons" id="iconosModal">lock</span>
                        <input type="password" id="password" class="form-control" >
                      </div>  
                      
                      <div class="input-group mb-4 px-4">
                        <input type="submit" id="btnIngreso" class="form-control" value="Ingresar">
                      </div> 

                    </div>
                </form>

            </div>
        </div>
    </div>

    <!-- MODAL REGISTRARSE-->

    <div class="modal fade" id="modalRegistrarse" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <!--FORMULARIO-->
                <form id="formRegistrarse">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-12">
                                <div class="form group">
                                    <label for="" class="col-form-label">Correo</label>
                                    <input type="text" class="form-control" placeholder="Nombre usuario" id="correo">
                                </div>
                            </div>
                            <div class="col-12 ">
                                <div class="form group">
                                    <label for="" class="col-form-label">nombre</label>
                                    <input type="password" class="form-control" placeholder="Contraseña" id="nom">
                                </div>
                            </div>                         
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" id="btnRegistro" class="btn btn-primary" value="Registrarse"></button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>      
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./js/funciones.js" type="text/javascript"></script>
</body>
</html>