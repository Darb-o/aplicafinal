var opcion;
var productos = new Array();
var productosdescuento = new Array();
$(document).ready(function() {
    opcion = 16;
    $.ajax({
        url: "./bd/solicitudes.php",
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
    opcion = 9;
    $.ajax({
        url: "bd/solicitudes.php",
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
    opcion = 17;
    let bandera = true;
    let precio = 0;
    let descuento = 0;
    let insercion = null;
    $.ajax({
        url: "bd/solicitudes.php",
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
            opcion = 29;
            if (data != null) {
                $.ajax({
                    url: "bd/solicitudes.php",
                    type: "POST",
                    dataType: "json",
                    data: { opcion: opcion, id_p: producto.id, nom_p: producto.nombre, desc: producto.descripcion, precio: producto.precio, descuento: producto.descuento, unidades: unidades },
                    success: function(data) {
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Producto agregado a tu carrito'
                        })
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
            opcion = 30;
            if (data != null) {
                tablaCarrito = $('#tablaCarrito').DataTable({
                    destroy: true,
                    ajax: {
                        url: "bd/solicitudes.php",
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
                $("#modalInicioSesion").modal('show');
            }
        }
    });
});

function cambiarvalortotal() {
    opcion = 33;
    $.ajax({
        url: "bd/solicitudes.php",
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
    opcion = 31;
    $.ajax({
        url: "bd/solicitudes.php",
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
    opcion = 31;
    $.ajax({
        url: "bd/solicitudes.php",
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
    opcion = 32;
    $.ajax({
        url: "bd/solicitudes.php",
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