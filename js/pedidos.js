var fila;
var opcion;
$(document).ready(function() {
    tablaFacturas = $('#tablaFacturas').DataTable({
        "ajax": {
            "url": "bd/solicitudes.php",
            "method": "POST",
            "data": { opcion: 32 },
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
            { "defaultContent": "<div class='iconosTabla'><span class='btnCambiar'><ion-icon name='reload-circle-outline'></ion-icon></span><span class='btnVer'><ion-icon name='document-outline'></ion-icon></span></div>" }
        ]
    });
    $(document).on("click", ".btnVer", function() {
        fila = $(this).closest('tr');
        id_factura = parseInt(fila.find('td:eq(0)').text());
        tipo = parseInt(fila.find('td:eq(3)').text());
        if (tipo == 1) {
            tipoL = "Domicilio";
        } else if (tipo == 2) {
            tipoL = "Recogido en restaurante";
        }
        id_factura = parseInt(fila.find('td:eq(0)').text());
        opcion = 25;
        let stringDatos = "";
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, id_factura: id_factura },
            success: function(data) {
                //llenar arreglos para calculo
                for (var i = 0; i < data.length; i++) {
                    stringDatos += "<p class='text-end'>" + data[i].id_producto + "-" + data[i].nombre_produc + " X " + data[i].unidades + "</p>";
                }
                Swal.fire({

                    html: '<p class="text-center">' +
                        '</p><p>' + tipoL + '</p>' +
                        stringDatos,
                })
            }
        });
    });
    $(document).on("click", ".btnCambiar", function() {
        fila = $(this).closest('tr');
        id_factura = parseInt(fila.find('td:eq(0)').text());
        opcion = 34;
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, id_factura: id_factura },
            success: function(data) {
                tablaFacturas.ajax.reload(null, false);
            }
        });
        //cambiar el estado
    })
})