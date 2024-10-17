function addPlayer() {
    var table = document.getElementById("tableBody");
    var row = table.insertRow();
    var nombre = row.insertCell(0);
    var apodo = row.insertCell(1);
    var edad = row.insertCell(2);
    var numero = row.insertCell(3);
    var partidosJugados = row.insertCell(4);
    var partidosGanados = row.insertCell(5);
    var partidosEmpatados = row.insertCell(6);
    var partidosPerdidos = row.insertCell(7);
    var goles = row.insertCell(8);
    var tarjetasAmarillas = row.insertCell(9);
    var tarjetasRojas = row.insertCell(10);

    nombre.innerHTML = document.getElementById('nombre').value;
    apodo.innerHTML = document.getElementById('apodo').value;
    edad.innerHTML = document.getElementById('edad').value;
    numero.innerHTML = document.getElementById('numero').value;
    partidosJugados.innerHTML = document.getElementById('partidosJugados').value;
    partidosGanados.innerHTML = document.getElementById('partidosGanados').value;
    partidosEmpatados.innerHTML = document.getElementById('partidosEmpatados').value;
    partidosPerdidos.innerHTML = document.getElementById('partidosPerdidos').value;
    goles.innerHTML = document.getElementById('goles').value;
    tarjetasAmarillas.innerHTML = document.getElementById('tarjetasAmarillas').value;
    tarjetasRojas.innerHTML = document.getElementById('tarjetasRojas').value;

    // Limpiar formulario después de añadir
    document.getElementById('playerForm').reset();
}
