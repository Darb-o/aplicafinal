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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"/>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Gemunu+Libre&display=swap" rel="stylesheet">
    <title>Inicio</title>
</head>
<body>
  <!-- MENU -->
        <nav id="menuInicio" class="navbar navbar-expand-lg navbar-light sticky-top">
         <div class="container-fluid">     
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item ">
              <a class="nav-link" href="./inicio.php"><h5 class="navbar-brand" id="texto">Restaurante</h5></a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="iconousuarioinicio" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
                      echo "<li><button type='button' id='btnPerfil' class='btn dropdown-item' data-toggle='modal' data-target='#modalEditarPerfil'>Mi perfil</button></li>
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
              <button type="button" id="btnMenuCarro" class="btn">
                <span id="iconosMenu" class="material-icons">shopping_cart</span>
              </button>
             </li>

             <li class="nav-item">
              <?php 
                if(isset( $_SESSION['user'])){
                  if($_SESSION['user']!=null){
                    echo "<button type='button' id='btnFacturaActual' class='btn'>
                    <span id='iconosMenu' class='material-icons'>receipt_long</span>
                  </button>";
                  }
                }
              ?>
             </li> 
            </ul>

            <ul class="nav justify-content-end">
            <li class="nav-item ">
              <h5 class="navbar-brand" id="texto"> 
                <?php           
                if(isset( $_SESSION['user'])){
                  if($_SESSION['user']!=null){
                    echo "Bienvenido ".$_SESSION['datosusuario'][0]['nombre'];;
                  }               
                }          
                ?></h5>
             </li>
            </ul>
           </div>
         </div>
        </nav>        

    <!-- MODAL INICIO SESION-->

    <div class="modal fade" id="modalInicioSesion" tabindex="-1" data-bs-focus="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
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

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Correo electronico:</label>
                        <span class="input-group-text material-icons" id="iconosModal">email</span>
                        <input type="email" id="user" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div>

                      <div class="input-group input-group-sm mb-1 px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Contrase??a:</label>
                        <span class="input-group-text material-icons" id="iconosModal">lock</span>
                        <input type="password" id="password" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div>                     
 
                      <div class="input-group input-group-sm mb-2 px-4">
                        <a type="button" class="col-12 col-form-label" id="btnRecuperar" >Recuperar contrase??a?</a>
                      </div>            

                      <div class="input-group input-group-sm mb-3 px-4">
                        <input type="submit" id="btnIngreso" class="form-control" value="Ingresar">
                      </div> 
                 

                    </div>
                </form>

            </div>
        </div>
    </div>

    <!-- MODAL REGISTRARSE-->

    <div class="modal fade" id="modalRegistrarse" tabindex="-1" data-bs-focus="false" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              
                <div class="modal-header">
                    <h4 id="texto" class="modal-title">Registro nuevo usuario</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>          
                </div>
                
                <!--FORMULARIO-->
                
                <form id="formRegistrarse">
                    <div class="modal-body px-5">

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Nombre*</label>
                        <span class="input-group-text material-icons" id="iconosModal">person</span>
                        <input type="texto" id="nombre_r" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div>

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Telefono contacto*</label>
                        <span class="input-group-text material-icons" id="iconosModal">phone_iphone</span>
                        <input type="number" id="tel_r" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"  required>
                      </div>

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Correo electronico*</label>
                        <span class="input-group-text material-icons" id="iconosModal">email</span>
                        <input type="email" id="correo_r" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div>                                         

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Fecha nacimiento*</label>
                        <span class="input-group-text material-icons" id="iconosModal" >calendar_today</span>
                        <input type="date" id="fechanac_r" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required >
                      </div>
                      
                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Direccion*</label>
                        <span class="input-group-text material-icons" id="iconosModal">gite</span>
                        <input type="text" id="direccion_r" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div>

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Contrase??a*</label>
                        <span class="input-group-text material-icons" id="iconosModal">lock</span>
                        <input type="password" id="password_r" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div> 

                      <div class="input-group input-group-sm px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Pregunta de seguridad</label>
                        <span class="input-group-text material-icons" id="iconosModal">lock</span>
                        <select class="form-select form-control form-select-sm" id="selectPregunta" required aria-label=".form-select-sm example">
                          <?php
                            include("./bd/conexion.php");
                            $ob = new Conexion();
                            $link = $ob->Conectar();
                            $sql = "select * from preguntas";
                            $res=$link->prepare($sql);
                            $res->execute();
                            $data=$res->fetchAll(PDO::FETCH_ASSOC);
                            foreach ($data as $valores):
                              echo '<option value="'.$valores["idpregunta"].'">'.$valores["descripcion"].'</option>';
                            endforeach;
                          ?>
                          </select>
                      </div> 

                      <div class="input-group input-group-sm mb-4 px-4">
                        <label for="" id="txtlabel" class="col-12 col-form-label">Respuesta*</label>
                        <span class="input-group-text material-icons" id="iconosModal">lock</span>
                        <input type="text" id="respuesta" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" required>
                      </div>
                      
                      <div class="input-group mb-4 px-4">
                        <input type="submit" id="btnEnviarRegistro" class="form-control" value="Registrarse">
                      </div> 

                    </div>
                </form>

            </div>
        </div>
    </div>


    <!-- MODAL EDITAR PERFIL-->

    <div class="modal fade" id="modalEditarPerfil" data-bs-focus="false" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content"> 

                <div class="modal-header">
                <h4 id="texto" class="modal-title">Editar perfil</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true"></span>
                    </button>          
                </div>
                
                <div class="modal-body">
                  <div class="col-12 mb-2">
                      <img id="imgPerfil" class="img-fluid rounded mx-auto d-block" src="./img/perfil.png" alt="" width="100px" height="80px" >
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

    <!-- MODAL CARRITO-->
  
    <div class="modal fade"  id="modalCarrito" data-bs-focus="false" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">                             
          <div class="modal-body">             
            <div class="container-xl">
              <div class="row">

                <div class="col-11 mt-1 mb-3">
                  <h4>Mi carrito</h4>
                </div>

                <div class="col-1 mt-1 mb-3 d-flex justify-content-end">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"></span>
                  </button>
                </div>
                
                <div class="col-lg-12">
                  <div class="table-responsive">
                    <table id="tablaCarrito" class="table table-striped table-bordered table-condense" style="width: 100%">
                      <thead class="text-center">
                        <tr>
                          <th>Id</th>
                          <th>Producto</th>
                          <th>Descuento</th>
                          <th>Cantidad</th>
                          <th>Precio unidad</th>                                 
                          <th>Subtotal</th>                        
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="col-12 mt-1 mb-1 mx-1 d-flex justify-content-center">
                  <button type="button" id="btnComprar" class="btn btn-primary btn-md" data-toggle="modal">
                  <i id="iconitos" class="bi bi-handbag"></i>Comprar 
                  </button>
                  <input type="text" class="valortotal" disabled>
                </div>

              </div>
            </div>                        
          </div>
        </div>
      </div>
    </div>


    <!-- MODAL COMPRA-->
  
    <div class="modal fade" id="modalCompra" data-bs-focus="false" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">                             
          <div class="modal-body">             
            <div class="container-xl">
              <div class="row">

                <div class="col-11 mt-1 mb-3">
                  <h4>Elige el metodo de compra</h4>
                </div>

                <div class="col-1 mt-1 mb-3 d-flex justify-content-end">
                  <button type="button" id="btnCerrarModal" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true"></span>
                  </button>
                </div>             
                
                <div class="col-6 mt-1 mb-1 d-flex justify-content-end">
                  <button type="button" id="btnAdomicilio" class="btn btn-primary" data-toggle="modal">
                  <i id="iconitos" class="bi bi-truck"></i>Pedir a domicilio
                  </button>
                </div>
                
                <div class="col-6 mt-1 mb-1 d-flex justify-content-start">
                  <button type="button" id="btnRecogerPersona" class="btn btn-primary" data-toggle="modal">
                  <i id="iconitos" class="bi bi-shop"></i>Recoger en persona
                  </button>
                </div>

                <form id="compraAdomicilio">
                  <div class="col-12 mt-3 mb-3" id="direccionDomicilio">
                    <label for="basic-url" class="form-label d-flex justify-content-center">Escriba la direccion a donde se llevar?? el pedido</label>                                   
                    <div class="input-group ps-4 pe-4">
                      <span class="input-group-text" id="basic-addon3"><i class="bi bi-house"></i></span>
                      <input type="text" class="form-control" placeholder="Escriba su direccion" id="compraDireccion" aria-describedby="basic-addon3">   
                    </div>       
                  </div>
                  <div class="col-12 mt-1 mb-1 mx-1" id="btngenerarCompraDomicilio">
                    <div class="d-flex justify-content-center">
                      <button type="submit" class="btn btn-primary btn-md " data-toggle="modal">
                        <i id="iconitos" class="bi bi-handbag"></i>Realizar compra
                      </button>
                    </div>
                  </div>
                </form>

                <form id="compraEnPersona">
                  <div class="col-12 mt-3 mb-3" id="horaRecoger">
                    <label for="basic-url" class="form-label d-flex justify-content-center">Escribe la hora en que recoger??s tu pedido</label>                                   
                    <div class="input-group ps-4 pe-4">
                      <span class="input-group-text" id="basic-addon3"><i class="bi bi-shop-window"></i></span>
                      <input type="time" min="07:00" max="22:00" class="form-control" placeholder="" id="compraHora" aria-describedby="basic-addon3">   
                    </div>       
                  </div>
                  <div class="col-12 mt-1 mb-1 mx-1" id="btngenerarCompraEnPersona">
                    <div class="d-flex justify-content-center">
                      <button type="submit" class="btn btn-primary btn-md " data-toggle="modal">
                        <i id="iconitos" class="bi bi-handbag"></i>Realizar compra
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>                        
          </div>
        </div>
      </div>
    </div>


    <div class="container-fluid">
        <div class="row" id="contentCard">

        </div>
    </div>

    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>      
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.11.2/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./js/funciones.js" type="text/javascript"></script>
    <script src="./js/scriptPedidosU.js" type="text/javascript"></script>
    <script src="./js/moment.min.js" type="text/javascript"></script>
</body>
</html>