/* alert('Bienvenido al Convertidor de moneda');
alert("Se puede elegir entre: 'dolar', 'dolar blue', 'euro' y 'real'");
let respuesta = prompt('empezamos?');

// Funcion principal para la conversión de moneda
function tipoDeCambio() {
    let tipoCambio = prompt('Ingrese el tipo de moneda que desee cambiar');
    let moneda = parseInt(prompt('Ingrese el monto a cambiar'));
    while (isNaN(moneda)) {
        alert('El valor ingresado no es un numero');
        moneda = parseInt(prompt('Vuelva a ingresar el monto a cambiar'));
    }
    switch (tipoCambio) {
        case 'dolar':
            totalCambio = Math.fround(moneda * 315);
            alert(`El total quedaria en $${totalCambio} pesos arg. con impuestos incluidos`);
            return tipoCambio;
        case 'dolar blue':
            totalCambio = Math.fround(moneda * 312);
            alert(`El total quedaria en $${totalCambio} pesos arg. mas impuestos`);
            return tipoCambio;
        case 'euro':
            totalCambio = Math.fround(moneda * 283.50);
            alert(`El total quedaria en $${totalCambio} pesos arg. con impuestos incluidos`);
            return tipoCambio;
        case 'real':
            totalCambio = Math.fround(moneda * 62.60);
            alert(`El total quedaria en $${totalCambio} pesos arg. con impuestos incluidos`);
            return tipoCambio;
        default:
        alert('Tipo de cambio no encontrado');
        break;
    }
}

// Despues de el primer paso preguntamos si se desea continuar, de lo contrario cerramos el programa
while (respuesta == 'si' || respuesta == 'SI') {
    tipoDeCambio();
    respuesta = prompt('deseas continuar?');
}
alert('Chau, Hasta pronto');

// Se guarda en una variable el resultado retornado de la función conversora
let variable = totalCambio; */

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
listaProductos.push(new Productos('Celular Samsung', 'Modelo A22', 122000, "./img/samsungA22.jpg"));
listaProductos.push(new Productos('Celular lg', 'Modelo K20', 72000, "./img/lgK20.jpg"));
listaProductos.push(new Productos('Celular Motorola', 'Modelo G30', 102000, "./img/motorolaG30.jpg"));
listaProductos.push(new Productos('Celular Samsung', 'Modelo S21', 169999, "./img/samsungS21.jpg"));
listaProductos.push(new Productos('Celular Motorola', 'Modelo Edge 30', 119999, "./img/motorolaEdge30.jpg"));
listaProductos.push(new Productos('Celular Samsung', 'Modelo S20', 159999, "./img/samsungS20.jpg"));
listaProductos.push(new Productos('Celular Apple', 'iPhone SE', 317499, "./img/appleiPhoneSE.jpg"));
listaProductos.push(new Productos('Celular Apple', 'iPhone 14 Pro Max', 837000, "./img/appleiPhone14ProMax.jpg"));
listaProductos.push(new Productos('Celular Sony', 'Xperia 5 lv', 300000, "./img/SonyXperia5.jpg"));
listaProductos.push(new Productos('Celular Xiaomi', 'Redmi Note 9', 154800, "./img/xiaomiRedmiNote9.jpg"));

let container = document.getElementById('productos');
//let bienvenida = document.getElementById('bienvenida');

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
        result.innerHTML = `AR$${totalCambio}`; }

    if (document.getElementById('bienvenida')) {

        bienvenida = document.getElementById('bienvenida');
        // bucle para mostrar los productos mientras que el valor retornado alcance para comprar algunos de ellos
        for(const producto of listaProductos) {
            if (totalCambio > producto.precio) {

                bienvenida.remove();

                let card = document.createElement('div');
        
                card.innerHTML = `
                    <div class="card text-center shadow p-1" id="card_prod">
                        <img src=${producto.imagen} class="img_prod" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <h6 class="card-text">${producto.descripcion}</h6>
                        </div>
                        <div class="card-footer d-flex justify-content-evenly">
                            <h6 class='mt-1'>$${producto.precio}</h6>
                            <a href="#" class="btn btn-secondary rounded"><img src="./img/carrito-de-compras.png" class="img-carrito" alt=""></a>
                        </div>
                    </div>`;
            
            container.append(card);
            }
        }

    }else {

        let idCard = document.querySelectorAll("#card_prod");

        idCard.forEach(carta => {
            carta.parentElement.remove();
        });

        // bucle para mostrar los productos mientras que el valor retornado alcance para comprar algunos de ellos
    for(const producto of listaProductos) {
        if (totalCambio > producto.precio) {

            let card = document.createElement('div');
    
            card.innerHTML = `
                <div class="card text-center shadow p-1" id="card_prod">
                    <img src=${producto.imagen} class="img_prod" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                    <div class="card-footer">
                        <p>$${producto.precio}</p>
                        <a href="#" class="btn btn-secondary rounded"><img src="./img/carrito-de-compras.png" class="img-carrito" alt=""></a>
                    </div>
                </div>`;
        
        container.append(card);
        }
        
    }
    }
};

let form = document.getElementById('form');
form.addEventListener('submit', funcionImprime);

