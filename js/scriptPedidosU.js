var opcion;
var productos = new Array();
var productosdescuento = new Array();
$(document).ready(function() {
    opcion = 5;
    $.ajax({
        url: "./bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                const arreglo = {
                    idproducto: data[i].id_producto,
                    descuento: data[i].descuento
                };
                productosdescuento.push(arreglo);
            }
            fillGrupo();
        }

    });
});

function fillGrupo() {
    let at = document.getElementById('contentCard');
    opcion = 6;
    $.ajax({
        url: "bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (i in data) {
                at.insertAdjacentHTML('beforeend', "<div class='row' id='" + data[i].id_grupo + "'><p class='fs-2'>" + data[i].nombre_grupo + "</p></div>");
                fillCards(data[i].id_grupo);
            }
        }
    });
}

function fillCards(grupo) {
    let att = document.getElementById("" + grupo);
    opcion = 7;
    let bandera = true;
    let precio = 0;
    let descuento = 0;
    let insercion = null;
    $.ajax({
        url: "bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, grupo: grupo },
        success: function(data) {
            for (i in data) {
                bandera = true;
                descuento = 0;
                precio = data[i].precio;
                for (j in productosdescuento) {
                    if (data[i].id_producto == productosdescuento[j].idproducto) {
                        bandera = false;
                        descuento = productosdescuento[j].descuento;
                        precio = data[i].precio - (data[i].precio * descuento) / 100;
                        insercion = `<div class="col-12 col-md-3 col-sm-4 col-lg-2">
                        <div class="card" >
                        <div class="producto" id="${data[i].id_producto}">
                            <div class="iconodescuento">       
                                <span class="material-icons">local_offer</span>
                                <h2 class"valordescuentoicono">${descuento}%</h2>
                            </div>
                            <div class="preciosubrayado">$${data[i].precio}</div>
                            <div class="imgbox">
                                <img src="./img/${data[i].img}" alt="">
                            </div>
                            <div class="detalle">
                                <h2>${data[i].nombre_produc}<br><span>${data[i].descripcion}</span></h2>
                                <div class="precio">$${precio}</div>
                                <a type="button" class="botonMenos" role="button"><i class="bi bi-file-minus-fill"></i></a>
                                <input type="number" class="inputcantidad" value="1" min="1" max="50">
                                <a type="button" class="botonMas" role="button"><i class="bi bi-file-plus-fill"></i></a>        
                                <a type="button" class="botonañadircarrito" role="button">Añadir carrito</a>
                            </div>           
                        </div>
                        </div>
                        </div>`;
                        att.insertAdjacentHTML('beforeend', insercion);
                        break;
                    }
                }
                if (bandera) {
                    insercion = `<div class="col-12 col-md-3 col-sm-4 col-lg-2">
                    <div class="card">
                        <div class="producto" id="${data[i].id_producto}">
                            <div class="imgbox">
                                <img src="./img/${data[i].img}" alt="">
                            </div>
                            <div class="detalle">
                                <h2>${data[i].nombre_produc}<br><span>${data[i].descripcion}</span></h2>
                                <div class="precio">$${data[i].precio}</div>
                                <a type="button" class="botonMenos" role="button"><i class="bi bi-file-minus-fill"></i></a>
                                <input type="number" class="inputcantidad" value="1" min="1" max="50">
                                <a type="button" class="botonMas" role="button"><i class="bi bi-file-plus-fill"></i></a>        
                                <a type="button" class="botonañadircarrito" role="button">Añadir carrito</a>
                            </div>           
                        </div>
                        </div>
                        </div>`;
                    att.insertAdjacentHTML('beforeend', insercion);
                }
                let vector = {
                    id: data[i].id_producto,
                    nombre: data[i].nombre_produc,
                    descripcion: data[i].descripcion,
                    precio: precio,
                    descuento: descuento
                };
                productos.push(vector);
            }
        }
    });
}

$(document).on("click", ".botonMas", function() {
    let input = $(this).prev();
    numero = parseInt(input.val()) + 1;
    input.val(numero);
});

