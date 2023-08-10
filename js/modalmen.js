const previusGallBtnMen = document.getElementById("previusMen");
const nextGallBtnMen = document.getElementById("nextMen");

const imageContMen = document.getElementById("galeria-imagen-hombre");
let indexMen = 1;
const imagesUrlsMen = [
  "images/masc1.jpg",
  "images/masc2.jpg",
  "images/masc3.jpg",
  "images/masc4.jpg",
];

nextGallBtnMen.addEventListener("click", () => {
  changeNextImageMen(imageContMen);
});
previusGallBtnMen.addEventListener("click", () => {
  changePreviusImageMen(imageContMen);
});

function changeNextImageMen(imageContMen) {
  if (indexMen == 3) {
    indexMen = 0;
  } else {
    indexMen++;
  }
  imageContMen.style.backgroundImage = `url('${imagesUrlsMen[indexMen]}')`;
}

function changePreviusImageMen(imageContMen) {
  if (indexMen == 0) {
    indexMen = 3;
  } else {
    indexMen--;
  }
  imageContMen.style.backgroundImage = `url('${imagesUrlsMen[indexMen]}')`;
}
