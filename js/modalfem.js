const previusGallBtnfem = document.getElementById("previusfem");
const nextGallBtnfem = document.getElementById("nextfem");
const imageContfem = document.getElementById("galeria-imagen-mujer");
let indexfem = 1;
const imagesUrlsfem = [
  "images/fem1.jpg",
  "images/fem2.jpg",
  "images/fem3.jpg",
  "images/fem4.jpg",
];

nextGallBtnfem.addEventListener("click", () => {
  changeNextImagefem(imageContfem);
});
previusGallBtnfem.addEventListener("click", () => {
  changePreviusImagefem(imageContfem);
});

function changeNextImagefem(imageContfem) {
  // Corregido el nombre de la función
  if (indexfem == 3) {
    indexfem = 0;
  } else {
    indexfem++;
  }
  imageContfem.style.backgroundImage = `url('${imagesUrlsfem[indexfem]}')`;
}

function changePreviusImagefem(imageContfem) {
  // Corregido el nombre de la función
  if (indexfem == 0) {
    // Corregido el índice inicial
    indexfem = 3;
  } else {
    indexfem--;
  }
  imageContfem.style.backgroundImage = `url('${imagesUrlsfem[indexfem]}')`;
}
