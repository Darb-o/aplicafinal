var descuento = new Array();
var id_conD = new Array();
var id_producto = new Array();
var nombre_producto = new Array();
var precio = new Array();
var unidades = new Array();
var deducciones = new Array();
var factura = 0;
var opcion;
var idcarro;
var id_orden;
$(document).ready(function() {
    document.getElementById("btnPDF").style.visibility = "hidden";
    document.getElementById("btnNueva").style.visibility = "hidden";
    opcion = 15;
    var productos = "";
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                productos += "<option value=" + data[i].id_producto + ">" + data[i].id_producto + "-" + data[i].nombre_produc + "</option>";
            }
        }
    });
    opcion = 16;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                id_conD.push(data[i].id_producto);
                descuento.push(data[i].descuento);
            }
        }
    });

    var fila;
    $('#btnnuevo').click(function() {
        Swal.fire({
            icon: 'info',
            html: '<form id="formProductos"><label class="col-form-label">Escoja el producto</label><select class="form-select form-select-sm" id="seleccion"><option selected>Escoja el Producto</option>' +
                productos + '</select>' +
                '<label class="col-form-label">Digite la cantidad</label><br>' +
                '<input type="number" placeholder="Digite la cantidad" id="cantidad">' +
                '<input type="submit" id="Agregar"></form>',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: 'Agregar Producto',
            cancelButtonText: 'Cerrar',
        }).then((result) => {
            if (result.isConfirmed) {
                $("#Agregar").click();
            }
        })
        document.getElementById("Agregar").style.visibility = "hidden";
        $('#formProductos').submit(function(e) {
            e.preventDefault(); //evitar la funcion del submit para recargar la pagina
            cantidad = $.trim($('#cantidad').val());
            idcarro = $.trim($('#seleccion').val());
            opcion = 19;
            $.ajax({
                url: "bd/solicitudes.php",
                type: "POST",
                dataType: "json",
                data: { opcion: opcion, id_p: idcarro }, //por cambiar para usuario de verdad
                success: function(data) { //data retorna id_factura
                    console.log(data);
                    var des = 0;
                    var hecho = 0;
                    for (var i = 0; i < id_conD.length; i++) {
                        if (id_conD[i] == idcarro) {
                            des = ((data[0].precio * descuento[i]) / 100) * cantidad;
                            console.log(des);
                            hecho = 1;
                        }
                    }
                    if (hecho == 0) {
                        des = data[0].precio * cantidad;
                        console.log(des);
                    }
                    siguiente(des);
                }
            });

        });
    });

    function siguiente(des) {
        if (factura == 0) {
            opcion = 3;
            $.ajax({
                url: "bd/sesiones.php",
                type: "POST",
                dataType: "json",
                data: { opcion: opcion },
                success: function(data) {
                    opcion = 20;
                    $.ajax({
                        url: "bd/solicitudes.php",
                        type: "POST",
                        dataType: "json",
                        data: { opcion: opcion, usuario: data[0].correo }, //por cambiar para usuario de verdad
                        success: function(data) { //data retorna id_factura
                            factura = data[0].id_factura;
                            f = document.getElementById("factura");
                            factura.innerHTML = factura;
                            crearTabla(cantidad, des);
                        }
                    });
                }
            });

        } else {
            guardarProductos(cantidad, des);
        }
    }

    function guardarProductos(cantidad, des) {
        opcion = 21;
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, unidades: cantidad, subtotal: des, id_p: idcarro, id_factura: factura },
            success: function(data) { //data retorna id_factura
                tablaCompra.ajax.reload(null, false);
            }
        });
    }

    function crearTabla(cantidad, des) {
        //opcion 6 crea nuevo
        //opcion 7 consulta el id_orden utilizando el id_factura 
        opcion = 25;
        tablaCompra = $('#tablaCompra').DataTable({
            "ajax": {
                "url": "bd/solicitudes.php",
                "method": "POST",
                "data": { opcion: opcion, id_factura: factura },
                "dataSrc": "",

            },
            "language": {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "sLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                }
            },
            "columns": [
                { "data": "id_producto" },
                { "data": "nombre_produc" },
                { "data": "precio" },
                { "data": "unidades" },
                { "data": "subtotal" }
            ]
        });
        guardarProductos(cantidad, des);
    }
    $('#btnListo').click(function() {
        orden_p();
    });
    $('#btnNueva').click(function() {
        location.reload();
        return false;
    });
})

function orden_p() {
    if (factura == 0) {
        Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'La factura esta vacia',
        })
    } else {
        consultarProductos();
    }
}

function consultarProductos() {
    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()
    opcion = 25;
    var total = 0;
    var stringId_p = "";
    var stringNom_p = "";
    var stringUni = "";
    var stringTotales = "";
    var stringDeduc = "";
    var sub = "";
    var tot = "";
    var stringDatos = "";
    $("#id_factura").val(factura);
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_factura: factura },
        success: function(data) {
            //llenar arreglos para calculo
            for (var i = 0; i < data.length; i++) {
                total += parseInt(data[i].subtotal);
                stringDatos += "<p class='text-end'>" + data[i].id_producto + "-" + data[i].nombre_produc + " X " + data[i].unidades + "    $" + data[i].subtotal + "</p>";
                stringId_p += data[i].id_producto + "/";
                stringNom_p += data[i].nombre_produc + "/";
                stringUni += data[i].unidades + "/";
                stringTotales += (data[i].subtotal) + "/";
            }
            stringDatos += "<hr>";
            tot += "" + total;
            stringDatos += "<p class='text-end'>Total: $" + total + "</p>";
            $("#id_produc").val(stringId_p);
            $("#nombreP").val(stringNom_p);
            $("#unidades").val(stringUni);
            $("#totales").val(stringTotales);
            $("#valor").val(tot);
            $("#tipo").val("Compra en caja");
            $("#fecha").val(cYear + "/" + cMonth + "/" + cDay);
            terminarPedido(total);
            Swal.fire({
                icon: 'info',
                html: '<p>Restaurante</p>' +
                    '<p>Nit:**********</p>' +
                    '<p>Direccion:Cll # A ## Sur</p>' +
                    '<p>Factura #' + factura +
                    '</p><p>Fecha:' + $("#fecha").val() +
                    '<p>Tipo:' + $("#tipo").val() + '</p>' +
                    stringDatos,
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: "DESCARGAR PDF",
                cancelButtonText: "CERRAR",
            }).then((result) => {
                if (result.isConfirmed) {
                    $("#btnPDF").click();
                }
            })
            document.getElementById("btnNueva").style.visibility = "visible";

        }
    });
}

function terminarPedido(total) {
    opcion = 26;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, total: total, id_factura: factura },
        success: function() {
            location.reload();
            return false;
        }
    });
}

$(document).on("click", ".cerrarSesion", function() {
    opcion = 2;
    Swal.fire({
        title: 'Estas seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, cierra la sesion!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: './bd/sesiones.php',
                type: 'POST',
                dataType: 'json',
                data: { opcion: opcion },
            });
            window.location.href = 'inicio.php';
        } else {
            $.ajax({
                url: './inicio.php'
            });
        }
    })
});