$(document).on("click", ".botonMenos", function() {
    let input = $(this).next();
    numero = parseInt(input.val()) - 1;
    if (numero > 0) {
        input.val(numero);
    }
});

$(document).on("click", ".botonañadircarrito", function() {
    let id = $(this).closest(".producto").attr("id");
    let unoatras = $(this).prev();
    let unidades = $(unoatras).prev().val();
    let producto = productos.find(i => i.id == id);
    opcion = 6;
    $.ajax({
        url: "bd/sesiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            opcion = 12;
            if (data != null) {
                $.ajax({
                    url: "bd/peticiones.php",
                    type: "POST",
                    dataType: "json",
                    data: { opcion: opcion, id_p: producto.id, nom_p: producto.nombre, desc: producto.descripcion, precio: producto.precio, descuento: producto.descuento, unidades: unidades },
                    success: function(data) {
                        alerta('Producto agregado a tu carrito', 'success');
                    }
                });
            } else {
                $("#modalInicioSesion").modal('show');
            }
        }
    });

});

$("#btnMenuCarro").click(function(e) {
    opcion = 6
    $.ajax({
        url: "bd/sesiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            opcion = 13;
            if (data != null) {
                tablaCarrito = $('#tablaCarrito').DataTable({
                    destroy: true,
                    ajax: {
                        url: "bd/peticiones.php",
                        method: "POST",
                        data: { opcion: opcion },
                        dataSrc: "",
                    },
                    language: {
                        sProcessing: "Procesando...",
                        sLengthMenu: "Mostrar _MENU_ registros",
                        sZeroRecords: "No se encontraron resultados",
                        sEmptyTable: "Ningún dato disponible en esta tabla",
                        sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                        sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                        sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                        sInfoPostFix: "",
                        sSearch: "Buscar:",
                        sUrl: "",
                        sInfoThousands: ",",
                        sLoadingRecords: "Cargando...",
                        oPaginate: {
                            sFirst: "Primero",
                            sLast: "Último",
                            sNext: "Siguiente",
                            sPrevious: "Anterior"
                        },
                        oAria: {
                            sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                            sSortDescending: ": Activar para ordenar la columna de manera descendente"
                        }
                    },
                    columns: [
                        { title: "Id", data: "idproducto" },
                        { title: "Producto", data: "nombreproducto" },
                        { title: "Descuento", data: "descuento" },
                        { title: "Cantidad", data: "unidades" },
                        { title: "Precio", data: "precio" },
                        { title: "Subtotal", data: "subtotal" },
                        { "defaultContent": `<div class='text-center'>
                        <div class='btn-group' id='botoneslistacarrito'>           
                            <a type='button' role='button' id='btnRestarCarrito'><i class='bi bi-file-minus-fill'></i></a>                    
                            <a type='button' role='button' id='btnEliminarCarrito'><i class='bi bi-file-x-fill'></i></a>
                            <a type='button' role='button' id='btnSumarCarrito' ><i class='bi bi-file-plus-fill'></i></a></div></div>` }
                    ]
                });
                cambiarvalortotal();
                $("#modalCarrito").modal('show');
            } else {
                $(".modal-header").css("background-color", "#D72347");
                $(".modal-header").css("color", "white");
                $("#modalInicioSesion").modal('show');
            }
        }
    });
});

function cambiarvalortotal() {
    opcion = 8;
    $.ajax({
        url: "bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            if (data != null) {
                $(".valortotal").val("Valor total: $" + data);
            }
        }
    });
}

$(document).on("click", "#btnRestarCarrito", function() {
    fila = $(this).closest('tr');
    idp = parseInt(fila.find('td:eq(0)').text());
    unidades = parseInt(fila.find('td:eq(3)').text());
    unidades -= 1;
    if (unidades == 0) {
        unidades = 1;
    }
    opcion = 9;
    $.ajax({
        url: "bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_p: idp, unidades: unidades },
        success: function(data) {
            if (data != null) {
                tablaCarrito.ajax.reload(null, false);
            }
        }
    });
    cambiarvalortotal();
});

