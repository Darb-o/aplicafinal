<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD PRODUCTOS</title>
    <!-- Bootstrap-->
    <link rel="stylesheet" href="./bootstrap-5.1.0-dist/css/bootstrap.min.css">
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
                    AGREGAR NUEVA PROMOCION <span class="material-icons">add_circle_outline</span> 
                </button>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaDescuentos" class="table table-striped table-bordered
                    table-condense" style="width: 100%">
                        <thead class="text-center">
                            <tr>
                                <th>ID DEL DESCUENTO</th>
                                <th>ID DEL PRODUCTO</th>
                                <th>DESCUENTO</th>
                                <th>FECHA DE INICIO</th>
                                <th>FECHA FINAL</th>
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
    <div class="modal fade" id="modalDescuentos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">DESCUENTOS</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> 
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <!--Formulario-->
                <form id="formDescuentos">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <label class="col-form-label">Escoja el producto a tener descuento</label>
                                <div class="form-group">
                                    <select class="form-select form-select-sm" aria-label=".form-select-sm example" id="seleccion">
                                        <option selected>Escoja el producto</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">Descuento</label>
                                    <input type="number" class="form-control" placeholder="Digite descuento aplicado al producto" id="descuento">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">Fecha de inicio</label>
                                    <input type="date" class="form-control" min="" id="fecha_i">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">Fecha de finalizacion</label>
                                    <input type="date" class="form-control" id="fecha_f">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-primary">Agregar nuevo descuento</button>
                    </div>
                </form>
            </div>
        </div>
    </div>


    <script src="./Js/jquery-3.6.0.min.js"></script>
    <script src="./Popper/popper.min.js"></script>
    <script src="./bootstrap-5.1.0-dist/js/bootstrap.min.js"></script>
    <script src="./DataTables/datatables.min.js"></script>
    <script type="text/javascript" src="scriptPromo.js"></script>
</body>

</html>