<?php
session_start();
if(isset( $_SESSION['user'])){
  if($_SESSION['id_rol'] == 3 || $_SESSION['id_rol'] == 2){
    header('Location: inicio.php');
  }
}else{
  header('Location: inicio.php');
}
?>
<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD PRODUCTOS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.11.3/datatables.min.css">
    <link rel="stylesheet" type="text/css" href="./css/estilos.css"/>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
    />
</head>

<body>
    <!--MENU ADMIN-->
    <nav id="menuAdmin" class="navbar navbar-expand-lg navbar-light sticky-top">
         <div class="container-fluid">     
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item ">
              <a class="nav-link" href="./admin.php"><h5 class="navbar-brand" id="texto">Restaurante</h5></a>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="iconousuarioadmin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <span id="iconosMenu" class="material-icons">account_circle</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><button type='button' id='btnPerfil' class='btn dropdown-item' data-toggle='modal'>Mi perfil</button></li>
                <li><button type='button' id='btnRegistrarEmpleado' class='btn dropdown-item' data-toggle='modal'>Registrar empleado</button></li>
                <li><button type='button' id='btnRegistrarAdmin' class='btn dropdown-item' data-toggle='modal'>Registrar admin</button></li>
                <li><button type='button' id='btnSalirSesion' class='btn dropdown-item' data-toggle='modal'>Cerrar sesion</button></li>                              
              </ul>
            </li>

             <li class="nav-item">
             <button type='button' id='btnFacturas' class='btn'>
                    <span id='iconosMenu' class='material-icons'>receipt_long</span>
                </button>
             </li> 

             <li class="nav-item">
             <button type='button' id='btnProductos' class='btn'>
                    <span id='iconosMenu' class='material-icons'>inventory_2</span>
                </button>
             </li>

             <li class="nav-item">
             <button type='button' id='btnPromociones' class='btn'>
                    <span id='iconosMenu' class='material-icons'>point_of_sale</span>
                </button>
             </li>

             <li class="nav-item">
             <button type='button' id='btnGrupo' class='btn'>
                    <span id='iconosMenu' class='material-icons'>production_quantity_limits</span>
                </button>
             </li>

            </ul>

            <ul class="nav justify-content-end">
            <li class="nav-item ">
              <h5 class="navbar-brand" id="texto"> 
                <?php           
                if(isset( $_SESSION['user'])){
                  if($_SESSION['user']!=null){
                    echo "Bienvenido administrador ".$_SESSION['datosusuario'][0]['nombre'];;
                  }               
                }          
                ?></h5>
             </li>
            </ul>
           </div>
         </div>
    </nav>


    <div class="container-xl">
        <div class="row">
            <div class="col-9 mt-4 mb-3">
              <h4>Listado de productos</h4>
            </div> 
              <div class="col-3 mt-4 mb-3 d-flex justify-content-end">
                  <button type="button" id="btnnuevo" class="btn btn-success" data-toggle="modal">
                  <i id="iconitos" class="bi bi-cloud-plus-fill"></i>Agregar producto 
                  </button>
              </div>
            
          
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaProductos" class="table table-striped table-bordered
                    table-condense" style="width: 100%">
                        <thead class="text-center">
                            <tr>
                                <th>ID DEL PRODUCTO</th>
                                <th>NOMBRE DEL PRODUCTO</th>
                                <th>PRECIO</th>
                                <th>DESCIPCION</th>
                                <th>IMG</th>
                                <th>ESTADO</th>
                                <th>GRUPO</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <!--ventana modal -->
    <!-- Modal -->
    <div class="modal fade" id="modalProductos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">ALUMNOS</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> 
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <!--Formulario-->
                <form id="formProductos">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <label class="col-form-label">Escoja el grupo al que pertenece el producto</label>
                                <div class="form-group">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="seleccion">
                                        <option selected>Escoja el Grupo</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">NOMBRE</label>
                                    <input type="text" class="form-control" placeholder="Digite el nombre del producto" id="nom_p">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">PRECIO</label>
                                    <input type="number" class="form-control" placeholder="Digite el precio del producto" id="precio">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">DESCRIPCION</label>
                                    <input type="text" class="form-control" placeholder="Digite la descripción del producto" id="desc">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">IMG</label>
                                    <input type="text" class="form-control" placeholder="Digite la dirección de la imagen del productoo" id="img">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-primary">Agregar producto</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

     <!-- MODAL REGISTRARSE-->

     <div class="modal fade" id="modalRegistrarse" tabindex="-1" data-bs-focus="false" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
              
                <div class="modal-header">
                    <h4 id="texto" class="modal-title">Registro</h4>
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
                        <label for="" id="txtlabel" class="col-12 col-form-label">Contraseña*</label>
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
                        <input type="button" id="btnCambioPassword" class="form-control" value="Cambiar contraseña">
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


    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>      
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.11.3/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="./js/funciones.js" type="text/javascript"></script>
    <script type="text/javascript" src="./js/scriptProductos.js"></script>
    
</body>

</html>