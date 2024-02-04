let carritoVisible = false;

document.addEventListener('DOMContentLoaded', initListeners);

function initListeners() {
    const botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    Array.from(botonesEliminarItem).forEach(button => {
        button.addEventListener('click', eliminarItemCarrito);
    });

    const botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    Array.from(botonesSumarCantidad).forEach(button => {
        button.addEventListener('click', sumarCantidad);
    });

    const botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
    Array.from(botonesRestarCantidad).forEach(button => {
        button.addEventListener('click', restarCantidad);
    });

    const botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
    Array.from(botonesAgregarAlCarrito).forEach(button => {
        button.addEventListener('click', agregarAlCarritoClicked);
    });

    document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked);
}

function eliminarItemCarrito(event) {
    const buttonClicked = event.target;
    const item = buttonClicked.parentElement.parentElement;
    item.remove();

    actualizarTotalCarrito();
    ocultarCarrito();
}

function actualizarTotalCarrito() {
    const carritoItems = document.getElementsByClassName('carrito-item');
    let total = 0;

    Array.from(carritoItems).forEach(item => {
        const precioElemento = item.querySelector('.carrito-item-precio');
        const precio = parseFloat(precioElemento.textContent.replace('$', '').replace('.', ''));
        const cantidadItem = item.querySelector('.carrito-item-cantidad');
        const cantidad = cantidadItem.value;
        total += precio * cantidad;
    });

    total = Math.round(total * 100) / 100;
    document.querySelector('carrito-precio-total').textContent = `$${total.toLocaleString("es")},00`;
}



function ocultarCarrito() {
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    if (carritoItems.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

function sumarCantidad(event) {
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    
    actualizarTotalCarrito();
}

function restarCantidad(event){
    let buttonClicked = event.target;
    let selector = buttonClicked.parentElement;
    let cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    cantidadActual--;

    if(cantidadActual >= 1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        actualizarTotalCarrito();
    }
}

function agregarAlCarritoClicked(event){
    let button = event.target;
    let item = button.parentElement;
    let titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    let precio = item.getElementsByClassName('precio-item')[0].innerText;
    let imagenSrc = item.getElementsByClassName('img-item')[0].src;

    agregarItemAlCarrito(titulo, precio, imagenSrc);
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    let item = document.createElement('div');
    item.classList.add('item');
    let itemsCarrito = document.getElementsByClassName('carrito-items')[0];
    
    let nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(let i = 0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText == titulo){
            alert("El producto ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `
    <div class="carrito-item">
        <img src="${imagenSrc}" alt="" width="10%">
        <div class="carrito-item-detalles">
            <span class="carrito-item-titulo">${titulo}</span>
            <div class="selector-cantidad">
                <i class="bi bi-dash-lg restar-cantidad"></i>
                <input type="text" value="1" class="carrito-item-cantidad" disabled>
                <i class="bi bi-plus-lg sumar-cantidad"></i>
            </div>
            <span class="carrito-item-precio">${precio}</span>
        </div>
        <span class="btn-eliminar">
            <i class="bi bi-trash-fill"></i>
        </span>
    </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    item.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarItemCarrito);

    let botonesSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
    botonesSumarCantidad.addEventListener('click', sumarCantidad);

    let botonesRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
    botonesRestarCantidad.addEventListener('click', restarCantidad);
}

function pagarClicked(event){
    alert("Gracias por su compra");
    
    let carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
        carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();

    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}
