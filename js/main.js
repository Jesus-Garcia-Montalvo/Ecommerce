nextGallBtn.addEventListener("click", () => {
  changeNextImage(imageCont);
});
previusGallBtn.addEventListener("click", () => {
  changePreviusImage(imageCont);
});

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
