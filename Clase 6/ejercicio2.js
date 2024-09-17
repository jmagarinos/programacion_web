// 1. Crea un carrito de compras utilizando arrays y objetos donde cada producto tenga las propiedades:
//    - `id`
//    - `nombre`
//    - `precio`
//    - `cantidad`
// 2. Implementa las siguientes funciones:
//    - `agregarProducto(id, cantidad)`: Añade productos al carrito.
//    - `removerProducto(id)`: Elimina productos del carrito.
//    - `totalCarrito()`: Calcula el total de la compra.
//    - `listarProductos()`: Muestra todos los productos del carrito.
// 3.Verificar si el carrito tiene productos y mostrar un mensaje si está vacío.

carrito = []
lista_precios = [{id: 1, precio: 50}, {id: 2, precio: 100}, {id: 3, precio: 150}]

function agregarProducto(id, cantidad){
    if((id) && (cantidad)){
        let productoExistente = carrito.findIndex(producto => producto.id === id);
        if(productoExistente>=0){
            carrito[productoExistente].cantidad += cantidad;
        }
        else{
            let item = {id: id, cantidad: cantidad};
            carrito.push(item);
        }
    }
    else{
        console.log('ERROR: Dato vacío.');
    }
}


agregarProducto(1, );
agregarProducto(2, 30);
agregarProducto(1, 15);
agregarProducto(2, 15);
agregarProducto(3, 5)
console.log(carrito);

function removerProducto(id){
    if(id){
        let existeID = carrito.findIndex(producto => producto.id === id);
        if(existeID>0){
            carrito.splice(existeID,1);
        }
        else{
            console.log('ERROR: El producto indicado no existe.')
        }
    }
    else{
        console.log('ERROR: Dato vacío.')
    }
}

removerProducto();
removerProducto(4);
//removerProducto(3);
console.log(carrito);

function totalCarrito(){
    let total = 0;
    for(let i=0;i<carrito.length;i++){
        let precio = lista_precios.find(producto => producto.id === carrito[i].id)?.precio;
        if(precio>0){
            total += carrito[i].cantidad*precio;
        }
        else{
            console.log('ERROR.')
            return 'Error';
        }
    }
    return total;
}

console.log(totalCarrito());

function listarProductos(carrito){
    if(carrito.length>0){
        console.log(carrito);
    }
    else{
        console.log('El carrito está vacío.')
    }
}  

let carrito2 = [];

listarProductos(carrito);
listarProductos(carrito2);