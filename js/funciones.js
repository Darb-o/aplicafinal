$(document).ready(function() {
    var opcion = 1,
        id_rol = 3;

    //inicio sesion

    $("#formInicioSesion").submit(function(e) {
        opcion = 1;
        e.preventDefault();
        let user = $.trim($("#user").val());
        let password = $.trim($("#password").val());
        $.ajax({
            url: './bd/sesiones.php',
            type: 'POST',
            dataType: 'json',
            data: { user: user, password: password, opcion: opcion },
            success: function(data) {
                if (data == null) {
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
                        icon: 'error',
                        title: 'Usuario o contraseña incorrectos'
                    })
                } else {
                    opcion = data[0].id_rol;
                    if (opcion != 3) {
                        window.location.href = 'god.php';
                    } else {
                        window.location.href = 'inicio.php';
                    }
                }
            }
        });
    });

    $("#btnInicioSesion").click(function() {
        $(".modal-header").css("background-color", "#D72347");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Iniciar sesion");
        $("#formInicioSesion").trigger("reset");
        $("#modalInicioSesion").modal('show');
    });

    $("#btnRecuperar").click(function() {
        opcion = 6;
        (async() => {
            const { value: correo } = await Swal.fire({
                title: 'Recuperacion de contraseña',
                input: 'email',
                inputLabel: 'Por favor escriba su correo',
                inputPlaceholder: 'correo electronico',
                inputAttributes: {
                    maxlength: 100,
                    autocapitalize: 'off',
                    autocorrect: 'off',
                    required: true
                }
            })
            if (correo.length > 0) {
                $.ajax({
                    url: './bd/crud_usuario.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { correo_r: correo, opcion: opcion },
                    success: function(data) {
                        if (data != null) {
                            (async() => {
                                const { value: respuesta } = await Swal.fire({
                                    title: 'Responda la pregunta',
                                    input: 'text',
                                    inputLabel: `${data[0].descripcion}`,
                                    inputPlaceholder: 'escriba su respuesta',
                                    inputAttributes: {
                                        maxlength: 100,
                                        autocapitalize: 'off',
                                        autocorrect: 'off',
                                        required: true
                                    }
                                })
                                if (respuesta.length > 0) {
                                    (async() => {
                                        const { value: newclave } = await Swal.fire({
                                            title: 'Nueva contraseña',
                                            input: 'password',
                                            inputLabel: 'por favor, escriba su nueva contraseña',
                                            inputPlaceholder: 'digite contraseña',
                                            inputAttributes: {
                                                maxlength: 100,
                                                autocapitalize: 'off',
                                                autocorrect: 'off',
                                                required: true,
                                            }
                                        })
                                        if (newclave.length > 0) {
                                            opcion = 5;
                                            $.ajax({
                                                url: './bd/crud_usuario.php',
                                                type: 'POST',
                                                dataType: 'json',
                                                data: { correo_r: data[0].correo, password_r: newclave, opcion: opcion },
                                            })
                                            const Toast = Swal.mixin({
                                                toast: true,
                                                position: 'top',
                                                showConfirmButton: false,
                                                timer: 5000,
                                                timerProgressBar: true,
                                                didOpen: (toast) => {
                                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                                }
                                            })
                                            Toast.fire({
                                                icon: 'success',
                                                title: 'contraseña cambiada',
                                            })
                                        }
                                    })()
                                } else {
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: 'top',
                                        showConfirmButton: false,
                                        timer: 5000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.addEventListener('mouseenter', Swal.stopTimer)
                                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                                        }
                                    })
                                    Toast.fire({
                                        icon: 'error',
                                        title: 'Respuesta incorrecta',
                                    })
                                }
                            })()

                        } else {
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
                                icon: 'error',
                                title: 'usuario no registrada en el sistema',
                                text: 'verifique su correo',
                            })
                        }
                    }
                })
            }
        })()
    });

    //registro usuario

    $("#formRegistrarse").submit(function(e) {
        e.preventDefault();
        let nombre_r = $.trim($("#nombre_r").val());
        let correo_r = $.trim($("#correo_r").val());
        let tel_r = $.trim($("#tel_r").val());
        let password_r = $.trim($("#password_r").val());
        let fechanac_r = $.trim($("#fechanac_r").val());
        let direccion_r = $.trim($("#direccion_r").val());
        let idpregunta = $.trim($("#selectPregunta").val());
        let respuesta = $.trim($("#respuesta").val());
        Swal.fire({
            title: 'Confirmar datos',
            text: `Nombre: ${nombre_r}, Correo: ${correo_r}, 
            Telefono: ${tel_r}, Fecha: ${fechanac_r},
            Direccion: ${direccion_r}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Registrame!'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: './bd/crud_usuario.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { nombre_r: nombre_r, correo_r: correo_r, tel_r: tel_r, password_r: password_r, fechanac_r, fechanac_r, direccion_r: direccion_r, opcion: opcion, id_rol: id_rol, idpregunta: idpregunta, respuesta: respuesta },
                    success: function(data) {
                        if (data == null) {
                            $("#modalRegistrarse").modal('hide');
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'success',
                                title: `Usuario ${nombre_r} registrado con exito`
                            })
                        } else {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top',
                                showConfirmButton: false,
                                timer: 5000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'error',
                                title: 'Correo ya registrado',
                                text: 'El usuario ya esta registrado, acceda con su cuenta o verifique los datos',
                            })
                        }
                    }
                });
            }
        })
    });

    $("#btnRegistrarse").click(() => {
        opcion = 1;
        id_rol = 3;
        $(".modal-header").css("background-color", "#D72347");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Registrar usuario");
        $("#formRegistrarse").trigger("reset");
        $("#modalRegistrarse").modal('show');
    })

    $("#btnRegistrarEmpleado").click(() => {
        opcion = 1;
        id_rol = 2;
        $("#formRegistrarse").trigger("reset");
        $(".modal-header").css("background-color", "#2E54F1");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Registrar empleado");
        $("#modalRegistrarse").modal('show');
    })

    $("#btnRegistrarAdmin").click(() => {
        opcion = 1;
        id_rol = 1;
        $(".modal-header").css("background-color", "#2E54F1");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Registrar Administrador");
        $("#formRegistrarse").trigger("reset");
        $("#modalRegistrarse").modal('show');
    })

    $("#btnSalirSesion").click(function(e) {
        opcion = 2;
        e.preventDefault();
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
            }
        })
    })

    //Mi perfil opciones

    $("#btnPerfil").click(() => {
        opcion = 3;
        $.ajax({
            url: './bd/sesiones.php',
            type: 'POST',
            dataType: 'json',
            data: { opcion: opcion },
            success: function(data) {
                $("#nom_edit").val(data[0].nombre);
                $("#tel_edit").val(data[0].telefono);
                $("#correo_edit").val(data[0].correo);
                $("#fecha_edit").val(data[0].fecha_nac);
                $("#direccion_edit").val(data[0].direccion);
            }
        })
        $(".modal-header").css("background-color", "#D72347");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Editar perfil");
        $("#modalEditarPerfil").modal('show');
        $("#nom_edit").prop('disabled', true);
        $("#tel_edit").prop('disabled', true);
        $("#correo_edit").prop('disabled', true);
        $("#fecha_edit").prop('disabled', true);
        $("#direccion_edit").prop('disabled', true);
        $("#password_edit").prop('disabled', true);
    });

    $("#formEditarPerfil").submit(function(e) {
        opcion = 3;
        let nombre = $.trim($("#nom_edit").val());
        let telefono = $.trim($("#tel_edit").val());
        let fecha = $.trim($("#fecha_edit").val());
        let direccion = $.trim($("#direccion_edit").val());
        let correo = null;
        e.preventDefault();
        $.ajax({
            url: './bd/sesiones.php',
            type: 'POST',
            dataType: 'json',
            data: { opcion: opcion },
            success: function(data) {
                if ((nombre != data[0].nombre) || (telefono != data[0].telefono) || (fecha != data[0].fecha_nac) || (direccion != data[0].direccion)) {
                    correo = data[0].correo;
                    opcion = 2;
                    $.ajax({
                        url: './bd/crud_usuario.php',
                        type: 'POST',
                        dataType: 'json',
                        data: { nombre_r: nombre, correo_r: correo, tel_r: telefono, fechanac_r: fecha, direccion_r: direccion, opcion: opcion },
                        success: function(data) {
                            if (data != null) {
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
                                    title: 'Datos actualizados'
                                })
                                $("#modalEditarPerfil").modal('hide');
                                opcion = 5;
                                $.ajax({
                                    url: './bd/sesiones.php',
                                    type: 'POST',
                                    dataType: 'json',
                                    data: { nombre: nombre, telefono: telefono, fecha: fecha, direccion: direccion, opcion: opcion },
                                });
                                $("#nom_edit").prop('disabled', true);
                                $("#tel_edit").prop('disabled', true);
                                $("#fecha_edit").prop('disabled', true);
                                $("#direccion_edit").prop('disabled', true);
                            }
                        }
                    });
                } else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top',
                        showConfirmButton: false,
                        timer: 4000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                    Toast.fire({
                        icon: 'error',
                        title: 'No realizo ningun cambio'
                    })
                    $("#modalEditarPerfil").modal('hide');
                }
            }
        })
    });

    $("#btnCambioPassword").click(() => {
        let actual = null,
            nueva = null;
        (async() => {
            const { value: password } = await Swal.fire({
                title: 'Cambio contraseña',
                html: '<label>Contraseña actual</label>' +
                    '<input type="password" id="actual" class="swal2-input" required>' +
                    '<label>Nueva contraseña</label>' +
                    '<input type="password" id="nueva" class="swal2-input required">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        actual = $.trim($("#actual").val()),
                        nueva = $.trim($("#nueva").val()),
                    ]
                }
            })

            if (password) {
                opcion = 4;
                $.ajax({
                    url: './bd/sesiones.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { password: actual, opcion: opcion },
                    success: function(data) {
                        if (data != null) {
                            opcion = 5;
                            $.ajax({
                                url: './bd/crud_usuario.php',
                                type: 'POST',
                                dataType: 'json',
                                data: { correo_r: data[0].correo, password_r: nueva, opcion: opcion },
                            })
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
                                title: 'contraseña actualizada'
                            })
                        } else {
                            const Toast = Swal.mixin({
                                toast: true,
                                position: 'top',
                                showConfirmButton: false,
                                timer: 3000,
                                timerProgressBar: true,
                                background: '',
                                didOpen: (toast) => {
                                    toast.addEventListener('mouseenter', Swal.stopTimer)
                                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                                }
                            })
                            Toast.fire({
                                icon: 'error',
                                title: 'contraseña actual erronea'
                            })
                        }
                    }
                })
            }

        })()
    })

    $("#btnEditNombre").click(() => {
        if ($("#nom_edit").prop('disabled')) {
            $("#nom_edit").prop('disabled', false);
        } else {
            $("#nom_edit").prop('disabled', true);
        }
    })

    $("#btnEditTel").click(() => {
        if ($("#tel_edit").prop('disabled')) {
            $("#tel_edit").prop('disabled', false);
        } else {
            $("#tel_edit").prop('disabled', true);
        }
    })

    $("#btnEditCorreo").click(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No es posible ahorita mismo',
        })
    })

    $("#btnEditFecha").click(() => {
        if ($("#fecha_edit").prop('disabled')) {
            $("#fecha_edit").prop('disabled', false);
        } else {
            $("#fecha_edit").prop('disabled', true);
        }
    })

    $("#btnEditDireccion").click(() => {
        if ($("#direccion_edit").prop('disabled')) {
            $("#direccion_edit").prop('disabled', false);
        } else {
            $("#direccion_edit").prop('disabled', true);
        }
    })

    $("#btnProductos").click(() => {
        window.location.href = 'CRUD_Productos.php';
    })

    $("#btnPromociones").click(() => {
        window.location.href = 'CRUD_Promo.php';
    })

    $("#btnGrupo").click(() => {
        window.location.href = 'CRUD_grupoP.php';
    })


})