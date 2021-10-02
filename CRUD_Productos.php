<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD PRODUCTOS</title>
    <!-- Bootstrap-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <!--ICONS-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <!--DataTables-->
    <link rel="stylesheet" href="./DataTables/datatables.min.css">
    <link rel="stylesheet" href="./DataTables/css/dataTables.bootstrap5.min.css">
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <button type="button" id="btnnuevo" class="btn btn-success" data-toggle="modal">
                    AGREGAR NUEVO PRODUCTO <span class="material-icons">add_circle_outline</span> 
                </button>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div class="row">
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


    <script src="./Js/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ" crossorigin="anonymous"></script>
    <script src="./DataTables/datatables.min.js"></script>
    <script type="text/javascript" src="scriptProductos.js"></script>
</body>

</html>