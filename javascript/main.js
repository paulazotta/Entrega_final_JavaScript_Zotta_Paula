
// HEADER 
let header = document.getElementById ("header");
header.innerHTML = `
    <nav>
        <ul>
            <li>
                <img class="logo-header" src="imagenes/logo.jpg" alt="logo_diagnostico">
                <a href="HTML/contacto.html">Contacto</a>
                <div id="verCarrito">
                    <p class="texto-carrito">Ver carrito🛒 <span id="cantidadCarrito" class="cantidadCarrito"></span></p>
                </div> 
            </li>
            
        </ul>
    </nav>
`;

//<a href="HTML/productos.html">Productos</a>

// CONTENEDOR PRINCIPAL 
let contenedorPrincipal = document.getElementById("contenedorPrincipal");
contenedorPrincipal.innerHTML = `
    <h2 class="bajada">Todo lo necesario para el correcto diagnóstico de averías automotrices</h2>
    <p class="frase-inicial">Hace 20 años nos dedicamos a la venta de scanners de diagnóstico automotriz. Somos representantes de las marcas Autel, Foxwell y Fcar. </p>
    <img class="imagenes-destacadas" src="imagenes/MX_808.jpg" alt="Destacado 1">
    <img class="imagenes-destacadas" src="imagenes/MS_906BT.jpg" alt="Destcado 2">
    <img class="imagenes-destacadas" src="imagenes/MD_808Pro.jpg" alt="Destacado 3">
    
`;


