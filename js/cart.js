const cartIconBtn = document.querySelector(".carro-usuario");
const cartModal = document.querySelector(".modal-carro");

cartIconBtn.addEventListener("click", () => {
  cartModal.classList.toggle("show");
});

// Aumentar y disminuir cantidad
let minusBtn = document.querySelector(".input-minus");
let plusBtn = document.querySelector(".input-plus");
let userInput = document.querySelector(".input-number");

let userInputNumber = 0;

minusBtn.addEventListener("click", () => {
  userInputNumber--;
  if (userInputNumber <= 0) {
    userInputNumber -= 0;
  }
  userInput.value = userInputNumber;
  console.log(userInputNumber);
});

plusBtn.addEventListener("click", () => {
  userInputNumber++;
  userInput.value = userInputNumber;
  console.log(userInputNumber);
});

//realizado

//Boton send
const sendBtn = document.querySelector(".btn-send");

sendBtn.addEventListener("click", () => {
  // Obtener los productos del carrito
  const carritoProducto = document.querySelector("#productos");
  const productosEnCarrito =
    carritoProducto.querySelectorAll(".modal-carro-item");

  // Crear un array para almacenar los productos comprados
  const productosComprados = [];

  // Recorrer los elementos del carrito y obtener la información de los productos
  productosEnCarrito.forEach((productoElemento) => {
    const productId = parseInt(productoElemento.getAttribute("data-id"));
    const cantidadValor = productoElemento.querySelector(
      ".modal-carro-cantidad-valor"
    );
    const cantidad = parseInt(cantidadValor.textContent.split(":")[1]);
    const productInfo = {
      productId: productId,
      cantidad: cantidad,
    };
    productosComprados.push(productInfo);
  });

  // Borrar los productos del Local Storage
  function borrarProductosLocalStorage() {
    localStorage.removeItem("carrito");
  }

  // Llamar a la función para borrar los productos del Local Storage
  borrarProductosLocalStorage();
});

//Enviar cantidad a la notificacion del carrito
const addToCartBtn = document.querySelector(".add-cart");
let cartNoti = document.querySelector(".carrito-noti");
let lastValue = parseInt(cartNoti.innerText);

addToCartBtn.addEventListener("click", async () => {
  //publicidad con sweetalert2
  await Swal.fire({
    title: "Fall Limited Edition Sneakers", //Titulo del modal.
    html: `<a href="index.html">Comprar ahora</a>`, //codigo html remplaza. el texto
    icon: undefined, //succes,error,warning, info, question .
    footer: "anuncio", //footer texto o html.
    width: `300px`, //
    padding: "1rem", //
    background: "#fff", //
    grow: false, //"row", "colum","fullscreem", false.
    backdrop: false, //
    timer: 3000, //tiempo que queremos para el popup
    timerProgressBar: true, //si quieres que muestre una barra que progreso
    toast: false, //estilo toost para el popup
    position: "bottom-end", //posicion el popúp: tod, top-start, tod-end, ..center, ..botton
    allowOutsideClick: false, //
    allowEscapeKey: false, //
    stopKeydownPropagation: false, //permitir que los eventos de teclado del documento sigan funcionando

    showConfirmButton: false,
    showCancelButton: false,
    showCloseButton: true, //si quiere mostrar la x para cerrar
    closeButtonAriaLabel: "Cerrar esta alerta",

    imageUrl: "images/image-product-1.jpg",
    imageWidth: "100%",
    imageAlt: "Imagen de una computadora",
  });

  lastValue = lastValue + userInputNumber;

  cartNoti.innerText = lastValue;
  cartNoti.style.display = "block";
  drawProductInModal();
  localStorage.setItem("carrito-noti", lastValue); //guardar en el localStorage
});
// Llamar base de datos de productos
let productos = [];

