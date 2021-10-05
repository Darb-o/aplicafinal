var descuento = new Array();
var id_conD = new Array();
var opcion;
$(document).ready(function() {
    opcion = 16;

    $.ajax({
        url: "./bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                id_conD.push(data[i].id_producto);
                descuento.push(data[i].descuento);
            }
            fillGrupo();
        }

    });
});

$('#botonMas').click(function() {
    cantidad = document.getElementById("cantidad");
    cantidad.stepUp();
})

$('#botonMenos').click(function() {
    cantidad = document.getElementById("cantidad");
    cantidad.stepDown();
})

function fillGrupo() {
    var at = document.getElementById('contentCard');
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
    let pd;
    let hecho;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, grupo: grupo },
        success: function(data) {
            for (let i = 0; i < data.length; i++) {
                hecho = 0;
                for (let j = 0; j < id_conD.length; j++) {
                    if (id_conD[0] == data[i].id_producto) {
                        pd = data[i].precio - (data[i].precio * descuento[j]) / 100;
                        desc = descuento[j];
                        att.insertAdjacentHTML('beforeend', "<div class='card' style='width: 18rem;'><img src='./Imagenes/" + data[i].img + "' class='card-img-top' style='height: 12rem;'><div class='card-body'><h5 class='card-title'>" + data[i].nombre_produc + "</h5><ul class='list-group list-group-flush'><li class='list-group-item'><p class='text-decoration-line-through fs-4 text-muted' style='display: inline-block;padding: 5px;'>$" + data[i].precio + "</p><p class='fs-4' style='display: inline-block; padding: 5px;' >$" + pd + "</p></li><a value='" + data[i].id_producto + "' class='btn btn-primary boton' id='" + data[i].id_producto + "' onclick='modal(this.id,desc)'>Agregar a carrito</a></div></div>");
                        hecho = 1;
                    }
                }
                if (hecho == 0) {
                    att.insertAdjacentHTML('beforeend', "<div class='card' style='width: 18rem;'><img src='./Imagenes/" + data[i].img + "' class='card-img-top' style='height: 12rem;'><div class='card-body'><h5 class='card-title'>" + data[i].nombre_produc + "</h5><ul class='list-group list-group-flush'><li class='list-group-item'><p class='fs-4' style='display: inline-block;padding: 5px;'>$" + data[i].precio + "</p></li><a value='" + data[i].id_producto + "' class='btn btn-primary boton' id='" + data[i].id_producto + "' onclick='modal(this.id,0)'>Agregar a carrito</a></div></div>");
                }
            }
        }
    });
}

function modal(id, des) {
    let idcarro = parseInt(id);
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
    $("#descuento").val(des);
}

$("#formPedidos").submit(function(e) {
    opcion = 6;
    e.preventDefault();
    let idproducto = $.trim($('#idproducto').val());
    let unidades = $.trim($('#cantidad').val());
    let descuento = $.trim($('#descuento').val());
    $.ajax({
        url: "./bd/sesiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            if (data != null) {
                opcion = 7;
                $.ajax({
                    url: "./bd/sesiones.php",
                    type: "POST",
                    dataType: "json",
                    data: { opcion: opcion, idproducto: idproducto, unidades: unidades, descuento: descuento },
                    success: function(data) {
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
    opcion = 8;
    $.ajax({
        url: "./bd/sesiones.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(datos) {
            opcion = 29;
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
                    { data: "nombre_produc" },
                    { data: "descripcion" },
                    { data: "precio" },
                ]
            });
        }
    });

});