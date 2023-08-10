//Mostrar menú hamburguesa
const burgerMenu = document.querySelector(".header_menu");
const modalNavbar = document.querySelector(".responsive-barra");
const closeModalNavbar = document.querySelector(".responsive-close");

modalNavbar.style.display = "none";

burgerMenu.addEventListener("click", () => {
  modalNavbar.style.display = "block";
});

closeModalNavbar.addEventListener("click", () => {
  modalNavbar.style.display = "none";
});

// women collection
const womenCollection = document.getElementById("women-collection");
womenCollection.addEventListener("click", () => {
  location.href = "women.html";
  console.log("Boton mujer");
});

// Men collection
const menCollection = document.getElementById("men-collection");
menCollection.addEventListener("click", () => {
  location.href = "men.html";
  console.log("Boton hombre");
});
