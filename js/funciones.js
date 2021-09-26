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
                if (data == null) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario y contraseña incorrectos',
                    })
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Bienvenido',
                        confirmButtonText: 'Ingresar',
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
})