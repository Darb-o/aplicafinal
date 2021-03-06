var fila;
var opcion, id;
$(document).ready(function() {
    opcion = 1;
    tablaGrupos = $('#tablaGrupos').DataTable({
        "ajax": {
            "url": "./bd/peticiones.php",
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
            { "defaultContent": "<div class='iconosTabla'><span class='btnEditar'><ion-icon name='create-outline'></ion-icon></span><span class='btnBorrar'><ion-icon name='trash-outline'></ion-icon></span></div>" }
        ]
    });

    $('#btnnuevo').click(function() {
        (async() => {
            const { value: formValues } = await Swal.fire({
                title: 'Insertar nuevo grupo',
                html: `<label class="swal2-label">Nombre del grupo</label><br>                       
                <input type="text" id="nomGrupo" name="nomGrupo" placeholder="Nombre del grupo" class="swal2-input" required><br><br>
                <label class="swal2-label">Descripcion del grupo</label><br>
                <input type="text" id="desGrupo" name="desGrupo" placeholder="Descripcion del grupo" class="swal2-input" required><br><br>`,
                preConfirm: () => {
                    return new Promise(function(resolve) {
                        resolve([
                            $("#nomGrupo").val(),
                            $("#desGrupo").val(),
                        ]);
                    });
                }
            })

            if (formValues) {
                if (formValues[0] != "" && formValues[1] != "") {
                    opcion = 2;
                    $.ajax({
                        url: "bd/peticiones.php",
                        type: "POST",
                        dataType: "json",
                        data: { opcion: opcion, nombre_grupo: formValues[0], descripcion_grupo: formValues[1] },
                        success: function(data) {
                            alerta('Grupo de productos agregado con exito', 'success');
                            tablaGrupos.ajax.reload(null, false);
                        }
                    });
                } else {
                    alerta('Algunos datos no se llenaron', 'error');
                }
            }
        })()
    });

    $(document).on("click", ".btnEditar", function() {
        fila = $(this).closest('tr');
        id = parseInt(fila.find('td:eq(0)').text());
        nombre_g = fila.find('td:eq(1)').text();
        descripcion_g = (fila.find('td:eq(2)').text());
        (async() => {
            const { value: formValues } = await Swal.fire({
                title: `Editar grupo ${nombre_g}`,
                html: `<label class="swal2-label">Nombre del grupo</label><br>                        
                <input type="text" value="${nombre_g}" id="nomGrupo" name="nomGrupo" placeholder="Nombre del grupo" class="swal2-input" required><br><br>
                <label class="swal2-label">Descripcion del grupo</label><br>
                <input type="text" value="${descripcion_g}" id="desGrupo" name="desGrupo" placeholder="Descripcion del grupo" class="swal2-input" required><br><br>`,
                preConfirm: () => {
                    return new Promise(function(resolve) {
                        resolve([
                            $("#nomGrupo").val(),
                            $("#desGrupo").val(),
                        ]);
                    });
                }
            })
            if (formValues) {
                if (formValues[0] != "" && formValues[1] != "") {
                    if (formValues[0] == nombre_g && formValues[1] == descripcion_g) {
                        alerta('No se registraron cambios', 'warning');
                    } else {
                        opcion = 3;
                        $.ajax({
                            url: "bd/peticiones.php",
                            type: "POST",
                            dataType: "json",
                            data: { opcion: opcion, id_grupo: id, nombre_grupo: formValues[0], descripcion_grupo: formValues[1] },
                            success: function(data) {
                                alerta('Grupo de productos editado con exito', 'success');
                                tablaGrupos.ajax.reload(null, false);
                            }
                        });
                    }
                } else {
                    alerta('Algunos datos no se llenaron', 'error');
                }
            }
        })()
    });

    $(document).on("click", ".btnBorrar", function() {
        fila = $(this);
        id = parseInt($(this).closest('tr').find('td:eq(0)').text());
        console.log(id);
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
                opcion = 4;
                $.ajax({
                    url: "./bd/peticiones.php",
                    type: "post",
                    dataType: "json",
                    data: { opcion: opcion, id_grupo: id },
                    success: function() {
                        tablaGrupos.ajax.reload(null, false);
                        alerta('Grupo borrado con exito', 'success');
                    }
                });
            }
        })
    })

    function alerta(mensaje, tipo) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 3500,
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
});