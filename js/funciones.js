$(document).ready(function() {
    $("#formInicioSesion").submit(function(e) {
        e.preventDefault();
        var user = $.trim($("#user").val());
        var password = $.trim($("#password").val());
        console.log(user, password);
        $.ajax({
            url: './conexion/login.php',
            type: 'POST',
            dataType: 'json',
            data: { user: user, password: password },
            success: function(data) {
                console.log(data);
                console.log(data[0].nombre);
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

    $("#btnInicioSesion").click(function() {
        $("#formInicioSesion").trigger("reset");
        $("#modalInicioSesion").modal('show');
    });

    $("#btnSalirSesion").click(function() {
        Swal.fire({
            title: 'Estas seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, cerrar sesion!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Adios!',
                    'Tu sesion ha sido cerrada.',
                    'success'
                )
                window.location.href = './conexion/logout.php';
            }
        })
    })
})