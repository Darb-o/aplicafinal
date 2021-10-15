var descuento = new Array();
var id_conD = new Array();
var deducciones = new Array();
var opcion;
$(document).ready(function() {
    document.getElementById("btnMostrar").style.visibility = "hidden";

    tablaFacturas = $('#tablaFacturas').DataTable({
        "ajax": {
            "url": "bd/solicitudes.php",
            "method": "POST",
            "data": { opcion: 27, estadoP: 2 },
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
            { "data": "id_factura" },
            { "data": "correo" },
            { "data": "fecha_pedido" },
            { "data": "tipo_pedido" },
            { "data": "valor_total" },
            { "defaultContent": "<div class='iconosTabla'><span class='btnVer'><ion-icon name='save-outline'></ion-icon></ion-icon></span></div>" }
        ]
    });
    total = document.getElementById("total");
    var t = 0;
    var fila;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: 28 },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                t = t + parseInt(data[i].valor_total);
            }
            total.innerHTML = t;
        }
    });
    meses("10", "2021");
    $(document).on("click", ".btnVer", function() {
        fila = $(this).closest('tr');
        var id_factura = parseInt(fila.find('td:eq(0)').text());
        var fechaCompra = (fila.find('td:eq(2)').text());
        var tipo = parseInt(fila.find('td:eq(3)').text());
        var correo = fila.find('td:eq(1)').text();
        var tipoL;
        if (tipo == 1) {
            tipoL = "Domicilio";
        } else if (tipo == 2) {
            tipoL = "Recogido en restaurante";
        } else if (tipo == 3) {
            tipoL = "Compra en caja";
        }
        $("#tipo").val(tipoL);
        $("#fecha").val(fechaCompra);
        if ((tipo == 1) || (tipo == 2)) {
            consultarDatosUsuario(id_factura, correo);
        } else {
            consultarOrden_Producto(id_factura);
        }
    });

})

function consultarOrden_Producto(factura) {
    opcion = 25;
    var total = 0;
    var stringId_p = "";
    var stringNom_p = "";
    var stringUni = "";
    var stringTotales = "";
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
                stringDatos += "<p class='text-end'>" + data[i].id_producto + "-" + data[i].nombre_produc + " X " + data[i].unidades + "    $" + (data[i].subtotal) + "</p>";
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
                    $("#btnMostrar").click();
                }
            })
        }
    });
}

function consultarDatosUsuario(id_factura, correo) {
    opcion = 31;
    var stringUsuario = "";
    console.log(correo);
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, correo: correo },
        success: function(data) {
            console.log(data);
            /*var at = document.getElementById("campo");
            at.insertAdjacentHTML('beforeend', "<p class='text-center' id='texto'>Usuario: " + data[0].correo + "</p>");
            at.insertAdjacentHTML('beforeend', "<p class='text-center' id='texto'>Nombre: " + data[0].nombre + "</p>");
            at.insertAdjacentHTML('beforeend', "<p class='text-center' id='texto'>Direccion: " + data[0].direccion + "</p>");*/
            stringUsuario = data[0].correo + "/" + data[0].nombre + "/" + data[0].direccion;
            $("#usuario").val(stringUsuario);
        }
    });
    consultarOrden_Producto(id_factura);
}

function mes(m) {
    if (m == "01") {
        return "Enero";
    } else if (m == "02") {
        return "Febrero";
    } else if (m == "03") {
        return "Marzo";
    } else if (m == "04") {
        return "Abril";
    } else if (m == "05") {
        return "Mayo";
    } else if (m == "06") {
        return "Junio";
    } else if (m == "07") {
        return "Julio";
    } else if (m == "08") {
        return "Agosto";
    } else if (m == "09") {
        return "Septiembre";
    } else if (m == "10") {
        return "Octubre";
    } else if (m == "11") {
        return "Noviembre";
    } else if (m == "12") {
        return "Dicembre";
    }
}

function dia(m) {
    if (m == "01") {
        return 31;
    } else if (m == "02") {
        return 28;
    } else if (m == "03") {
        return 31;
    } else if (m == "04") {
        return 30;
    } else if (m == "05") {
        return 31;
    } else if (m == "06") {
        return 30;
    } else if (m == "07") {
        return 31;
    } else if (m == "08") {
        return 31;
    } else if (m == "09") {
        return 30;
    } else if (m == "10") {
        return 31;
    } else if (m == "11") {
        return 30;
    } else if (m == "12") {
        return 31;
    }
}

function meses(month, year) {
    var day = dia(month);
    console.log("Dia=", day);
    var fechaInicio = year + "/" + month + "/01";
    var fechaFinal = year + "/" + month + "/" + day;
    console.log(fechaInicio);
    console.log(fechaFinal);
    opcion = 30;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, fecha_i: fechaInicio, fecha_f: fechaFinal, estadoP: 2 },
        success: function(data) {
            if (data.length != 0) {
                console.log("entre");
                crearTablaMes(month, year, fechaInicio, fechaFinal);
            } else {
                console.log("entre");
                en = document.getElementById("tablas_nuevas");
                en.insertAdjacentHTML("beforeend", "<hr class='hr-text' data-content='No hay registros en el mes de " + mes(month) + "del año " + year + "'>")
            }
        }
    });
}

function crearTablaMes(m, y, fechaInicio, fechaFinal) {
    //crear titulo de mes y año
    en = document.getElementById("tablas_nuevas");
    en.insertAdjacentHTML("beforeend", "<p class='text-center fs-2' ; style='display: inline-block' ;>Recaudos de " + mes(m) + " del año " + y + "</p>");
    //crear la tabla en html con id = tablaMesAño
    en.insertAdjacentHTML("beforeend", "<div class='row'><div class='col-lg-12'><div class='table-responsive'><table id='tabla" + m + "_" + y + "' class='table table-striped table-bordered table-condense' style='width: 100%'><thead class='text-center'><tr><th>FACTURA</th><th>USUARIO</th><th>FECHA</th><th>TIPO</th><th>VALOR</th><th>ORDEN</th><th>ACCIONES</th></tr></thead><tbody></tbody></table></div></div></div>");
    //llenar la tabla con ajax
    tablaMes = $('#tabla' + m + '_' + y).DataTable({
        "ajax": {
            "url": "bd/solicitudes.php",
            "method": "POST",
            "data": { opcion: 30, fecha_i: fechaInicio, fecha_f: fechaFinal, estadoP: 2 },
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
            { "data": "id_factura" },
            { "data": "correo" },
            { "data": "fecha_pedido" },
            { "data": "tipo_pedido" },
            { "data": "valor_total" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnVer'>VER FACTURA<span class='material-icons-outlined'>receipt</span></button></div></div>" }
        ]
    });
    month = parseInt(m);
    month++;
    //vuelve a la funcion de buscar data
    meses(month, y);
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