function cargarProductos() {
  fetch("http://localhost:3000/productos/")
    .then((response) => response.json())
    .then((data) => {
      productos = data;

      // Encontrar los botones "Add to cart"
      const addToCartBtns = document.querySelectorAll(".add-cart");

      // Escuchar el evento click de los botones "Add to cart"
      addToCartBtns.forEach((addToCartBtn) => {
        addToCartBtn.addEventListener("click", () => {
          // Encontrar el contenedor de productos en el carrito
          const carritoProducto = document.querySelector("#productos");

          // Obtener el data-id del botón
          const dataId = parseInt(addToCartBtn.getAttribute("data-id"));

          // Obtener el elemento correspondiente del array según el data-id
          const product = productos[dataId - 1];

          // Verificar si el producto ya existe en el carrito
          const productoExistente = buscarProductoEnCarrito(product.id);

          if (productoExistente) {
            // Si el producto ya existe, incrementar la cantidad
            const cantidadValor = productoExistente.querySelector(
              ".modal-carro-cantidad-valor"
            );
            let cantidad = parseInt(cantidadValor.textContent.split(":")[1]);
            cantidad++;
            cantidadValor.textContent = `cant:${cantidad}`; // Agrega el formato "cant:2"
          } else {
            // Si el producto no existe, crear el elemento del producto en el carrito
            const productoElemento = crearProductoElemento(product);
            carritoProducto.appendChild(productoElemento);
          }

          // Guardar el estado actual del carrito en localStorage
          guardarCarritoEnLocalStorage();

          // Configurar evento para el botón "Eliminar" del nuevo producto
          configurarEventoEliminar(productoElemento);
        });
      });
    })
    .catch((error) => console.log(error));
}

// Buscar un producto en el carrito por su id
function buscarProductoEnCarrito(productId) {
  const carritoProducto = document.querySelector("#productos");
  const productosEnCarrito =
    carritoProducto.querySelectorAll(".modal-carro-item");
  for (const productoElemento of productosEnCarrito) {
    const productIdData = parseInt(productoElemento.getAttribute("data-id"));
    if (productIdData === productId) {
      return productoElemento;
    }
  }
  return null;
}

// Crear el elemento del producto en el carrito
function crearProductoElemento(product) {
  const productoElemento = document.createElement("div");
  productoElemento.classList.add("modal-carro-item");
  productoElemento.setAttribute("data-id", product.id);
  productoElemento.innerHTML = `
    <img src="${product.imagen}" alt="${product.nombre}" class="modal-carro-imagen">
    <div class="modal-carro-info">
      <h5 class="modal-carro-nombre">${product.nombre}</h5>
      <p class="modal-carro-precio">$ ${product.precio}</p>
    </div>
    <div class="modal-carro-cantidad">
      <span class="modal-carro-cantidad-valor">cant:${userInputNumber}</span>
    </div>
    <button class="modal-carro-eliminar" data-id="${product.id}">Eliminar</button>
  `;

  // Configurar evento para el botón "Eliminar"
  const eliminarBtn = productoElemento.querySelector(".modal-carro-eliminar");
  eliminarBtn.addEventListener("click", () => {
    const carritoProducto = document.querySelector("#productos");
    carritoProducto.removeChild(productoElemento);
    guardarCarritoEnLocalStorage();
  });

  return productoElemento;
}

// Recuperar el estado del carrito almacenado en localStorage
function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    const carritoProducto = document.querySelector("#productos");
    carritoProducto.innerHTML = carritoGuardado;

    // Configurar eventos para los botones "Eliminar"
    const eliminarBtns = carritoProducto.querySelectorAll(
      ".modal-carro-eliminar"
    );
    eliminarBtns.forEach((eliminarBtn) => {
      configurarEventoEliminar(eliminarBtn.parentElement);
    });
  }
  // Configurar eventos para los botones "Eliminar" al cargar desde el almacenamiento local
  const eliminarBtns = carritoProducto.querySelectorAll(
    ".modal-carro-eliminar"
  );
  eliminarBtns.forEach((eliminarBtn) => {
    configurarEventoEliminar(eliminarBtn.parentElement);
  });
}

// Configurar evento click para el botón "Eliminar" del producto
function configurarEventoEliminar(productoElemento) {
  const eliminarBtn = productoElemento.querySelector(".modal-carro-eliminar");
  eliminarBtn.addEventListener("click", () => {
    const carritoProducto = document.querySelector("#productos");
    carritoProducto.removeChild(productoElemento);
    guardarCarritoEnLocalStorage();
  });
}

// Guardar el estado actual del carrito en localStorage
function guardarCarritoEnLocalStorage() {
  const carritoProducto = document.querySelector("#productos");
  const carritoHTML = carritoProducto.innerHTML;
  localStorage.setItem("carrito", carritoHTML);
}

// Llamar a la función para cargar los productos
cargarProductos();

// Cargar el estado del carrito desde localStorage al cargar la página
window.addEventListener("load", () => {
  cargarCarritoDesdeLocalStorage();
});
