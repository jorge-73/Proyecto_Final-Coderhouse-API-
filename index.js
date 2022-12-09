alert('Bienvenido al Convertidor de moneda');
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
let variable = totalCambio;

// Creación del constructor para los productos de ejemplo que se mostraran como propaganda
class Productos{
    constructor(nombre, descripcion, precio){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

// Lista de los objetos/productos creados mientras se lo va guardando en un array
const listaProductos = [];
listaProductos.push(new Productos('Celular Samsung', 'Modelo A22', 122000));
listaProductos.push(new Productos('Celular lg', 'Modelo K20', 72000));
listaProductos.push(new Productos('Celular Motorola', 'Modelo G30', 102000));
listaProductos.push(new Productos('Celular Samsung', 'Modelo S21', 169999));
listaProductos.push(new Productos('Celular Motorola', 'Modelo Edge 30', 119999));
listaProductos.push(new Productos('Celular Samsung', 'Modelo S20', 159999));
listaProductos.push(new Productos('Celular Apple', 'iPhone SE', 317499));
listaProductos.push(new Productos('Celular Apple', 'iPhone 14 Pro Max', 837000));
listaProductos.push(new Productos('Celular Sony', 'Xperia 5 lv', 300000));
listaProductos.push(new Productos('Celular Xiaomi', 'Redmi Note 9', 154800));

// bucle para mostrar los productos por ahora en consola. Mientras que el valor retornado alcance para comprar uno de los productos
for(const producto of listaProductos) {
    if (variable < producto.precio) {
        console.log(`
        Nombre: ${producto.nombre}
        Descripción: ${producto.descripcion}
        Precio: ${producto.precio}
        `);
    }
}

/*
let container = document.getElementById('container');

 for(const producto of listaProductos) {
    if (variable > producto.precio) {

        let ul = document.createElement('ul');
        ul.innerHTML = `
        <li>Nombre: ${producto.nombre}</li>
        <li>Descripción: ${producto.descripcion}</li>
        <li>Precio: ${producto.precio}</li>
        `;
        
    container.append(ul);
    }
} */
