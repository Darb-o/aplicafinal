var opcion, id_d;
$(document).ready(function() {
    var today = new Date().toISOString().split('T')[0];
    document.getElementById("fecha_i").setAttribute('min', today);
    opcion = 15;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            $('#seleccion').val(null).trigger('change');
            for (var i = 0; i < data.length; i++) {
                $("#seleccion").append('<option value=' + data[i].id_producto + '>' + data[i].id_producto + '-' + data[i].nombre_produc + '</option>');
            }
        }
    });
    opcion = 14;
    tablaDescuentos = $('#tablaDescuentos').DataTable({
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
            { "data": "id_descuento" },
            { "data": "id_producto" },
            { "data": "descuento" },
            { "data": "fecha_i" },
            { "data": "fecha_f" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'>EDITAR PRODUCTO<span class='material-icons-outlined'>edit</span></button><button class='btn btn-danger btn-sm btnBorrar'>BORRAR PRODUCTO<span class='material-icons-outlined'>delete</span></button></div></div>" }
        ]
    });
    var fila;
    $('#formDescuentos').submit(function(e) {
        e.preventDefault(); //evitar la funcion del submit para recargar la pagina
        id_p = $.trim($('#seleccion').val());
        descuento = $.trim($('#descuento').val());
        fecha_i = $.trim($('#fecha_i').val());
        fecha_f = $.trim($('#fecha_f').val());
        //usar el fondo de AJAX para el tratamiento de datos
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { id_d: id_d, id_p: id_p, descuento: descuento, fecha_i: fecha_i, fecha_f: fecha_f, opcion: opcion },
            success: function(data) {
                tablaDescuentos.ajax.reload(null, false);
            }
        });
        $('#modalDescuentos').modal('hide');
    });
    $('#btnnuevo').click(function() {
        id_d = null;
        $("#formDescuentos").trigger("reset"); //resetear o limpiar el formulario
        $(".modal-header").css("background-color", "#198754");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Ingresar nuevo producto");
        opcion = 11;
        $("#modalDescuentos").modal('show');
    });
    $(document).on("click", ".btnEditar", function() {
        fila = $(this).closest('tr');
        id_d = parseInt(fila.find('td:eq(0)').text());
        id_p = parseInt(fila.find('td:eq(1)').text());
        decuento = parseInt(fila.find('td:eq(2)').text());
        fecha_i = fila.find('td:eq(3)').text();
        fecha_f = fila.find('td:eq(4)').text();
        $("#seleccion").val(id_p);
        $("#id_d").val(id_d);
        $("#descuento").val(decuento);
        $("#fecha_i").val(fecha_i);
        $("#fecha_f").val(fecha_f);
        $(".modal-header").css("background-color", "#0d6efd");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Descuento");
        $("#btnGuardar").text("Editar Descuento");
        opcion = 12;
        $("#modalDescuentos").modal('show');
    });

    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        id_d = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 13;
        var confirmacion = confirm("Esta seguro de eliminar el registro " + id_d + "?");
        if (confirmacion) {
            $.ajax({
                url: "bd/solicitudes.php",
                type: "post",
                dataType: "json",
                data: { opcion: opcion, id_d: id_d },
                success: function() {
                    tablaDescuentos.row(fila).parents('tr').remove().draw();
                }
            });
            tablaDescuentos.ajax.reload(null, false);
        }
    });
})