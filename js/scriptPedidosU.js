var descuento = new Array();
var id_conD = new Array();
var opcion;
var idcarro;
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
            console.log(data);
        }

    });
    $('#botonMas').click(function() {
        cantidad = document.getElementById("cantidad");
        cantidad.stepUp();
    })
    $('#botonMenos').click(function() {
        cantidad = document.getElementById("cantidad");
        cantidad.stepDown();
    })
    $('#formPedidos').submit(function(e) {
        e.preventDefault(); //evitar la funcion del submit para recargar la pagina
        cantidad = $.trim($('#cantidad').val());
        console.log(cantidad + "comprobar cantidad");
        opcion = 19;
        $.ajax({
            url: "bd/solicitudes.php",
            type: "POST",
            dataType: "json",
            data: { opcion: opcion, usuario: "hugo" }, //por cambiar para usuario de verdad
            success: function(data) {
                console.log(data);
                if (data.length == 0) {
                    crearNuevaFactura(cantidad);
                } else {
                    CrearyConsultCarrito(data, cantidad, 23);
                }
            }

        });
    })
});

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
    var att = document.getElementById("" + grupo);
    console.log(att);
    opcion = 17;
    var pd;
    var hecho;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, grupo: grupo },
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                hecho = 0;
                for (var j = 0; j < id_conD.length; j++) {
                    if (id_conD[0] == data[i].id_producto) {
                        pd = data[i].precio - (data[i].precio * descuento[j]) / 100;
                        att.insertAdjacentHTML('beforeend', "<div class='card' style='width: 18rem;'><img src='./Imagenes/" + data[i].img + "' class='card-img-top' style='height: 12rem;'><div class='card-body'><h5 class='card-title'>" + data[i].nombre_produc + "</h5><ul class='list-group list-group-flush'><li class='list-group-item'><p class='text-decoration-line-through fs-4 text-muted' style='display: inline-block;padding: 5px;'>$" + data[i].precio + "</p><p class='fs-4' style='display: inline-block; padding: 5px;' >$" + pd + "</p></li><a value='" + data[i].id_producto + "' class='btn btn-primary boton' id='" + data[i].id_producto + "' onclick='modal(this.id)'>Agregar a carrito</a></div></div>");
                        hecho = 1;
                    }
                }
                if (hecho == 0) {
                    att.insertAdjacentHTML('beforeend', "<div class='card' style='width: 18rem;'><img src='./Imagenes/" + data[i].img + "' class='card-img-top' style='height: 12rem;'><div class='card-body'><h5 class='card-title'>" + data[i].nombre_produc + "</h5><ul class='list-group list-group-flush'><li class='list-group-item'><p class='fs-4' style='display: inline-block;padding: 5px;'>$" + data[i].precio + "</p></li><a value='" + data[i].id_producto + "' class='btn btn-primary boton' id='" + data[i].id_producto + "' onclick='modal(this.id)'>Agregar a carrito</a></div></div>");
                }
            }
        }
    });
}

function modal(id) {
    idcarro = parseInt(id);
    opcion = 18;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_p: id },
        success: function(data) {
            console.log(data);
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
}

function crearNuevaFactura(cantidad) {
    opcion = 20;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, usuario: "hugo" }, //por cambiar para usuario de verdad
        success: function(data) { //data retorna id_factura
            CrearyConsultCarrito(data, cantidad, 22);
        }
    });
}

function CrearyConsultCarrito(data, cantidad, opcion) { //opcion?
    console.log("aun no realizado" + opcion + " y " + data[0].id_factura);
    //opcion 6 crea nuevo
    //opcion 7 consulta el id_orden utilizando el id_factura 
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_factura: data[0].id_factura },
        success: function(data) { //data retorna id_orden
            console.log("DAta orden");
            console.log(data);
            insertarOrden_Producto(data, cantidad);
        }
    });
}

function insertarOrden_Producto(data, cantidad) { //data=id_orden
    opcion = 21;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion, id_p: idcarro, id_orden: data[0].id_orden, unidades: cantidad },
        success: function() {
            console.log("realizado");
        }
    });
    $('#modalPedidos').modal('hide');
}