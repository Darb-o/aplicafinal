$(document).ready(function() {
    mostrarCartas();
    datosCartas();
    llenarUsuarios();
    llenarOrdenes()
});

function mostrarCartas() {
    let cartas = `
    <div class="card">
        <div>
            <div id="ordenesNuevas" class="numbers"></div>
            <div class="cardName">Ordenes nuevas</div>
        </div>
        <div class="iconBx">
            <ion-icon name="receipt-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div id="ventas" class="numbers"></div>
            <div class="cardName">Ventas</div>
        </div>
        <div class="iconBx">
            <ion-icon name="cart-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div id="usuarios" class="numbers"></div>
            <div class="cardName">Usuarios registrados</div>
        </div>
        <div class="iconBx">
            <ion-icon name="people-circle-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div id="ganancias" class="numbers"></div>
            <div class="cardName">Ganancias</div>
        </div>
        <div class="iconBx">
            <ion-icon name="cash-outline"></ion-icon>
        </div>
    </div>`;
    $(".cardBox").append(cartas);
}

function llenarUsuarios() {
    let insercion = null;
    opcion = 7;
    $.ajax({
        url: './bd/crud_usuario.php',
        type: 'POST',
        dataType: 'json',
        data: { opcion: opcion },
        success: function(data) {
            if (data != null) {
                for (i in data) {
                    insercion = `
                    <tr>
                        <td><h4>${data[i].nombre}<br><span>${data[i].telefono} - ${data[i].correo}</span></h4></td>
                    </tr>`;
                    $(".tablaUsuarios").append(insercion);
                }

            }
        }
    })
}

function llenarOrdenes() {
    let insercion = null;
    let estado = "";
    let valorestado = "";
    let tipo = "";
    opcion = 25;
    $.ajax({
        url: './bd/peticiones.php',
        type: 'POST',
        dataType: 'json',
        data: { opcion: opcion },
        success: function(data) {
            if (data != null) {
                for (i in data) {
                    switch (data[i].estado_pedido) {
                        case "1":
                            estado = "estado pendiente";
                            valorestado = "Pendiente";
                            break;
                        case "2":
                            estado = "estado entregado";
                            valorestado = "Entregado";
                            break;
                        case "3":
                            estado = "estado progreso";
                            valorestado = "En progreso";
                            break;
                        case "4":
                            estado = "estado devuelto";
                            valorestado = "Devuelto";
                            break;
                    }
                    switch (data[i].tipo_pedido) {
                        case "1":
                            tipo = "Domicilio";
                            break;
                        case "2":
                            tipo = "Recoger";
                            break;
                        case "3":
                            tipo = "Caja";
                            break;
                    }
                    insercion = `
                    <tr>
                        <td>${data[i].id_factura}</td>
                        <td>${data[i].valor_total}</td>
                        <td>${tipo}</td>
                        <td>${data[i].fecha_pedido}</td>
                        <td><span class="${estado}">${valorestado}</span></td>
                    </tr>`;
                    $("#tablaOrdenesRecientes").append(insercion);
                }

            }
        }
    })
}

function datosCartas() {
    let fechaactual = moment().format('YYYY/MM/DD');
    let fechainicio = fechaactual + " 00:00:00";
    let fechafinal = fechaactual + " 23:59:59";
    let insercion = "";
    opcion = 26;
    $.ajax({
        url: './bd/peticiones.php',
        type: 'POST',
        dataType: 'json',
        data: { opcion: opcion, fecha_i: fechainicio, fecha_f: fechafinal },
        success: function(data) {
            insercion = data[0].total;
            console.log(data[0].total);
            $("#ordenesNuevas").append(insercion);
        }
    });

    opcion = 27;
    let fechatras = moment().subtract(1, 'month').calendar();
    fechatras = new Date(fechatras);
    fechatras = moment(fechatras).format('YYYY/MM/DD HH:mm');
    $.ajax({
        url: './bd/peticiones.php',
        type: 'POST',
        dataType: 'json',
        data: { opcion: opcion, fecha_i: fechatras, fecha_f: fechafinal },
        success: function(data) {
            insercion = data[0].total;
            console.log(data[0].total);
            $("#ventas").append(insercion);
        }
    })

    opcion = 28;
    $.ajax({
        url: './bd/peticiones.php',
        type: 'POST',
        dataType: 'json',
        data: { opcion: opcion },
        success: function(data) {
            insercion = data[0].total;
            console.log(data[0].total);
            $("#usuarios").append(insercion);
        }
    })

    opcion = 29;
    $.ajax({
        url: './bd/peticiones.php',
        type: 'POST',
        dataType: 'json',
        data: { opcion: opcion, fecha_i: fechatras, fecha_f: fechafinal },
        success: function(data) {
            if (data[0].total == null) {
                insercion = "$0";
            } else {
                insercion = "$" + data[0].total;
            }
            console.log(data[0].total);
            $("#ganancias").append(insercion);
        }
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