$(document).ready(function() {
    var opcion = 1,
        id_rol = 3;

    $("#formInicioSesion").submit(function(e) {
        e.preventDefault();
        let user = $.trim($("#user").val());
        let password = $.trim($("#password").val());
        $.ajax({
            url: './conexion/login.php',
            type: 'POST',
            dataType: 'json',
            data: { user: user, password: password },
            success: function(data) {
                if (data == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario y contraseña incorrectos',
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: `Bienvenido ${data[0].nombre}`,
                        confirmButtonText: 'OK',
                    }).then((result) => {
                        if (result.value) {
                            window.location.href = 'inicio.php';
                        }
                    })
                }
            }
        });
    });

    $("#formRegistrarse").submit(function(e) {
        e.preventDefault();
        let nombre_r = $.trim($("#nombre_r").val());
        let correo_r = $.trim($("#correo_r").val());
        let tel_r = $.trim($("#tel_r").val());
        let password_r = $.trim($("#password_r").val());
        let fechanac_r = $.trim($("#fechanac_r").val());
        let direccion_r = $.trim($("#direccion_r").val());
        console.log(opcion, id_rol, fechanac_r);
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
                console.log("Hola estoy aca entre " + correo_r);
                $.ajax({
                    url: './conexion/crud_usuario.php',
                    type: 'POST',
                    dataType: 'json',
                    data: { nombre_r: nombre_r, correo_r: correo_r, tel_r: tel_r, password_r: password_r, fechanac_r, fechanac_r, direccion_r: direccion_r, opcion: opcion, id_rol: id_rol },
                    success: function(data) {
                        if (data == null) {
                            $("#modalRegistrarse").modal('hide');
                            Swal.fire({
                                icon: 'success',
                                title: `Usuario ${nombre_r} registrado con exito`,
                                confirmButtonText: 'OK',
                            }).then((result) => {
                                if (result.value) {
                                    window.location.href = 'inicio.php';
                                }
                            })
                        } else {
                            Swal.fire({
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


    $("#btnInicioSesion").click(function() {
        $("#formInicioSesion").trigger("reset");
        $("#modalInicioSesion").modal('show');
    });

    $("#btnRegistrarse").click(() => {
        opcion = 1;
        id_rol = 3;
        $("#formRegistrarse").trigger("reset");
        $("#modalRegistrarse").modal('show');
    })

    $("#btnSalirSesion").click(function() {
        Swal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesion!'
        }).then((result) => {
            window.location.href = './conexion/logout.php';
        })
    })


})