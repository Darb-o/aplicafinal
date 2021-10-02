var opcion, id_p;
$(document).ready(function() {
    opcion = 9;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            $('#seleccion').val(null).trigger('change');
            for (var i = 0; i < data.length; i++) {
                $("#seleccion").append('<option value=' + data[i].id_grupo + '>' + data[i].id_grupo + '-' + data[i].nombre_grupo + '</option>');
            }
        }
    });
    opcion = 8;
    tablaProductos = $('#tablaProductos').DataTable({
        "ajax": {
            "url": "bd/solicitudes.php",
            "method": "POST",
            "data": { opcion: opcion },
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
            { "data": "descripcion" },
            { "data": "img" },
            { "data": "estado_producto" },
            { "data": "grupo" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'>EDITAR PRODUCTO<span class='material-icons'>edit</span></button><button class='btn btn-warning btn-sm btnCambiar'>CAMBIAR ESTADO<span class='material-icons'>change_circle</span></button><button class='btn btn-danger btn-sm btnBorrar'>BORRAR PRODUCTO<span class='material-icons'>delete</span></button></div></div>" }
        ]
    });
    var fila;
    $('#formProductos').submit(function(e) {
        e.preventDefault(); //evitar la funcion del submit para recargar la pagina
        grupo = $.trim($('#seleccion').val());
        nom_p = $.trim($('#nom_p').val());
        precio = $.trim($('#precio').val());
        desc = $.trim($('#desc').val());
        img = $.trim($('#img').val());
        //usar el fondo de AJAX para el tratamiento de datos
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { id_p: id_p, nom_p: nom_p, precio: precio, desc: desc, img: img, grupo: grupo, opcion: opcion },
            success: function(data) {
                tablaProductos.ajax.reload(null, false);
            }
        });
        $('#modalProductos').modal('hide');
    });
    $('#btnnuevo').click(function() {
        opcion = 5;
        id_p = null;
        $("#formProductos").trigger("reset"); //resetear o limpiar el formulario
        $(".modal-header").css("background-color", "#198754");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Ingresar nuevo producto");
        $("#btnGuardar").text("Guardar Producto");
        $("#modalProductos").modal('show');
    });

    $(document).on("click", ".btnEditar", function() {
        fila = $(this).closest('tr');
        id_p = parseInt(fila.find('td:eq(0)').text());
        nom_p = fila.find('td:eq(1)').text();
        precio = parseInt((fila.find('td:eq(2)').text()));
        desc = fila.find('td:eq(3)').text();
        img = fila.find('td:eq(4)').text();
        grupo = parseInt(fila.find('td:eq(6)').text());
        opcion = 9;
        $("#seleccion").val(grupo);
        $("#nom_p").val(nom_p);
        $("#precio").val(precio);
        $("#desc").val(desc);
        $("#img").val(img);
        $(".modal-header").css("background-color", "#0d6efd");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Producto");
        $("#btnGuardar").text("Editar Producto");
        opcion = 6;
        $("#modalProductos").modal('show');
    });

    $(document).on("click", ".btnCambiar", function() {
        fila = $(this).closest('tr');
        id_p = parseInt(fila.find('td:eq(0)').text());
        estado = parseInt(fila.find('td:eq(5)').text());
        if (estado == 1) {
            estado = 0;
        } else {
            estado = 1;
        }
        opcion = 10;
        var confirmacion = confirm("Esta seguro de cambiar el estado del producto " + id_p + "?");
        if (confirmacion) {
            $.ajax({
                url: "bd/solicitudes.php",
                type: "post",
                dataType: "json",
                data: { opcion: opcion, id_p: id_p, estado: estado },
                success: function() {
                    tablaProductos.ajax.reload(null, false);
                }
            });
            tablaProductos.ajax.reload(null, false);
        }
    });

    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        id_p = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 7;
        var confirmacion = confirm("Esta seguro de eliminar el registro " + id_p + "?");
        if (confirmacion) {
            $.ajax({
                url: "bd/solicitudes.php",
                type: "post",
                dataType: "json",
                data: { opcion: opcion, id_p: id_p },
                success: function() {
                    tablaProductos.row(fila).parents('tr').remove().draw();
                }
            });
            tablaProductos.ajax.reload(null, false);
        }
    });
})