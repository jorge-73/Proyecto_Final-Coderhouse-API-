// Creación del constructor para los productos de ejemplo que se mostraran como propaganda
class Productos{
    constructor(id, nombre, descripcion, precio, cantidad, img){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = img;
    }
}
// Lista de los objetos/productos creados mientras se lo va guardando en un array
const listaProductos = [];
listaProductos.push(new Productos(1, 'Celular Samsung', 'Modelo A22', 122000, 1, "img/samsungA22.jpg"));
listaProductos.push(new Productos(2, 'Celular lg', 'Modelo K20', 72000, 1, "img/lgK20.jpg"));
listaProductos.push(new Productos(3, 'Celular Motorola', 'Modelo G30', 102000, 1, "img/motorolaG30.jpg"));
listaProductos.push(new Productos(4, 'Celular Samsung', 'Modelo S21', 169999, 1, "img/samsungS21.jpg"));
listaProductos.push(new Productos(5, 'Celular Motorola', 'Modelo Edge 30', 119999, 1, "img/motorolaEdge30.jpg"));
listaProductos.push(new Productos(6, 'Celular Samsung', 'Modelo S20', 159999, 1, "img/samsungS20.jpg"));
listaProductos.push(new Productos(7, 'Celular Apple', 'iPhone SE', 317499, 1, "img/appleiPhoneSE.jpg"));
listaProductos.push(new Productos(8, 'Celular Apple', 'iPhone 14 Pro Max', 837000, 1, "img/appleiPhone14ProMax.jpg"));
listaProductos.push(new Productos(9, 'Celular Sony', 'Xperia 5 lv', 300000, 1, "img/SonyXperia5.jpg"));
listaProductos.push(new Productos(10, 'Celular Xiaomi', 'Redmi Note 9', 154800, 1, "img/xiaomiRedmiNote9.jpg"));

let carritoStorage = [];

let numeroCarrito = document.getElementById('numeroCarrito');
let contenedorProductos = document.getElementById('productos');
let vaciarCarrito = document.getElementById('vaciarCarrito');
let btnModal = document.getElementById('btnMostrar');
let form = document.getElementById('form');
let modalAlert = document.getElementById('modalAlert');
let precioTotal = document.getElementById('precioTotal');
let alerta = document.getElementById('sectionAlert');

document.addEventListener('DOMContentLoaded', ()=> { 
    carritoStorage = JSON.parse(localStorage.getItem("carritoStorage")) || [];
    imprimirCarrito();
})

const funcionImprime = (e) => {

    e.preventDefault();
    let formulario = e.target.children;
    let divisas = formulario[0].children[1].value;
    let resNumber = formulario[1].children[1].value;
    
    switch (divisas) {
        case 'dolar':
            totalCambio = Math.fround(resNumber * 315);
        break;
        case 'dolar blue':
            totalCambio = Math.fround(resNumber * 312);
        break;
        case 'euro':
            totalCambio = Math.fround(resNumber * 283.50);
        break;
        case 'real':
            totalCambio = Math.fround(resNumber * 62.60);
        break;
    }
    
    if (totalCambio) {
        result = document.getElementById('result');
        result.innerHTML = `AR$${totalCambio}`; 
    }

    ImprimirPantallaConProductos();

};
form.addEventListener('submit', funcionImprime);


