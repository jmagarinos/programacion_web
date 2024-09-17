// 1. Implementa un sistema de autenticación simple que almacene usuarios en un array de objetos. Cada usuario debe tener:
//    - `id`
//    - `nombre`
//    - `password`
//    - `email`
// 2. Implementa funciones para:
//    - `registrarUsuario(nombre, email, password)`
//    - `iniciarSesion(email, password)`
// 3. Utiliza operadores lógicos para verificar si un usuario ya existe al registrar y si el email y la contraseña coinciden al iniciar sesión.
// 4. Implementa manejo de `Falsy` y `Truthy` valores para comprobar si las entradas son válidas (es decir, que no sean `null`, `undefined`, etc.).
// 5.Validar la fortaleza del `password` (debe tener al menos 6 caracteres y un número).
// 6. Almacena los usuarios en localStorage con `JSON.stringify` y recupera con `JSON.parse` al iniciar sesión.


// Initialize user list
let user_list = [];
let id = 0;

function validarContrasena(password){
    if(password.length<7){
        return false;
    }
    else{
        let hasDigit = false;
        for (let i = 0; i < password.length; i++) { 
            let char = password[i]; 
            if (char >= '0' && char <= '9') {
                hasDigit = true;
                break;
            }
        }
        return hasDigit;
    }
}

function esVacio(valor){
    if(valor){
        return true;
    }
    else{
        return false;
    }
}

function registrarUsuario(nombre, email, password){
    if(esVacio(nombre) && esVacio(password) && esVacio(email)){
        let existingUser = user_list.find(user => user.nombre === nombre);
        if(existingUser){
            console.log('ERROR: Usuario existente.');
        }
        else{
            if(validarContrasena(password)){
                let user={id: id++, nombre: nombre, email: email, password: password};
                user_list.push(user);
            }
            else{
                console.log('ERROR: Contraseña inválida.');
            }
        }    
    }
    else{
        console.log('ERROR: Campo vacío.');
    }
}

registrarUsuario('jmagarinos','','hola2321');
registrarUsuario('jmagarinos','jmagarinos@itba.edu.ar','');
registrarUsuario('jmagarinos','jmagarinos@itba.edu.ar','hola2321');
registrarUsuario('jmagarinos','jmagarinos21@itba.edu.ar','hola231');
registrarUsuario('jmagarino2','jmagarinos21@itba.edu.ar','holaadada');
registrarUsuario('jmagarino2','jmagarinos21@itba.edu.ar','hola2222');

console.log(user_list);
user_list_string = JSON.stringify(user_list);
console.log(user_list_string);
user_list_parse = JSON.parse(user_list_string);
console.log(user_list_parse);

function iniciarSesion(email, password){
    if(esVacio(password) && esVacio(email)){
        let index = user_list.findIndex(user => user.email === email)
            if(index>=0){
                if(user_list[index].password === password){
                    console.log('Sesión iniciada correctamente.')
                }
                else{
                    console.log('ERROR: Contraseña incorrecta.')
                }
            }
            else{
                console.log('ERROR: Mail no registrado.')
            }
    }
    else{
        console.log('ERROR: Se indicó un campo vacío.')
    }
}

iniciarSesion('','hola232123');
iniciarSesion('jmagarinos@itba.edu.ar','hola232123');
iniciarSesion('jmagarinos@itba.edu.ar','hola2321');
iniciarSesion('jmagos21@itba.edu.ar','hola2321');