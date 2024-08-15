const productos = document.getElementById("productos")
const carrito = document.getElementById("carrito")
const Carrito = JSON.parse(localStorage.getItem("carrito")) || []

const Productos = [
    {
        imagen: "https://acdn.mitiendanube.com/stores/002/872/034/products/4613d7331-ba97feb8ecbd69550316773847895589-480-0.webp",
        titulo: "Arsenal 1998 - 99",
        precio: 59000

    },
    {
        imagen: "https://retrocampeones.com/cdn/shop/files/424e0571.jpg?v=1712257761&width=493",
        titulo: "Argentina 1986",
        precio: 69000

    },
    {
        imagen: "https://acdn.mitiendanube.com/stores/002/872/034/products/19a694a41-c7f39012eb053a51dc16789779553651-480-0.webp",
        titulo: "Manchester United 2004 - 06",
        precio: 59000,

    },
    {
        imagen: "https://acdn.mitiendanube.com/stores/004/269/759/products/tit-87-88-retro-1-10826838111c3f5c6b17074537101820-640-0.webp",
        titulo: "Napoli 1987-88",
        precio: 61000,
    },
    {
        imagen: "https://acdn.mitiendanube.com/stores/004/269/759/products/tit-96-retro-1-16cd6cc0d1d75963f717074377659954-640-0.webp",
        titulo: "AC Milan 1996",
        precio: 52000,
    },
    {
        imagen: "https://acdn.mitiendanube.com/stores/004/269/759/products/sup-97-98-retro-1-18c5dfe09fa7bb0c5117074506420426-640-0.webp",
        titulo: "Inter Milan 1997-98 Suplente",
        precio: 52000,
    },
];

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
    precioDOM.innerText = precio
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
    carrito.innerHTML = ""

    const totalDOM = document.createElement("h3")

    const total = Carrito.reduce((acc, el)=>{
        return acc + el.cantidad * el.precio
    },0)

    totalDOM.innerText = total

    Carrito.forEach(el =>{
        carrito.appendChild(creadoraDeCardsDeCarrito(el.titulo, el.precio, el.cantidad))
        carrito.appendChild(totalDOM)
    })
    localStorage.setItem("carrito", JSON.stringify(Carrito))
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


Productos.forEach(el => {
    const productoDOM = creadoraDeCards(el.titulo, el.imagen, el.precio)

    productos.appendChild(productoDOM)
})


document.addEventListener("DOMContentLoaded",()=>{
    actualizadoraDeCarrito()
})