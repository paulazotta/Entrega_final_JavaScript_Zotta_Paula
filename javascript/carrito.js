let valorDelDolar = 1100;

// CREAR CARRITO 
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

class CarritoCheckOut{
    constructor(id, modelo, precio, cantidad, img){
        this.id= parseFloat(id);
        this.modelo = modelo;
        this.precio = parseFloat(precio);
        this.cantidad = parseFloat(cantidad);
        this.img = img;
        //guardarStorage();
    };
};


// AGREGAR AL CARRITO 
function agregarAlCarrito (id, modelo, precio, cantidad, img){
    const nuevoElemento = new CarritoCheckOut( id, modelo, precio, cantidad, img);
    carrito.push(nuevoElemento);
    guardarStorage();
};

// -----------------  CARDS -----------------

const container = document.getElementById("container");

const mostrarProductos = async() => {
    const response = await fetch ("javascript/productos.json")
    const data = await response.json();
        //console.log(data);
    
    const arrayProductos = data;

        arrayProductos.forEach (el => {
            // Creo las cards
                const card = document.createElement("div");
                card.className = "card";
        
                const img = document.createElement("img");
                img.src = el.img;
                img.className = "imagenesProductos"
        
                const modelo = document.createElement("h3");
                modelo.innerText = el.modelo;
                
                const precio = document.createElement("h5");
                precio.innerText = `$${el.precio * valorDelDolar}`;
                
                const botonAregarCarrito =document.createElement("button");
                botonAregarCarrito.innerText = "Agregar al carrito";
                botonAregarCarrito.className ="boton-carrito";
                
            
            // Funcionalidad del botón del carrito    
                botonAregarCarrito.addEventListener("click", () =>{

                const repeat = carrito.some ((repeatEl) => repeatEl.id === el.id);
                console.log(repeat)
                if (repeat) {
                    carrito.map((item) => {
                        if (item.id === el.id) {
                            item.cantidad++;
                        }
                    });
                } else {
                    agregarAlCarrito(el.id, el.modelo, el.precio * valorDelDolar, el.cantidad, el.img);
                }
                numeroCarrito(); 
                guardarStorage(); 
            }); 

            // Las agrego  
                card.appendChild(img);
                card.appendChild(modelo);
                card.appendChild(precio);
                card.appendChild(botonAregarCarrito)

                container.appendChild(card)

                //todosLosProductos.push(el)
            })
            
            
    };


// BOTÓN MOSTRAR / OCULTAR EQUIPOS con LOADER
const botonHTML = document.getElementById("btn");
const agregarLoader = document.getElementById("agregarLoader");


let flag = false;
botonHTML.addEventListener("click", () =>{
    if (!flag){
        const loader = document.createElement("span");
        loader.className = "loader";
        agregarLoader.appendChild(loader);
        setTimeout (()=>{
            botonHTML.innerText ="Ocultar equipos"
            mostrarProductos();
            flag = true

            agregarLoader.removeChild(loader);
        }, 1000);
        
        }  else {
        const loader = document.createElement("span");
        loader.className = "loader";
        agregarLoader.appendChild(loader);
        setTimeout (()=>{
            botonHTML.innerText ="Mostrar equipos"
            container.innerHTML="";
            flag = false

            agregarLoader.removeChild(loader);
        }, 1000);
        
    }
});
    

const checkOutContainer = document.getElementById("checkOutContainer");

// -----------------VER CARRITO----------------- 
;
const pintarCarrito = () => {

// Funcionalidad al h1 "ver carrito"

    checkOutContainer.innerHTML = ""; 
    checkOutContainer.style.display = "flex";


// Creo el header del checkout    
    const headerCheckOut = document.createElement("div");
    headerCheckOut.className = "header-checkout";
    headerCheckOut.innerHTML =`
    <h2 class="checkout-header-titulo">Checkout</h2>
    `;

// Lo agrego
    checkOutContainer.appendChild(headerCheckOut)

// Creo la X para cerrar el carrito 
    const headerButton = document.createElement("h2");
    headerButton.innerText = "X";
    headerButton.className = "header-button"; 

// Para hacer que si toco la X se cierre el carrito 
    headerButton.addEventListener(("click"), () =>{
        headerCheckOut.style.display = "none";
    })

// Agrego la X
    headerCheckOut.appendChild(headerButton);

// Contenido del carrito // ACA HAY QUE SACAR O CORREGIR LO DE LA IMAGEN 
    carrito.forEach ((el) =>{
        let contenidoCarrito = document.createElement("div");
        contenidoCarrito.className = "contenido-carrito";
        contenidoCarrito.innerHTML = `
        <h3> Producto ${el.modelo}</h3>
        <p> Precio $ ${el.precio * valorDelDolar}</p>
        <p>Cantidad: ${el.cantidad}</p>
        <p>Total: $ ${el.precio * el.cantidad}</p>
        <img> ${el.img}</img>
        `;
        guardarStorage();
 // Lo agrego
    headerCheckOut.appendChild(contenidoCarrito)

// Eliminar productos del carrito 
    // Creo la X
    let eliminar = document.createElement("button");
    eliminar.innerText = "❌";
    eliminar.className = "eliminar-producto";

// La agrego
   contenidoCarrito.appendChild(eliminar)

// Funcionalidad al botón eliminar 

eliminar.addEventListener("click", () => eliminarProducto(el.id));
numeroCarrito();
guardarStorage();


});

        
// SUMAR EL TOTAL DEL CARRITO 
    const total = carrito.reduce((acumulador, el) => acumulador + el.precio * valorDelDolar * el.cantidad, 0); 
       
// Mostrar total de la compra    
    const totalDeLaCompra = document.createElement("div");
    totalDeLaCompra.className = "total-compra";
    totalDeLaCompra.innerHTML =`Total a pagar: $ ${total}`;

//Lo agrego
    headerCheckOut.appendChild(totalDeLaCompra)
        

}; 


const verCarrito =document.getElementById("verCarrito");
verCarrito.addEventListener("click", pintarCarrito);



const eliminarProducto =(id) =>{
    const foundIndex = carrito.findIndex((el) => el.id === id);
    
   if (foundIndex !== -1) {
    carrito.splice(foundIndex, 1);
    pintarCarrito();
    guardarStorage();
   }
   
}


// GUARDAR EN EL LOCAL STORAGE

const guardarStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}; 

// CANTIDAD CARRITO 

const cantidadCarrito = document.getElementById("cantidadCarrito");

const numeroCarrito = () =>{
    cantidadCarrito.style.display = "block";
    const carritolength = carrito.length
    localStorage.setItem("carritolength", JSON.stringify(carritolength))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritolength"));
}

numeroCarrito();
