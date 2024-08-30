// 3. Ejercicio 3: Métodos de Arrays

//   a - Utiliza el método `map` para crear un nuevo array que contenga la longitud de cada string en un array de nombres.

let estudiantes = ["Juan","Camilo","Lucas","Toto"]

// let estudianteslargonombres = estudiantes.map(x => x.length)
// console.log(estudianteslargonombres)

function contarCaracteresNombres(nombres){
    let cantCaracteres = []
    for (let i = 0; i < nombres.length;i++){
        cantCaracteres[i]=nombres[i].length
    }
    return cantCaracteres
}

largos = contarCaracteresNombres(estudiantes)
console.log(largos)

//   b - Usa el método `filter` para crear un nuevo array que contenga solo los números mayores a 10 de un array dado.

let numeros = [15,4,2,15,15,76,32,1,2,0,7,4,75,75]

numerosusandofilter = numeros.filter(x => x>=10 & x<50)
console.log(numerosusandofilter)

function escribirSiMayor(numeros){
    let nuevoArray = []
    let j=0
    for (let i = 0; i < numeros.length; i++){
        if (numeros[i]>=10){
            nuevoArray[j++] = numeros[i]
        }
    }
    return nuevoArray
}

numerosmayoresadiez = escribirSiMayor(numeros)
console.log(numerosmayoresadiez)

//   c - Emplea el método `reduce` para calcular la suma de todos los números en un array.

let numerosyletras = ["Hola",4,5,"Chau"]

function sumarTodosLosnumeros(numeros){
    suma = 0
    for(i=0; i<numeros.length;i++){
        suma+=numeros[i]
    }
    return suma
}

console.log(sumarTodosLosnumeros(numerosyletras))

// Eliminar Duplicados de una Lista

function eliminarDuplicados(numeros) {
    let sinDuplicados = [];
    let found = 0;
    let k = 0;
    for (let i = 0; i < numeros.length; i++) {
        for (let j = 0; j < sinDuplicados.length && found === 0; j++) { // Use logical OR (||) instead of bitwise OR (|)
            if (numeros[i] === sinDuplicados[j]) {
                found = 1;
            }
        }
        if (found === 0) {
            sinDuplicados[k++] = numeros[i];
        }
        found = 0;
    }
    return sinDuplicados;
}

listasinduplicados = eliminarDuplicados(numeros)
console.log(listasinduplicados)

// Suma de Pares e Impares

function sumasDispares(numeros) {
    sumaParImpar = [{nombre: "Sumar Par:", suma: 0},{nombre: "Sumar Impar:", suma: 0},]
    for(let i=0; i<numeros.length; i++){
        if(numeros[i]%2===0){
            sumaParImpar[0].suma+=numeros[i]
        }
        else{
            sumaParImpar[1].suma+=numeros[i]
        }
    }
    return sumaParImpar
}

console.log(sumasDispares(numeros))

// Encontrar el Segundo Número Más Grande
// [15,4,2,15,15,76,32,1,2,0,7,4]

function segundoMasGrande(numeros){
    let max;
    let segmax=0;
    if (numeros.length<2){
        console.log('El arreglo no tiene más de un numero')
    }
    else{
        max=numeros[0];
        for(let i=0; i<numeros.length;i++){
            if(numeros[i]>segmax){
                if(numeros[i]<max){
                    segmax=numeros[i];
                }
                else{
                    segmax=max;
                    max=numeros[i];
                }
            }
        }
    }
    return segmax
}

console.log(segundoMasGrande(numeros))