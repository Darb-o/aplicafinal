var id_productos = new Array();
var nombre = new Array();
var datos = new Array();
var opcion;
$(document).ready(function() {
    opcion = 15;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            for (var i = 0; i < data.length; i++) {
                id_productos.push(data[i].id_producto);
                nombre.push(data[i].nombre_produc);
                datos.push(0);
            }
            console.log(data);
            datosP();
        }
    });
})

function datosP() {
    opcion = 33;
    $.ajax({
        url: "bd/solicitudes.php",
        type: "POST",
        dataType: "json",
        data: { opcion: opcion },
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < id_productos.length; j++) {
                    if (parseInt(data[i].id_producto) == id_productos[j]) {
                        datos[j] = datos[j] + 1;
                    }
                }
            }
            llenarTabla();
            console.log(datos);
        }
    });

}

function llenarTabla() {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: nombre,
            datasets: [{
                label: '# de compras',
                data: datos,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}