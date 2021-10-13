$(document).ready(function() {
    mostrarCartas();
    llenarUsuarios();
});

function mostrarCartas() {
    let cartas = `
    <div class="card">
        <div>
            <div class="numbers">1,504</div>
            <div class="cardName">Ordenes nuevas</div>
        </div>
        <div class="iconBx">
            <ion-icon name="receipt-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div class="numbers">80</div>
            <div class="cardName">Ventas</div>
        </div>
        <div class="iconBx">
            <ion-icon name="cart-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div class="numbers">284</div>
            <div class="cardName">Usuarios registrados</div>
        </div>
        <div class="iconBx">
            <ion-icon name="people-circle-outline"></ion-icon>
        </div>
    </div>
    <div class="card">
        <div>
            <div class="numbers">$8000</div>
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

$(document).on("click", ".irProductos", function(e) {
    e.preventDefault();
    $(location).attr('href', './CRUD_Productos.php');
});
$(document).on("click", ".irInterfaz", function(e) {
    e.preventDefault();
    $(location).attr('href', './god.php');
});