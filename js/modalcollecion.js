//Cambiar imagenes con flechas
const previusGallBtn = document.querySelector(".previus");
const nextGallBtn = document.querySelector(".next");
const imageCont = document.querySelector(".galeria-imagen");
let imgIndex = 1;
const imagesUrls = [
  "images/image-product-1.jpg",
  "images/image-product-2.jpg",
  "images/image-product-3.jpg",
  "images/image-product-4.jpg",
];

nextGallBtn.addEventListener("click", () => {
  changeNextImage(imageCont);
});
previusGallBtn.addEventListener("click", () => {
  changePreviusImage(imageCont);
});

//Cambiar imagenes de galeria modal desde las minituras
let thumbnails = document.querySelectorAll(".miniatura-galeria");
thumbnails = [...thumbnails];

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (event) => {
    imageCont.style.backgroundImage = `url('images/image-product-${event.target.id}.jpg')`;
  });
});

//Funciones
function changeNextImage(imgContainer) {
  if (imgIndex == 4) {
    imgIndex = 1;
  } else {
    imgIndex++;
  }
  imgContainer.style.backgroundImage = `url('images/image-product-${imgIndex}.jpg')`;
}

function changePreviusImage(imgContainer) {
  if (imgIndex == 1) {
    imgIndex = 4;
  } else {
    imgIndex--;
  }
  imgContainer.style.backgroundImage = `url('images/image-product-${imgIndex}.jpg')`;
}
