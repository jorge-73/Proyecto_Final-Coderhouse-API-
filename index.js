let numeroCarrito = document.getElementById('numeroCarrito');
let container = document.getElementById('productos');
let vaciarCarrito = document.getElementById('vaciarCarrito');
let bodyModal = document.getElementById('modalBody');
let btnModal = document.getElementById('btnMostrar');
let form = document.getElementById('form');

let productosStorage;

document.addEventListener('DOMContentLoaded', () => {
    productosStorage = JSON.parse(localStorage.getItem("productosStorage")) || [];
})

// Creación del constructor para los productos de ejemplo que se mostraran como propaganda
class Productos{
    constructor(nombre, descripcion, precio, img){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.imagen = img;
    }
}
// Lista de los objetos/productos creados mientras se lo va guardando en un array
const listaProductos = [];
listaProductos.push(new Productos('Celular Samsung', 'Modelo A22', 122000, "img/samsungA22.jpg"));
listaProductos.push(new Productos('Celular lg', 'Modelo K20', 72000, "img/lgK20.jpg"));
listaProductos.push(new Productos('Celular Motorola', 'Modelo G30', 102000, "img/motorolaG30.jpg"));
listaProductos.push(new Productos('Celular Samsung', 'Modelo S21', 169999, "img/samsungS21.jpg"));
listaProductos.push(new Productos('Celular Motorola', 'Modelo Edge 30', 119999, "img/motorolaEdge30.jpg"));
listaProductos.push(new Productos('Celular Samsung', 'Modelo S20', 159999, "img/samsungS20.jpg"));
listaProductos.push(new Productos('Celular Apple', 'iPhone SE', 317499, "img/appleiPhoneSE.jpg"));
listaProductos.push(new Productos('Celular Apple', 'iPhone 14 Pro Max', 837000, "img/appleiPhone14ProMax.jpg"));
listaProductos.push(new Productos('Celular Sony', 'Xperia 5 lv', 300000, "img/SonyXperia5.jpg"));
listaProductos.push(new Productos('Celular Xiaomi', 'Redmi Note 9', 154800, "img/xiaomiRedmiNote9.jpg"));

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

    if (document.getElementById('bienvenida')) {
        bienvenida = document.getElementById('bienvenida');
        // bucle para mostrar los productos mientras que el valor retornado alcance para comprar algunos de ellos
        for(const producto of listaProductos) {
            if (totalCambio > producto.precio) {
                bienvenida.remove();
                let card = document.createElement('div');
                card.innerHTML = `
                    <div class="card text-center shadow p-1 card_prod">
                        <img src=${producto.imagen} class="img_prod" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <h6 class="card-text">${producto.descripcion}</h6>
                        </div>
                        <div class="card-footer d-flex justify-content-evenly">
                            <h5 class='mt-1'>$${producto.precio}</h5>
                            <button class="btn btn-primary rounded carrito"><img src="./img/carrito-de-compras.png" class="img-carrito" alt="carrito"></button>
                        </div>
                    </div>`;
                container.append(card);
            }
        }
        agregarAlCarrito();

    }else {
        let idCard = document.querySelectorAll(".card_prod");
        idCard.forEach(carta => {
        carta.parentElement.remove(); });

        // bucle para mostrar los productos mientras que el valor retornado alcance para comprar algunos de ellos
        for(const producto of listaProductos) {
            if (totalCambio > producto.precio) {
                let card = document.createElement('div');
                card.innerHTML = `
                        <div class="card text-center shadow p-1 card_prod">
                            <img src=${producto.imagen} class="img_prod" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <h6 class="card-text">${producto.descripcion}</h6>
                            </div>
                            <div class="card-footer d-flex justify-content-evenly">
                                <h5 class='mt-1'>$${producto.precio}</h5>
                                <button class="btn btn-primary rounded carrito"><img src="./img/carrito-de-compras.png" class="img-carrito" alt="carrito"></button>
                            </div>
                        </div>`;
                container.append(card);
            }
        }
        agregarAlCarrito();
    }
};
form.addEventListener('submit', funcionImprime);

// Funcion para agregar el producto al carrito
const agregarAlCarrito = ()=>{
    if (document.querySelectorAll("img[class='img-carrito']")) {

        let alerta = document.getElementById('sectionAlert');
        let carrito = document.querySelectorAll("img[class='img-carrito']");
        let nuevosProductos;
    
        for (let carro of carrito) {
            carro.addEventListener('click', ()=>{

                let carProducto = {
                    carImg: carro.offsetParent.children[0].src,
                    carNombre: carro.offsetParent.children[1].children[0].innerText,
                    carDescripcion: carro.offsetParent.children[1].children[1].innerText,
                    carPrecio: carro.offsetParent.children[2].children[0].innerText };

                let productosStorage = JSON.parse(localStorage.getItem("productosStorage"));

                productosStorage ? nuevosProductos = productosStorage : nuevosProductos = [];

                nuevosProductos.push(carProducto);

                localStorage.setItem("productosStorage", JSON.stringify(nuevosProductos));

                // mensaje en caso de que se cargue los items al carrito
                alerta.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show mt-5 rounded-3" role="alert">
                    <h5>Agregado al Carrito correctamente.!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
                setTimeout(() => {
                    alerta.innerHTML= "";
                }, 3000);
            });
        };
    }
}

// Boton para eliminar todos los elementos del carrito/localStorage
vaciarCarrito.addEventListener('click', ()=>{
    if (JSON.parse(localStorage.getItem("productosStorage"))) {
        localStorage.clear();
    }
})

// MODAL
const myModal = new bootstrap.Modal(document.getElementById('modalId'));
    if (localStorage.hasOwnProperty("productosStorage")) {
        let productStorage = JSON.parse(localStorage.getItem("productosStorage"));
        let mostrarCarrito = () => {
            for(const prodST of productStorage) {
                let trModal = document.createElement('tr');
                    trModal.innerHTML = `
                        <td><h5>${prodST.carNombre}</h5></td>
                        <td><h5>${prodST.carDescripcion}</h5></td>
                        <td><img src="${prodST.carImg}" alt="" class="img-modal"></td>
                        <td><h5>${prodST.carPrecio}</h5></td>
                        <td><button class="btn btn-danger rounded-4 btnDelete"><img src="./img/bote-de-basura.png" class="img-modal"></button></td>`;
            bodyModal.append(trModal);
            };
        }
        productStorage ? mostrarCarrito() : bodyModal.append(`<H5>Carrito Vacío</H5>`);
    }
    // Imprimiendo cantidad de items del Carrito
    if (JSON.parse(localStorage.getItem("productosStorage"))) {
        numeroCarrito.textContent = (JSON.parse(localStorage.getItem("productosStorage"))).length;   
    }

    // Borrando un unico item del Carrito
    if (document.getElementsByClassName('btnDelete')) {
        let btnDelete = document.getElementsByClassName('btnDelete');
        btnDelete = Array.from(btnDelete);
        btnDelete.forEach((btn)=>{
            btn.addEventListener('click', ()=>{
                let del = btn.parentElement.parentElement.children[1].innerText;
                let rowDelete = JSON.parse(localStorage.getItem("productosStorage"));
                let borrado = rowDelete.find(dele=> dele.carDescripcion === del);
                newRow = rowDelete.filter(deleteStorage => deleteStorage !== borrado);
                localStorage.setItem("productosStorage", JSON.stringify(newRow));
            });
        })
    }

   
