
/*
*1. Ejercicio 1: Declaración de Variables
*   - Declara variables con `let` y `const` para almacenar tu nombre, edad y si eres estudiante. Imprime cada una en la consola.
*/

let nombre = "Juan";
let edad = 29;
let estudiante = true;

const NOMBRE = "Juan";
const EDAD = 29;
const ESTUDIANTE = true;

console.log("Nombre: ",nombre);
console.log("Edad: ",edad);
console.log("Estudiante: ",estudiante);

console.log(NOMBRE);
console.log(EDAD);
console.log(ESTUDIANTE);

/*--------------------------------------------------------------------------------------------------*/

/*
*2. Ejercicio 2: Operaciones Matemáticas
*   - Declara dos variables numéricas e imprime la suma, resta, multiplicación y división de ambas.
*/

let numero1, numero2;

numero1=3;
numero2=5;

console.log("La suma es: ",numero1+numero2);
console.log("La resta es: ",numero1-numero2);
console.log("La multiplicacion es: ",numero1*numero2);
console.log("La divison es: ",numero1/numero2);


/*--------------------------------------------------------------------------------------------------*/

/*  
*3. Ejercicio 3: Tipos de Datos
*   - Declara una variable para almacenar un string, un número, un booleano, un array y un objeto. Imprime el tipo de cada variable usando `typeof`.
*/

console.log(typeof 42);

console.log(typeof 'blubber');

console.log(typeof true);

console.log(typeof undeclaredVariable);

console.log(typeof [1,2,3]);

console.log(typeof {nombre:'juan'});


/*--------------------------------------------------------------------------------------------------*/

/*   
*4. Ejercicio 4: Arrays Básicos
*   - Crea un array con 5 elementos (pueden ser números o strings). Accede al primer y último elemento.
*/

let cadena = [1,2,3,4,5];

console.log(cadena[0]);

console.log(cadena[4]);

/*--------------------------------------------------------------------------------------------------*/

/*   
*5. Ejercicio 5: Array de Objetos
*   - Crea un array de 3 objetos, donde cada objeto represente un libro con propiedades como título, autor y año de publicación. Imprime el título del primer libro.
*/

let cadena_array = [{titulo: 'Titulo 1', autor:'Autor 1', año:2024},
                    {titulo: 'Titulo 2', autor:'Autor 2', año:2024},
                    {titulo: 'Titulo 3', autor:'Autor 3', año:2024}];

console.log(cadena_array[0]);

/*--------------------------------------------------------------------------------------------------*/

/*   
*6. Ejercicio 6: Operadores Lógicos
*   - Declara dos variables booleanas, y usa operadores lógicos (`&&`, `||`, `!`) para combinar sus valores e imprimir el resultado.
*/

let valor, valor2;

valor=true;
valor2=false;

console.log("Valor uno:", valor || valor2)
console.log("Valor dos:",valor && valor2)

/*--------------------------------------------------------------------------------------------------*/

/*   
*7. Ejercicio 7: Comparaciones
*   - Declara dos variables numéricas e imprime si el primer número es mayor que el segundo, si son iguales o si el segundo es mayor.
*/

let v1,v2;

v1=5;
v2="5";

console.log(v1>v2)
console.log(v1<v2)
console.log(v1==v2)
console.log(v1===v2)



