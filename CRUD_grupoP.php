<!doctype html>
<html lang="es">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CRUD GRUPO PRODUCTOS</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/css2?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs5/dt-1.11.3/datatables.min.css">
    <link rel="stylesheet" type="text/css" href="./css/estilos.css"/>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 text-center">
                <button type="button" id="btnnuevo" class="btn btn-success" data-toggle="modal">
                    AGREGAR NUEVO GRUPO DE PRODUCTO <span class="material-icons">add_circle_outline</span> 
                </button>
            </div>
        </div>
    </div>
    <br>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive">
                    <table id="tablaGrupos" class="table table-striped table-bordered
                    table-condense" style="width: 100%">
                        <thead class="text-center">
                            <tr>
                                <th>ID DEL GRUPO</th>
                                <th>NOMBRE DE GRUPO</th>
                                <th>DESCRIPCION DE GRUPO</th>
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
    <div class="modal fade" id="modalGProductos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">GRUPO PRODUCTOS</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> 
                        <span aria-hidden="true"></span>
                    </button>
                </div>
                <!--Formulario-->
                <form id="formGrupoP">
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">NOMBRE GRUPO</label>
                                    <input type="text" class="form-control" placeholder="Digite el nombre del grupo del producto" id="nombre_grupo">
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label class="col-form-label">DESCRIPCION GRUPO</label>
                                    <input type="text" class="form-control" placeholder="Descripcion del grupo" id="descripcion_grupo">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="submit" id="btnGuardar" class="btn btn-primary">Agregar nuevo grupo</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://unpkg.com/@popperjs/core@2/dist/umd/popper.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.min.js" integrity="sha384-skAcpIdS7UcVUC05LJ9Dxay8AXcDYfBJqt1CJ85S/CFujBsIzCIv+l9liuYLaMQ/" crossorigin="anonymous"></script>      
    <script type="text/javascript" src="https://cdn.datatables.net/v/bs5/dt-1.11.3/datatables.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script type="text/javascript" src="./js/scriptgrupo.js"></script>
</body>

</html>