function ImprimirPantallaConProductos() {
    if (document.getElementById('bienvenida')) {
        bienvenida = document.getElementById('bienvenida');
        // bucle para mostrar los productos mientras que el valor retornado alcance para comprar algunos de ellos
        listaProductos.forEach((producto)=>{
            const {id, nombre, descripcion, precio, imagen} = producto;
            if (totalCambio > precio) {
                bienvenida.remove();
                 let card = document.createElement('div');
                         card.innerHTML += `
                             <div class="card text-center shadow p-1 card_prod">
                                 <img src=${imagen} class="img_prod" alt="...">
                                 <div class="card-body">
                                     <h5 class="card-title">${nombre}</h5>
                                     <h6 class="card-text">${descripcion}</h6>
                                 </div>
                                 <div class="card-footer d-flex justify-content-evenly">
                                     <h5 class='mt-1'>$<span id="precioProd">${precio}</span></h5>
                                     <button onclick="agregarAlCarrito(${id})" class="btn btn-primary rounded carrito"><img src="./img/carrito-de-compras.png" class="img-carrito" alt="carrito"></button>
                                 </div>
                             </div>`;
                 contenedorProductos.append(card);
             }
         })
         imprimirCarrito();
     }else {
        let idCard = document.querySelectorAll(".card_prod");
        idCard.forEach(carta => {
        carta.parentElement.remove(); });
        // bucle para mostrar los productos mientras que el valor retornado alcance para comprar algunos de ellos
        listaProductos.forEach((producto)=>{
            const {id, nombre, descripcion, precio, imagen} = producto;
            if (totalCambio > precio) {
                 let card = document.createElement('div');
                         card.innerHTML += `
                             <div class="card text-center shadow p-1 card_prod">
                                 <img src=${imagen} class="img_prod" alt="...">
                                 <div class="card-body">
                                     <h5 class="card-title">${nombre}</h5>
                                     <h6 class="card-text">${descripcion}</h6>
                                 </div>
                                 <div class="card-footer d-flex justify-content-evenly">
                                     <h5 class='mt-1'>$<span id="precioProd">${precio}</span></h5>
                                     <button onclick="agregarAlCarrito(${id})" class="btn btn-primary rounded carrito"><img src="./img/carrito-de-compras.png" class="img-carrito" alt="carrito"></button>
                                 </div>
                             </div>`;
                 contenedorProductos.append(card);
             }
         })
        imprimirCarrito();
    }
}

// Funcion para agregar el producto al carrito
function agregarAlCarrito(id){

    const prodExiste = carritoStorage.some(prod => prod.id === id);

    if (prodExiste) {
        carritoStorage.map(prod => {
            if (prod.id === id) {
                prod.cantidad++;
            }
        })
    }else {
        const item = listaProductos.find((producto) => producto.id === id);
        item.cantidad = 1;
        carritoStorage.push(item);
    }

    // mensaje en caso de que se cargue los items al carrito
    alerta.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show mt-5 rounded-3" role="alert">
    <h5>Agregado al Carrito correctamente.!</h5>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>`;
    setTimeout(() => {
        alerta.innerHTML= "";
    }, 3000);

    imprimirCarrito();
}

const imprimirCarrito = () => {
    let modalBody = document.querySelector('.modal #modalBody');
    modalBody.innerHTML = '';
    carritoStorage.forEach((carProducto) => {
        const {id, nombre, descripcion, precio, cantidad, imagen} = carProducto;
                modalBody.innerHTML += `
                    <tr>
                    <td><h5>${nombre}</h5></td>
                    <td><h5>${descripcion}</h5></td>
                    <td><img src="${imagen}" alt="" class="img-modal"></td>
                    <td><h5>${precio}</h5></td>
                    <td><h5>${cantidad}</h5></td>
                    <td><button onclick="eliminarProducto(${id})" class="btn btn-danger rounded-5 btnDelete"><img src="./img/bote-de-basura.png" class="img-modal-delete"></button></td>
                    </tr>`;          
    })

    // Mensaje Mostrado si el carrito se encuentra Vacio.
    if (carritoStorage.length == 0) {
        modalBody.innerHTML = `
            <tr>
                <td colspan="6"><h5 class="text-primary mt-1">Carrito Vacio.!</h5></td>
            </tr>`;
    }

    // Imprimiendo cantidad de items del Carrito
    numeroCarrito.textContent = carritoStorage.reduce((acc, producto) => acc + producto.cantidad, 0);

    // Sumando todos los precios de los productos
    precioTotal.innerText = carritoStorage.reduce((acc, producto) => acc + producto.cantidad * producto.precio, 0);

    guardarStorage();

}
// Borrando un unico item del Carrito
function eliminarProducto(id) {
    if (carritoStorage.some(prod => prod.id === id)) {
     
        carritoStorage.map(prod => {
            if (prod.id === id) {
                    prod.cantidad--;
                }
        })
        
        if (carritoStorage.some(prod => prod.cantidad < 1)) {
            const prodID = id;
            carritoStorage = carritoStorage.filter((prod) => prod.id !== prodID);
        }
    }
    imprimirCarrito();
}

// Guardar productos del carrito en el LocalStorage
function guardarStorage(){
    localStorage.setItem("carritoStorage", JSON.stringify(carritoStorage));
}

// Boton para eliminar todos los elementos del carrito/localStorage
vaciarCarrito.addEventListener('click', () => {
    if (carritoStorage.length != 0) {
        carritoStorage.length = [];
        Swal.fire(
            'Exito!',
            'Carrito vaciado Correctamente!',
            'success'
            )
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ingrese productos al carrito!'
        })
    }
    imprimirCarrito();
})