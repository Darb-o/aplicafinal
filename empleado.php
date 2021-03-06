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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.css"/>
    <link rel="stylesheet" type="text/css" href="./css/estilos.css"/>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre&display=swap" rel="stylesheet">
    <title>Inicio</title>
</head>
<body>
  <!--Menu Empleado-->
    <nav id="menuEmpleado" class="navbar navbar-expand-lg navbar-light sticky-top">
         <div class="container-fluid">     
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item ">
              <a class="nav-link" href="./empleado.php"><h5 class="navbar-brand" id="texto">Restaurante</h5></a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="iconousuarioempleado" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span id="iconosMenu" class="material-icons">account_circle</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
              <li><button type='button' id='btnPerfil' class='btn dropdown-item' data-toggle='modal' data-target='#modalEditarPerfil'>Mi perfil</button></li>
                <li><button type='button' id='btnSalirSesion' class='btn dropdown-item' data-toggle='modal'>Cerrar sesion</button></li>
              </ul>
            </li>

             <li class="nav-item">
             <button type='button' id='btnfacturasemp' class='btn'>
                    <span id='iconosMenu' class='material-icons'>receipt_long</span>
                  </button>
             </li> 
            </ul>

            <ul class="nav justify-content-end">
            <li class="nav-item ">
              <h5 class="navbar-brand" id="texto"> 
                <?php           
                if(isset( $_SESSION['user'])){
                  if($_SESSION['user']!=null){
                    echo "Bienvenido empleado ".$_SESSION['datosusuario'][0]['nombre'];;
                  }               
                }          
                ?></h5>
             </li>
            </ul>
           </div>
         </div>
    </nav>

    <!-- MODAL EDITAR PERFIL-->

    <div class="modal fade" id="modalEditarPerfil" data-bs-focus="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content"> 

                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>          
                </div>
                
                <div class="modal-body">
                  <div class="col-12 mb-2">
                      <img id="imgPerfil" class="img-fluid rounded mx-auto d-block" src="./image/perfil.png" alt="" width="100px" height="80px" >
                  </div>

                  <!--FORMULARIO-->
                  <form id="formEditarPerfil">
                  
                    <div class="input-group input-group-sm px-5">
                      <label for="" id="txtlabel" class="col-12 col-form-label">Nombre:</label>
                      <span class="input-group-text material-icons" id="iconosModal">person</span>
                      <input type="text" id="nom_edit" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"> 
                      <button class="btn input-group-text" type="button" id="btnEditNombre">
                        <span class=" material-icons" id="iconosModal">settings</span>
                      </button>     
                    </div>

                    <div class="input-group input-group-sm px-5">
                      <label for="" id="txtlabel" class="col-12 col-form-label">Telefono contacto:</label>
                      <span class="input-group-text material-icons" id="iconosModal">phone_iphone</span>
                      <input type="number" id="tel_edit" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"> 
                      <button class="btn input-group-text" type="button" id="btnEditTel">
                        <span class=" material-icons" id="iconosModal">settings</span>
                      </button>     
                    </div>

                    <div class="input-group input-group-sm px-5">
                      <label for="" id="txtlabel" class="col-12 col-form-label">Correo:</label>
                      <span class="input-group-text material-icons" id="iconosModal">email</span>
                      <input type="email" id="correo_edit" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"> 
                      <button class="btn input-group-text" type="button" id="btnEditCorreo">
                        <span class=" material-icons" id="iconosModal">settings</span>
                      </button>     
                    </div>

                    <div class="input-group input-group-sm px-5">
                      <label for="" id="txtlabel" class="col-12 col-form-label">Fecha nacimiento:</label>
                      <span class="input-group-text material-icons" id="iconosModal">calendar_today</span>
                      <input type="date" id="fecha_edit" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"> 
                      <button class="btn input-group-text" type="button" id="btnEditFecha">
                        <span class=" material-icons" id="iconosModal">settings</span>
                      </button>     
                    </div>

                    <div class="input-group input-group-sm mb-3 px-5">
                      <label for="" id="txtlabel" class="col-12 col-form-label">Direccion:</label>
                      <span class="input-group-text material-icons" id="iconosModal">gite</span>
                      <input type="text" id="direccion_edit" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"> 
                      <button class="btn input-group-text" type="button" id="btnEditDireccion">
                        <span class=" material-icons" id="iconosModal">settings</span>
                      </button>     
                    </div>
                      <div class="row">
                      <div class="input-group input-group-sm col">
                        <input type="button" id="btnCambioPassword" class="form-control" value="Cambiar contrase??a">
                      </div> 

                      <div class="input-group input-group-sm col">
                        <input type="submit" id="btnEditarPerfil" class="form-control" value="Editar datos">
                      </div> 
                      </div>
                    </div>
                  </form>
                </div>
            </div>
        </div>
    </div>

      <section class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 col-6">
                    <div class="small-box bg-info">
                        <div class="inner">
                            <h3>150</h3>
                            <p>New Orders</p>
                        </div>
                        <div class="icon">
                            <i class="ion ion-bag"></i>
                        </div>
                        <a href="#" class="small-box-footer">
                            "More info"
                            <i class="fas fa-arrow-circle-right">
                                ::before
                            </i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>      
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./js/funciones.js" type="text/javascript"></script>
</body>
</html>