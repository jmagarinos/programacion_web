/*
1. Crea un sistema de gestión de tareas donde se puedan agregar, eliminar y modificar tareas.
2. Las tareas se almacenarán en un array de objetos, donde cada objeto representa una tarea con los siguientes atributos:
- `id` (número único)
- `nombre` (string)
- `completado` (booleano)
3. Verifica si una tarea existe y si está completa por id.
4. El sistema debe tener funciones para agregar tareas, marcar tareas como completadas, y eliminar tareas por id.
5. Desarrollar una función para mostrar todas las tareas, y que se pueda filtrar si están completadas o no.
6. Convierte el array de objetos a JSON utilizando `JSON.stringify`, y luego conviértelo de vuelta a un objeto con `JSON.parse`.
*/

let tareas = [];
let id = 0;

function agregarTarea(nombre, completado){
    if(nombre && (completado===true || completado===false)){
        foundTask = tareas.find(tarea => tarea.nombre === nombre);
            if(!foundTask){
                let tarea = {id: id++, nombre: nombre, completado: completado};
                tareas.push(tarea);
            }
            else{
                console.log('ERROR: La tarea ya existe.');
            }
    }
    else{
        console.log('ERROR: Se ha indicado un campo vacío.');
    }
    
}

agregarTarea('',false);
agregarTarea('Hacer la cama',false);
agregarTarea('Hacer la cama',true);
agregarTarea('Lavar los platos', false);
agregarTarea('Hacer la cama','');
agregarTarea('Mover muebles',false);
agregarTarea('Bañar gato', false)
console.log(tareas)


function marcarTareaCompletada(id){
    if(id){
        let ubicacionTarea = tareas.findIndex(tarea => tarea.id === id);
        if (ubicacionTarea>=0){
            tareas[ubicacionTarea].completado=true;
        }
    }
    else{
        console.log('ERROR: Se ha indicado un campo vacío.');
    }
}

marcarTareaCompletada('');
marcarTareaCompletada();
marcarTareaCompletada('1');
marcarTareaCompletada(1);
marcarTareaCompletada(3);

console.log(tareas)

function eliminarTarea(id){
    if(id){
        let ubicacionTarea = tareas.findIndex(tarea => tarea.id === id);
        if(ubicacionTarea>=0){
            tareas.splice(ubicacionTarea,1);
        }
        else{
            console.log('ERROR: La tarea indicada no existe.');
        }
    }
    else {
        console.log('ERROR: Se ha indicado un campo vacío.');
    }
}

eliminarTarea('');
eliminarTarea(1);
eliminarTarea('3');
console.log(tareas);

function mostrarTareas(estado){
    if(estado===true || estado===false){
        let tareasFiltrado = tareas.filter(tarea => tarea.completado === estado)
        return tareasFiltrado;
    }
    else{
        console.log('ERROR: El estado indicado no es válido.');
    }
}

let mostrarTareas_string = JSON.stringify(mostrarTareas(false));
console.log(mostrarTareas_string);
let mostrarTareas_parse = JSON.parse(mostrarTareas_string);
console.log(mostrarTareas_parse);