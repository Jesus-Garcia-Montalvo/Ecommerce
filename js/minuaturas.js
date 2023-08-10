//Cambiar imagenes de galeria modal desde las minituras
let thumbnails = document.querySelectorAll(".miniatura-galeria");
thumbnails = [...thumbnails];

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (event) => {
    imageCont.style.backgroundImage = `url('images/image-product-${event.target.id}.jpg')`;
  });
});

//Cambiar imagenes de galeria modal desde las minituras Mujer
const imageContFem = document.querySelector(".galeria-imagen-mujer");
let thumbnailsFem = document.querySelectorAll(".miniatura-galeria-fem");
thumbnailsFem = [...thumbnails];

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (event) => {
    imageContFem.style.backgroundImage = `url('images/fem${event.target.id}.jpg')`;
  });
});

//Cambiar imagenes de galeria modal desde las minituras Hombre
const imageContMasc = document.querySelector(".galeria-imagen-hombre");
let thumbnailsMasc = document.querySelectorAll(".miniatura-galeriaMen");
thumbnailsMasc = [...thumbnails];

thumbnailsMasc.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (event) => {
    imageContMasc.style.backgroundImage = `url('images/masc${event.target.id}.jpg')`;
  });
});