$(document).on("click", "#btnSumarCarrito", function() {
    fila = $(this).closest('tr');
    idp = parseInt(fila.find('td:eq(0)').text());
    unidades = parseInt(fila.find('td:eq(3)').text());
    unidades += 1;
    opcion = 9;
    $.ajax({
        url: "bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_p: idp, unidades: unidades },
        success: function(data) {
            if (data != null) {
                tablaCarrito.ajax.reload(null, false);
            }
        }
    });
    cambiarvalortotal();
});

$(document).on("click", "#btnEliminarCarrito", function() {
    fila = $(this).closest('tr');
    idp = parseInt(fila.find('td:eq(0)').text());
    opcion = 10;
    $.ajax({
        url: "bd/peticiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_p: idp },
        success: function(data) {
            if (data != null) {
                tablaCarrito.ajax.reload(null, false);
            }
        }
    });
    cambiarvalortotal();
});

$("#btnComprar").click(function() {
    let cantidadfilas = tablaCarrito.rows().count();
    if (cantidadfilas > 0) {
        $("#modalCarrito").modal('hide');
        $("#direccionDomicilio").hide();
        $("#horaRecoger").hide();
        $("#btngenerarCompraDomicilio").hide();
        $("#btngenerarCompraEnPersona").hide();
        $("#modalCompra").modal('show');
    } else {
        alerta('El carrito no cuenta con ningun producto', 'warning');
    }
})

$("#btnAdomicilio").click(function() {
    $("#direccionDomicilio").show();
    $("#compraDireccion").prop('required', true);
    traerDireccion();
    $("#compraHora").prop('required', false);
    $("#horaRecoger").hide();
    $("#btngenerarCompraDomicilio").show();
    $("#btngenerarCompraEnPersona").hide();
})

$("#btnRecogerPersona").click(function() {
    $("#horaRecoger").show();
    $("#compraHora").prop('required', true);
    $("#compraDireccion").prop('required', false);
    $("#direccionDomicilio").hide();
    $("#btngenerarCompraEnPersona").show();
    $("#btngenerarCompraDomicilio").hide();
})

$("#btnCerrarModal").click(function() {
    $("#modalCarrito").modal('show');
})

$("#compraAdomicilio").submit(function(e) {
    e.preventDefault();
    let fechaactual = moment().format('YYYY/MM/DD HH:mm');
    let direccion = $("#compraDireccion").val();
    let tipoPedido = 1; //a domicilio
    let estadoPedido = 1; //pendiente
    if (direccion === "") {
        alerta('La direccion no puede estar vacia', 'warning');
    } else {
        opcion = 24;
        $.ajax({
            url: "bd/peticiones.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, direccion: direccion, fechaPedido: fechaactual, tipoPedido: tipoPedido, estadoPedido: estadoPedido },
            success: function(data) {
                console.log(data);
                $("#modalCompra").modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Tu compra se ha realizado con exito',
                    text: 'Muchas gracias por tu compra ',
                })
            }
        });
    }
})

$("#compraEnPersona").submit(function(e) {
    e.preventDefault();
    let hora = $("#compraHora").val();
    let fecha = moment().format('YYYY/MM/DD');
    let fechaHora = fecha + " " + hora;
    fechaHora = new Date(fechaHora);
    let fechaactual = moment().format();
    if (moment(fechaHora).isSameOrBefore(fechaactual)) {
        alerta('La hora no puede ser menor a la actual', 'warning');
    } else {
        fechahora = moment(fechaHora).format('YYYY/MM/DD HH:mm');
        let tipoPedido = 2; // en persona
        let estadoPedido = 3; // en progreso
        opcion = 24;
        $.ajax({
            url: "bd/peticiones.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, fechaPedido: fechahora, tipoPedido: tipoPedido, estadoPedido: estadoPedido },
            success: function(data) {
                console.log(data);
                $("#modalCompra").modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Tu compra se ha realizado con exito',
                    text: `Muchas gracias por tu compra, hora de propuesta a recoger ${hora}`,
                })
            }
        });
    }
})

function traerDireccion() {
    opcion = 3;
    $.ajax({
        url: "bd/sesiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            $("#compraDireccion").val(data[0].direccion);
        }
    });
}

function alerta(mensaje, tipo) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
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