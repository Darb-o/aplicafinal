var opcion, id_d;
$(document).ready(function() {
    var today = new Date().toISOString().split('T')[0];
    /*document.getElementById("fecha_i").setAttribute('min', today);*/
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
    opcion = 38;
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
            { title: "Id", data: "id_descuento" },
            { title: "Producto", data: "nombre_produc" },
            { title: "Descuento %", data: "descuento" },
            { title: "Fecha inicio", data: "fecha_i" },
            { title: "Fecha final", data: "fecha_f" },
            { "defaultContent": "<div class='iconosTabla'><span class='btnEditar'><ion-icon name='create-outline'></ion-icon></span><span class='btnBorrar'><ion-icon name='trash-outline'></ion-icon></span></div>" }
        ]
    });
    var fila;

    $('#btnnuevo').click(function() {
        opcion = 37;
        let insercion = "";
        let captura;
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion },
            success: function(data) {
                if (data != null) {
                    (async() => {
                        const { value: formValues } = await Swal.fire({
                            title: 'Insertar nueva promocion',
                            html: `<label class="swal2-label">Seleccione un producto</label>
                            <select class="swal2-select" id="selectProducto" name="selectProducto" required></select>                          
                            <input type="number" id="canDescuento" name="canDescuento" placeholder="Descuento del producto" class="swal2-input number" required><br><br>
                            <label class="swal2-label">Fecha comienzo descuento</label><br>
                            <input type="date" id="fechaInicial" name="fechaInicial" class="swal2-input date" required><br><br>
                            <label class="swal2-label">Fecha termina descuento</label><br>
                            <input type="date" id="fechaFinal" name="fechaFinal" class="swal2-input date" required>`,
                            didOpen: () => {
                                captura = $("#selectProducto");
                                for (id in data) {
                                    insercion = `<option value="${data[id].id_producto}">${data[id].nombre_produc}</option>`
                                    captura.append(insercion);
                                }
                            },
                            preConfirm: () => {
                                return new Promise(function(resolve) {
                                    resolve([
                                        $("#selectProducto").val(),
                                        $("#canDescuento").val(),
                                        $("#fechaInicial").val(),
                                        $("#fechaFinal").val(),
                                    ]);
                                });
                            }
                        })

                        if (formValues) {
                            if (formValues[0] != "" && formValues[1] != "" && formValues[2] != "" && formValues[3] != "") {
                                if (formValues[2] > formValues[3]) {
                                    alerta('La fecha de inicio no puede ser mayor a la fecha final', 'error');
                                } else {
                                    opcion = 11;
                                    $.ajax({
                                        url: "bd/solicitudes.php",
                                        type: "POST",
                                        dataType: "json",
                                        data: { opcion: opcion, id_p: formValues[0], descuento: formValues[1], fecha_i: formValues[2], fecha_f: formValues[3] },
                                        success: function(data) {
                                            alerta('Promocion agregada con exito', 'success');
                                            tablaDescuentos.ajax.reload(null, false);
                                        }
                                    });
                                }
                            } else {
                                alerta('Algunos datos no se llenaron', 'error');
                            }
                        }
                    })()
                }
            }
        });
    });

    function alerta(mensaje, tipo) {
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
            icon: tipo,
            title: mensaje
        })
    }

    $(document).on("click", ".btnEditar", function() {
        fila = $(this).closest('tr');
        id_d = parseInt(fila.find('td:eq(0)').text());
        nombre = fila.find('td:eq(1)').text();
        descuento = parseInt(fila.find('td:eq(2)').text());
        fecha_i = fila.find('td:eq(3)').text();
        fecha_f = fila.find('td:eq(4)').text();
        (async() => {
            const { value: formValues } = await Swal.fire({
                title: `Editar promocion ${nombre}`,
                html: ` 
                <label class="swal2-label">Descuento</label><br>                         
                <input type="number" value="${descuento}" id="canDescuento" name="canDescuento" placeholder="Descuento del producto" class="swal2-input number" required><br><br>
                <label class="swal2-label">Fecha comienzo descuento</label><br>
                <input type="date" value="${fecha_i}" id="fechaInicial" name="fechaInicial" class="swal2-input date" required><br><br>
                <label class="swal2-label">Fecha termina descuento</label><br>
                <input type="date" value="${fecha_f}" id="fechaFinal" name="fechaFinal" class="swal2-input date" required>`,
                preConfirm: () => {
                    return new Promise(function(resolve) {
                        resolve([
                            $("#canDescuento").val(),
                            $("#fechaInicial").val(),
                            $("#fechaFinal").val(),
                        ]);
                    });
                }
            })

            if (formValues) {
                if (formValues[0] != "" && formValues[1] != "" && formValues[2]) {
                    if (formValues[1] > formValues[2]) {
                        alerta('La fecha de inicio no puede ser mayor a la fecha final', 'error');
                    } else if (formValues[0] == descuento && formValues[1] == fecha_i && formValues[2] == fecha_f) {
                        alerta('No realizo ningun cambio', 'warning');
                    } else {
                        opcion = 39;
                        $.ajax({
                            url: "bd/solicitudes.php",
                            type: "POST",
                            dataType: "json",
                            data: { opcion: opcion, id_d: id_d, descuento: formValues[0], fecha_i: formValues[1], fecha_f: formValues[2] },
                            success: function(data) {
                                alerta('Promocion agregada con exito', 'success');
                                tablaDescuentos.ajax.reload(null, false);
                            }
                        });
                    }
                } else {
                    alerta('No pueden existir datos vacios', 'error');
                }
            }
        })()
    });

    $(document).on("click", ".btnBorrar", function() {
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
                        tablaDescuentos.ajax.reload(null, false);
                        alerta('Promocion eliminada exitosamente', 'success');
                    }
                });
            }
        })
    });
})