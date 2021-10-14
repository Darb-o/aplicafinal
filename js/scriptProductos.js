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
            { "data": "estado_producto" },
            { "data": "grupo" },
            { "defaultContent": "<div class='iconosTabla'><span class='btnVerImagen'><ion-icon name='image-outline'></ion-icon></span><span class='btnEditar'><ion-icon name='create-outline'></ion-icon></span><span class='btnCambiar'><ion-icon name='swap-horizontal-outline'></ion-icon></span><span class='btnBorrar'><ion-icon name='trash-outline'></ion-icon></span></div>" }
        ]
    });
    var fila;

    $('#btnnuevo').click(function() {
        let insercion = "";
        let captura;
        opcion = 9;
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion },
            success: function(data) {
                if (data != null) {
                    (async() => {
                        const { value: formValues } = await Swal.fire({
                            title: 'Insertar nuevo producto',
                            html: `<form class="" method="POST" enctype="multipart/form-data" id="formInsertarProducto"> <label class="swal2-label">Seleccione un producto de la lista</label>
                            <select class="swal2-select" id="selectGrupo" name="selectGrupo" required></select>                          
                            <input id="nombrePro" name="nombrePro" placeholder="Nombre del producto" class="swal2-input" required>
                            <input type="number" id="precioPro" name="precioPro" placeholder="Precio del producto" class="swal2-input" required>
                            <input id="desPro" name="desPro" placeholder="Descripcion del producto" class="swal2-input" required>
                            <input id="opcion" value="34" type="hidden" name="opcion">
                            <input type="file" id="imgPro" name="imgPro" placeholder="Imagen del producto" class="swal2-input file" required></form>`,
                            didOpen: () => {
                                captura = $("#selectGrupo");
                                for (id in data) {
                                    insercion = `<option value="${data[id].id_grupo}">${data[id].nombre_grupo}</option>`
                                    captura.append(insercion);
                                }
                            },

                            preConfirm: () => {
                                return new Promise(function(resolve) {
                                    resolve([
                                        $("#selectGrupo").val(),
                                        $("#nombrePro").val(),
                                        $("#precioPro").val(),
                                        $("#desPro").val(),
                                        $("#imgPro").val(),
                                    ]);
                                });
                            }
                        })

                        if (formValues) {
                            if (formValues[0] == "" || formValues[1] == "" || formValues[2] == "" || formValues[3] == "" || formValues[4] == "") {
                                alerta('No pueden haber campos vacios, faltan datos por ingresar', 'error');
                            } else {
                                let valores = document.getElementById('formInsertarProducto');
                                let datos = new FormData(valores);
                                $.ajax({
                                    url: './bd/solicitudes.php',
                                    type: 'POST',
                                    contentType: false,
                                    processData: false,
                                    data: datos,
                                    success: function(data) {
                                        if (data == null) {
                                            alerta('Producto insertado exitosamente', 'success');
                                        } else {
                                            alerta(data, 'error');
                                        }
                                        tablaProductos.ajax.reload(null, false);
                                    }
                                });
                            }
                        }
                    })()

                }
            }
        });
    });

    $(document).on("click", ".btnVerImagen", function() {
        opcion = 35;
        fila = $(this).closest('tr');
        id_p = parseInt(fila.find('td:eq(0)').text());
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, id_p: id_p },
            success: function(data) {
                console.log(data[0].img);
                Swal.fire({
                    title: `${data[0].nombre_produc}`,
                    imageUrl: `http://localhost/aplicafinal/img/${data[0].img}`,
                    imageWidth: 300,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                })
            }
        });

    });

    $(document).on("click", ".btnEditar", function() {
        fila = $(this).closest('tr');
        id_p = parseInt(fila.find('td:eq(0)').text());
        console.log(id_p);
        nom_p = fila.find('td:eq(1)').text();
        precio = parseInt((fila.find('td:eq(2)').text()));
        desc = fila.find('td:eq(3)').text();
        grupo = parseInt(fila.find('td:eq(5)').text());
        opcion = 9;
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
                            title: 'Insertar nuevo producto',
                            html: `<form class="" method="POST" enctype="multipart/form-data" id="formEditarProducto"> <label class="swal2-label">Seleccione un producto</label>
                            <select class="swal2-select" id="selectGrupo" name="selectGrupo" required></select>                          
                            <input id="nombrePro" value="${nom_p}" name="nombrePro" placeholder="Nombre del producto" class="swal2-input" required>
                            <input type="number" value="${precio}" id="precioPro" name="precioPro" placeholder="Precio del producto" class="swal2-input" required>
                            <input id="desPro" value="${desc}" name="desPro" placeholder="Descripcion del producto" class="swal2-input" required>
                            <input id="opcion" value="36" type="hidden" name="opcion">
                            <input id="idProducto" value="${id_p}" type="hidden" name="idProducto">
                            <input type="file" id="imgPro" name="imgPro" placeholder="Imagen del producto" class="swal2-input file" required></form>`,
                            didOpen: () => {
                                captura = $("#selectGrupo");
                                for (id in data) {
                                    insercion = `<option value="${data[id].id_grupo}">${data[id].nombre_grupo}</option>`
                                    captura.append(insercion);
                                }
                            },

                            preConfirm: () => {
                                return new Promise(function(resolve) {
                                    resolve([
                                        $("#selectGrupo").val(),
                                        $("#nombrePro").val(),
                                        $("#precioPro").val(),
                                        $("#desPro").val(),
                                        $("#imgPro").val(),
                                    ]);
                                });
                            }
                        })

                        if (formValues) {
                            if (formValues[0] == "" || formValues[1] == "" || formValues[2] == "" || formValues[3] == "") {
                                alerta('No pueden existir campos vacios', 'error');
                            } else {
                                let valores = document.getElementById('formEditarProducto');
                                let datos = new FormData(valores);
                                $.ajax({
                                    url: './bd/solicitudes.php',
                                    type: 'POST',
                                    contentType: false,
                                    processData: false,
                                    data: datos,
                                    success: function(data) {
                                        console.log("Esto es data" + data);
                                        if (data != null) {
                                            alerta(data, 'error');
                                        } else {
                                            alerta('Producto editado exitosamente', 'success');
                                        }
                                        tablaProductos.ajax.reload(null, false);
                                    }
                                });
                            }

                        }
                    })()

                }
            }
        });
    });

    $(document).on("click", ".btnCambiar", function() {
        fila = $(this).closest('tr');
        id_p = parseInt(fila.find('td:eq(0)').text());
        estado = parseInt(fila.find('td:eq(4)').text());
        if (estado == 1) {
            estado = 0;
        } else {
            estado = 1;
        }
        opcion = 10;
        $.ajax({
            url: "bd/solicitudes.php",
            type: "post",
            dataType: "json",
            data: { opcion: opcion, id_p: id_p, estado: estado },
            success: function() {
                tablaProductos.ajax.reload(null, false);
                alerta('Estado del producto actualizado', 'success');
            }
        });
        tablaProductos.ajax.reload(null, false);
    });

    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        id_p = parseInt($(this).closest('tr').find('td:eq(0)').text());
        console.log(id_p);
        opcion = 7;
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
                    data: { opcion: opcion, id_p: id_p },
                    success: function() {
                        console.log("satisfactorio perro");
                        tablaProductos.ajax.reload(null, false);
                        alerta('Producto borrado exitosamente', 'success');
                    }
                });
            }
        })
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
})