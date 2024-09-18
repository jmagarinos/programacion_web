// Sistema de Reservas de Hotel
// Instrucciones:
// Se te solicita que desarrolles un sistema de gestión de reservas de hotel. El sistema debe cumplir con los siguientes requerimientos:
// 1. Crear un sistema de reserva de hotel que incluya:
// ● id:Númeroúnicoqueidentifiquelareserva.
// ● nombreCliente:Elnombredelcliente(tipostring).
// ● numeroHabitacion:Númerodelahabitaciónreservada(tiponumber).
// ● diasHospedaje:Númerodedíasdehospedaje(tiponumber).
// ● precioPorDia:Preciopordíadelahabitación(tiponumber).
// ● costoTotal:Elcostototaldelareserva,quesecalculacomoelresultadode
// diasHospedaje * precioPorDia. 
// 2. Función para agregar reservas
// Desarrolla una función llamada agregarReserva(nombreCliente, numeroHabitacion, diasHospedaje, precioPorDia) que haga lo siguiente:
// ● Genere un id único para la reserva de manera automática.
// ● Reciba los parámetros de nombreCliente, numeroHabitacion,
// diasHospedaje y precioPorDia.
// ● Calcule el costoTotal de la reserva (días hospedados multiplicado por el precio
// por día).
// ● Almacene la reserva en un array de objetos.
// ● Devuelva el total a pagar y el id de la reserva generada.
// 3. Función para eliminar reservas
// Crea una función llamada eliminarReserva(id) que:
// ● Reciba el id de la reserva.
// ● Busque la reserva correspondiente en el array de reservas y la elimine.
// 4. Función para modificar reservas
// Implementa una función llamada modificarReserva(id, nuevosDias) que:
// ● Reciba el id de la reserva y el nuevo número de días de hospedaje (nuevosDias).
// ● Modifique el número de días de la reserva.
// ● Recalcule el costoTotal en base al nuevo número de días.
// 5. Función para agregar reservas usando JSON.stringify
// Desarrolla una función llamada guardarReservaJSON() que convierta el array de reservas a formato JSON utilizando JSON.stringify y lo almacene en una variable o localStorage.
// 6. Conversión de JSON a string y de vuelta a JSON
// Implementa funciones que conviertan las reservas a formato JSON (usando JSON.stringify) y luego las conviertan nuevamente a objetos de JavaScript utilizando JSON.parse.
// 7. Listar todas las reservas y calcular el total a cobrar
// Crea una función llamada listarReservas() que:
// ● Devuelva un listado con todas las reservas en el sistema.
// ● Calcule y devuelva el total de dinero a cobrar, sumando todos los costoTotal de
// las reservas existentes.

let reservas = [];
let id = 0;

function agregarReserva(nombreCliente, numeroHabitacion, diasHospedaje, precioPorDia){
    let costoTotal = diasHospedaje*precioPorDia;
    let reserva = {id: id++, nombreCliente: nombreCliente, numeroHabitacion: numeroHabitacion, diasHospedaje: diasHospedaje, precioPorDia: precioPorDia, costoTotal: costoTotal};
    reservas.push(reserva);
    console.log('Se ha registrado la reserva',id,'con un costo total',costoTotal);
}

agregarReserva('Juan', 402, 5, 500);
agregarReserva('Lucas', 401, 15, 350);
agregarReserva('Valeria', 302, 10, 550);
console.log(reservas)

function eliminarReserva(id){
    let foundID = reservas.findIndex(reserva => reserva.id === id);
    if(foundID>=0){
        reservas.splice(foundID,1);
        return 'Reserva eliminada.'
    }
    else{
        return 'ERROR: La reserva indicada no existe.'
    }
}

console.log(eliminarReserva(1));
console.log(eliminarReserva(4));
console.log(reservas);

function modificarReserva(id, nuevosDias){
    let foundID = reservas.findIndex(reserva => reserva.id === id);
    if(foundID>=0){
        reservas[foundID].diasHospedaje=nuevosDias;
        reservas[foundID].costoTotal=nuevosDias*reservas[foundID].precioPorDia;
        return 'Reserva modificada con exito.'
    }
    else{
        return 'ERROR: La reserva indicada no existe.'
    }
}

console.log(modificarReserva(0,10));
console.log(reservas);

function guardarReservaJSON(reservas){
    let reservas_string=JSON.stringify(reservas);
    return reservas_string;
}

reservas_string = guardarReservaJSON(reservas);
console.log(reservas_string);

function convertirStringAJSON(string){
    let objetos = JSON.parse(string);
    return objetos;
}

reservas_parse = convertirStringAJSON(reservas_string);
console.log(reservas_parse);


function listarReservas(){
    let total = 0;
    console.log(reservas);
    for(let i=0; i<reservas.length;i++){
        total+=reservas[i].costoTotal;
    }
    if(total>0){
        console.log('El total de las reservas a cobrar es:');
        return total;    
    }
    else{
        return 'No hay reservas aún.';
    }
}

console.log(listarReservas());