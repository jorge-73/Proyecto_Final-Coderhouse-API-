alert('Bienvenido al Convertidor de moneda');
alert("Se puede elegir entre: 'dolar', 'dolar blue', 'euro' y 'real'");
let respuesta = prompt('empezamos?');

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
        break;
        case 'dolar blue':
            totalCambio = Math.fround(moneda * 312);
            alert(`El total quedaria en $${totalCambio} pesos arg. mas impuestos`);
        break;
        case 'euro':
            totalCambio = Math.fround(moneda * 283.50);
            alert(`El total quedaria en $${totalCambio} pesos arg. con impuestos incluidos`);
        break;
        case 'real':
            totalCambio = Math.fround(moneda * 62.60);
            alert(`El total quedaria en $${totalCambio} pesos arg. con impuestos incluidos`);
        break;
        default:
        alert('Tipo de cambio no encontrado');
        break;
    }
}

while (respuesta == 'si' || respuesta == 'SI') {
    tipoDeCambio();
    respuesta = prompt('deseas continuar?');
}
alert('Chau, Hasta pronto');


