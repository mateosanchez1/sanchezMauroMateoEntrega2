const url = "./data.json";
const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("carrito")) || []
const botonCompraDOM = document.getElementById("botonCompra")

fetch(url)
.then(res => res.json())
.then(data => mostrarProductos(data))



const restadoraAlCarrito = (titulo) => {
    const producto = Carrito.find(el => {
        return el.titulo === titulo
    })

    if(producto.cantidad <= 1){
        let arrayDetitulos = Carrito.map(el => {
            return el.titulo
        })

        let index = arrayDetitulos.indexOf(titulo)

        Carrito.splice(index, 1)
    }else{
        producto.cantidad -= 1
    }
    actualizadoraDeCarrito()
}

const sumadoraAlCarrito = (titulo) => {
    const producto = Carrito.find(el => {
            return el.titulo === titulo
    })
    producto.cantidad += 1
    actualizadoraDeCarrito()
}


const creadoraDeCardsDeCarrito = (titulo, precio, cantidad) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const precioDOM = document.createElement("p")
    const contenedorCantidad = document.createElement("div")
    const cantidadDOM = document.createElement("p")
    const botonPlusDOM = document.createElement("button")
    const botonMinumDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    precioDOM.classList.add("precio")
    cantidadDOM.classList.add("cantidad")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + (precio * cantidad);
    cantidadDOM.innerText = cantidad

    botonPlusDOM.innerText = "+"
    botonMinumDOM.innerText = "-"

    botonPlusDOM.addEventListener("click", ()=>{
        sumadoraAlCarrito(titulo)
    })

    botonMinumDOM.addEventListener("click", ()=>{
        restadoraAlCarrito(titulo)
    })

    contenedorCantidad.appendChild(botonMinumDOM)
    contenedorCantidad.appendChild(cantidadDOM)
    contenedorCantidad.appendChild(botonPlusDOM)

    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(contenedorCantidad)

    return contenedor
}


const actualizadoraDeCarrito = () => {
    carrito.innerHTML = "";
    const total = Carrito.reduce((acc, el) => {
        return acc + el.cantidad * el.precio;
    }, 0);
    
    const totalDOM = document.createElement("p");
    totalDOM.innerText = "Total de compra: $" + total; 

    botonCompraDOM.addEventListener("click", () => {
        Swal.fire("El total de su compra es de $" + total);
    });

    Carrito.forEach(el => {
        carrito.appendChild(creadoraDeCardsDeCarrito(el.titulo, el.precio, el.cantidad));
    });

    carrito.appendChild(totalDOM); 
    carrito.appendChild(botonCompraDOM);
    localStorage.setItem("carrito", JSON.stringify(Carrito));
}


const agregadoraAlCarrito = (titulo, precio) => {
    const booleano = Carrito.some(el => {
        return el.titulo === titulo

    })

    if(booleano){
        const producto = Carrito.find(el => {
            return el.titulo === titulo
        })
        producto.cantidad += 1
    }else{
        Carrito.push({
            titulo,
            precio,
            cantidad: 1
        })
    }
    actualizadoraDeCarrito()

    Swal.fire("Se ha añadido el producto al carro de compras!");
}

const creadoraDeCards = (titulo, imagen, precio) => {
    const contenedor = document.createElement("div")
    const tituloDOM = document.createElement("h3")
    const imagenDOM = document.createElement("img")
    const precioDOM = document.createElement("p")
    const botonDOM = document.createElement("button")

    contenedor.classList.add("contenedor")
    tituloDOM.classList.add("titulo")
    imagenDOM.classList.add("imagen")
    precioDOM.classList.add("precio")
    botonDOM.classList.add("boton")

    tituloDOM.innerText = titulo
    precioDOM.innerText = "$" + precio
    botonDOM.innerText = "Comprar"

    imagenDOM.src = imagen

    botonDOM.addEventListener("click", ()=>{
        agregadoraAlCarrito(titulo, precio)
    })


    contenedor.appendChild(tituloDOM)
    contenedor.appendChild(imagenDOM)
    contenedor.appendChild(precioDOM)
    contenedor.appendChild(botonDOM)

    return contenedor
}


function mostrarProductos(Productos){
    Productos.forEach(el => {
        const productoDOM = creadoraDeCards(el.titulo, el.imagen, el.precio)
    
        productos.appendChild(productoDOM)
    })
    
    
    document.addEventListener("DOMContentLoaded",()=>{
        actualizadoraDeCarrito()
    })
}

document.getElementById('carritoCompra').addEventListener('click', function() {
    var carrito = document.getElementById('carrito');
    if (carrito.style.display === 'none' || carrito.style.display === '') {
        carrito.style.display = 'block'; // Muestra el carrito
    } else {
        carrito.style.display = 'none'; // Oculta el carrito
    }
});