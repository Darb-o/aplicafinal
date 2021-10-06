var descuento = new Array();
var id_conD = new Array();
var opcion;
var datos = new Array();
$(document).ready(function() {
    opcion = 16;
    $.ajax({
        url: "./bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                id_conD.push(data[i].id_producto);
                descuento.push(data[i].descuento);
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
            for (var i = 0; i < data.length; i++) {
                at.insertAdjacentHTML('beforeend', "<div class='row' id='" + data[i].id_grupo + "'><p class='fs-2'>" + data[i].nombre_grupo + "</p></div>");
                fillCards(data[i].id_grupo);
            }
        }
    });
}

function fillCards(grupo) {
    let att = document.getElementById("" + grupo);
    opcion = 17;
    let pd, hecho;
    let desc = 0;
    let insercion = null;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, grupo: grupo },
        success: function(data) {
            datos = data;
            for (let i = 0; i < data.length; i++) {
                hecho = 0;
                for (let j = 0; j < id_conD.length; j++) {
                    if (id_conD[j] == data[i].id_producto) {
                        pd = data[i].precio - (data[i].precio * descuento[j]) / 100;
                        desc = descuento[j];
                        insercion = `<div class="col-12 col-md-3 col-sm-4 col-lg-2">
                        <div class="card">
                        <div class="producto">
                            <div class="iconodescuento">       
                                <span class="material-icons">local_offer</span>
                                <h2>${desc}%</h2>
                            </div>
                            <div class="imgbox">
                                <img src="./img/${data[i].img}" alt="">
                            </div>
                            <div class="detalle">
                                <h2>${data[i].nombre_produc}<br><span>${data[i].descripcion}</span></h2>
                                <div class="precio">$${data[i].precio}</div>
                                <a class="botonMenos" role="button"><span class="material-icons">remove</span></a>
                                <input type="number" class="inputcantidad" value="1" min="1" max="50">
                                <a class="botonMas" role="button"><span class="material-icons">add</span></a>        
                                <a class="botonañadircarrito" role="button">Añadir carrito</a>
                            </div>           
                        </div>
                        </div>
                        </div>`;
                        att.insertAdjacentHTML('beforeend', insercion);
                        hecho = 1;
                    }
                }
                if (hecho == 0) {
                    insercion = `<div class="col-12 col-md-3 col-sm-4 col-lg-2">
                    <div class="card">
                        <div class="producto">
                            <div class="imgbox">
                                <img src="./img/${data[i].img}" alt="">
                            </div>
                            <div class="detalle">
                                <h2>${data[i].nombre_produc}<br><span>${data[i].descripcion}</span></h2>
                                <div class="precio">$${data[i].precio}</div>
                                <a class="botonMenos" role="button"><span class="material-icons">remove</span></a>
                                <input type="number" class="inputcantidad" value="1" min="1" max="50">
                                <a class="botonMas" role="button"><span class="material-icons">add</span></a>        
                                <a class="botonañadircarrito" role="button">Añadir carrito</a>
                            </div>           
                        </div>
                        </div>
                        </div>`;
                    att.insertAdjacentHTML('beforeend', insercion);
                }
            }
        }
    });
}

$('.botonMas').click(function() {
    cantidad = document.getElementsByClassName("inputcantidad");
    console.log("presione el boton mas");
    cantidad.stepUp();
})

$('.botonMenos').click(function() {
    cantidad = document.getElementsByClassName("inputcantidad");
    console.log("presione el boton menos");
    cantidad.stepDown();
})


function modal(id, nombrepro, descrip, precio, desc) {
    let idcarro = parseInt(id);
    console.log("Esto es lo que le llego al modal: " + idcarro + "," + nombrepro + "," + descrip + "," + precio + "," + desc);
    opcion = 18;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_p: id },
        success: function(data) {
            $("#formPedidos").trigger("reset"); // resetear o limpiar el formulario
            $(".modal-header").css("background-color", "#198754");
            $(".modal-header").css("color", "white");
            $(".modal-title").text(data[0].nombre_produc);
            $(".imagen").attr("src", "./Imagenes/" + data[0].img);
            $(".precio").attr("content", data[0].precio);
            $(".precio").attr("class", "fs-2");
            descripcion = document.getElementById("descripcion");
            descripcion.innerHTML = data[0].descripcion;
            for (var i = 0; i < id_conD.length; i++) {
                if (id == id_conD[i]) {
                    precioTachado = document.getElementById("precioTachado");
                    precioTachado.innerHTML = "$" + data[0].precio;
                    precioNormal = document.getElementById("precioNormal");
                    precioNormal.innerHTML = "$" + (data[0].precio - (data[0].precio * descuento[i]) / 100);
                } else {
                    precioTachado = document.getElementById("precioTachado");
                    precioTachado.innerHTML = "";
                    precioNormal = document.getElementById("precioNormal");
                    precioNormal.innerHTML = "$" + data[0].precio;
                }
            }
        }
    });
    $("#modalPedidos").modal('show');
    $("#idproducto").val(idcarro);
    $("#nombreproducto").val(nombrepro);
    $("#descrip").val(descrip);
    $("#precio").val(precio);
    $("#descuento").val(desc);
}

$("#formPedidos").submit(function(e) {
    opcion = 6;
    e.preventDefault();
    let idproducto = $.trim($('#idproducto').val());
    let nombreproducto = $.trim($('#nombreproducto').val());
    let descrip = $.trim($('#descrip').val());
    let precio = $.trim($('#precio').val());
    let descuento = $.trim($('#descuento').val());
    let unidades = $.trim($('#cantidad').val());
    $.ajax({
        url: "./bd/sesiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            if (data != null) {
                opcion = 29;
                console.log("entre al primer ajax");
                $.ajax({
                    url: "bd/solicitudes.php",
                    type: "POST",
                    dataType: "json",
                    data: { opcion: opcion, id_p: idproducto, nom_p: nombreproducto, desc: descrip, precio: precio, descuento: descuento, unidades: unidades },
                    success: function(data) {
                        console.log("entre al segundo ajax");
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })
                        Toast.fire({
                            icon: 'success',
                            title: 'Producto agregado a tu carrito',
                        })
                        $("#modalPedidos").modal('hide');
                        for (id in data) {
                            console.log("id producto: " + data[id].idproducto + ", unidades: " + data[id].unidades + ", descuento: " + data[id].descuento);
                        }
                    }
                });
            } else {
                $("#modalPedidos").modal('hide');
                $("#modalInicioSesion").modal('show');
            }
        }
    });

});

$("#btnMenuCarro").click(function(e) {
    $("#modalCarrito").modal('show');
    opcion = 30;
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
            { title: "Producto", data: "nombreproducto" },
            { title: "Descripcion", data: "descripcion" },
            { title: "Precio unidad", data: "precio" },
            { title: "Descuento", data: "descuento" },
            { title: "Cantidad", data: "unidades" },
            { title: "Subtotal", data: "subtotal" },
        ]
    });
});