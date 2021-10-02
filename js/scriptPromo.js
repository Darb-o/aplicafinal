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
            { "defaultContent": "<div class='text-center'><div class='btn-group'><button id='btnEditar' type='button' class='btn btn-primary btn-sm mx-1'><i id='iconitos' class='bi bi-pen'></i>Editar descuento</button><button type='button' id='btnBorrar' class='btn btn-danger btn-sm'><i id='iconitos' class='bi bi-trash'></i>Borrar descuento</button></div></div>" }
        ]
    });
    var fila;
    $('#formDescuentos').submit(function(e) {
        let mensaje = "";
        if (opcion == 11) {
            mensaje = "agregado con exito";
        } else {
            mensaje = "actualizado con exito";
        }
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
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: `${mensaje}`
                })
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
        $("#btnGuardar").text("Guardar promocion");
        opcion = 11;
        $("#modalDescuentos").modal('show');
    });
    $(document).on("click", "#btnEditar", function() {
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
        $(".modal-title").text("Editar Promocion");
        $("#btnGuardar").text("Editar Promocion");
        opcion = 12;
        $("#modalDescuentos").modal('show');
    });

    $(document).on("click", "#btnBorrar", function() {
        fila = $(this);
        id_d = parseInt($(this).closest('tr').find('td:eq(0)').text());
        opcion = 13;
        Swal.fire({
            title: 'esta seguro de borrar?',
            text: "esta accion no se podra revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, borralo!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: "bd/solicitudes.php",
                    type: "post",
                    dataType: "json",
                    data: { opcion: opcion, id_d: id_d },
                    success: function() {
                        tablaDescuentos.row(fila).parents('tr').remove().draw();
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Borrado con exito'
                        })
                    }
                });
                tablaDescuentos.ajax.reload(null, false);
            }
        })
    });
})