var fila;
var opcion, id;
$(document).ready(function() {
    opcion = 4;
    tablaGrupos = $('#tablaGrupos').DataTable({
        "ajax": {
            "url": "./bd/solicitudes.php",
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
            { "data": "id_grupo" },
            { "data": "nombre_grupo" },
            { "data": "descripcion_grupo" },
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btn-sm btnEditar'>EDITAR PRODUCTO<span class='material-icons-outlined'>edit</span></button><button class='btn btn-danger btn-sm btnBorrar'>BORRAR PRODUCTO<span class='material-icons-outlined'>delete</span></button></div></div>" }
        ]
    });

    $('#formGrupoP').submit(function(e) {
        e.preventDefault(); //evitar la funcion del submit para recargar la pagina
        nombre_g = $.trim($('#nombre_grupo').val());
        descripcion_g = $.trim($('#descripcion_grupo').val());
        $.ajax({
            url: "./bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { id_grupo: id, nombre_grupo: nombre_g, descripcion_grupo: descripcion_g, opcion: opcion },
            success: function(data) {
                if (data != null) {
                    tablaGrupos.ajax.reload();
                }
            }
        });
        $('#modalGProductos').modal('hide');
    });

    $('#btnnuevo').click(function() {
        opcion = 1;
        id = null;
        $("#formGrupoP").trigger("reset"); //resetear o limpiar el formulario
        $(".modal-header").css("background-color", "#198754");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Ingresar nuevo grupo");
        $("#btnGuardar").text("Guardar Grupo");
        $("#modalGProductos").modal('show');
    });

    $(document).on("click", ".btnEditar", function() {
        opcion = 2;
        fila = $(this).closest('tr');
        id = parseInt(fila.find('td:eq(0)').text());
        nombre_g = fila.find('td:eq(1)').text();
        descripcion_g = (fila.find('td:eq(2)').text());
        $("#nombre_grupo").val(nombre_g);
        $("#descripcion_grupo").val(descripcion_g);
        $(".modal-header").css("background-color", "#0d6efd");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar Grupo");
        $("#btnGuardar").text("Editar Grupo");
        $("#modalGProductos").modal('show');
    });

    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        console.log(id);
        opcion = 3;
        var confirmacion = confirm("Esta seguro de eliminar el registro " + id + "?");
        if (confirmacion) {
            $.ajax({
                url: "./bd/solicitudes.php",
                type: "post",
                dataType: "json",
                data: { opcion: opcion, id_grupo: id },
                success: function() {
                    tablaGrupos.ajax.reload(null, false);
                }
            });

        }
    })
});