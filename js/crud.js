import {
  fetchProducts,
  createProduct,
  saveProduct,
  deleteProduct,
} from "/services/api.js";
const d = document;
const $table = d.getElementById("crud-table");
const $title = d.querySelector(".crud-title");
const $form = d.querySelector(".crud-form");
const $template = d.getElementById("crud-template").content;
const $fragment = d.createDocumentFragment();

async function displayProducts() {
  const products = await fetchProducts();

  products.forEach((el) => {
    $template.querySelector(".add-id-product").textContent = el.id;
    $template.querySelector(".add-name-product").textContent = el.nombre;
    $template.querySelector(".add-price-product").textContent = el.precio;
    $template.querySelector(".add-cantidad-product").textContent = el.cantidad;
    $template.querySelector(".add-url-product").textContent = el.imagen;

    // // data atribius para el botonde editar
    $template.querySelector(".edit").dataset.idEdit = el.id;
    $template.querySelector(".edit").dataset.nombreEdit = el.nombre;
    $template.querySelector(".edit").dataset.precioEdit = el.precio;
    $template.querySelector(".edit").dataset.cantidadEdit = el.cantidad;
    $template.querySelector(".edit").dataset.imagenEdit = el.imagen;
    $template.querySelector(".delete").dataset.idDelete = el.id;

    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
  });

  $table.querySelector("tbody").appendChild($fragment);
}

d.addEventListener("DOMContentLoaded", displayProducts);

d.addEventListener("submit", async (e) => {
  if (e.target === $form) {
    //
    e.preventDefault();
    if (!e.target.id.value) {
      // Create- Post
      e.preventDefault();
      //Aceptar terminos y condiciones
      await Swal.fire({
        html: `por favor acepte nuestros <a href="admin.html">termininos y condiciones</a>`, //codigo html remplaza. el texto
        confirmButtonText: "Acepto",
        icon: "info", //succes,error,warning, info, question

        backdrop: true, // //estilo toost parael popup

        position: "top", //posicion el popúp: tod, top-start, tod-end, ..center, ..botton
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,

        showConfirmButton: true,
        showCancelButton: false,
        showCloseButton: false,
        closeButtonAriaLabel: "Cerrar esta alerta",
      });

      await Swal.fire({
        icon: "success",
        title: "Producto Creado",
        timer: 5000,
        timerProgressBar: true,
      });
      const product = {
        nombre: e.target.nombre.value,
        precio: e.target.precio.value,
        cantidad: e.target.cantidad.value,
        imagen: e.target.imagen.value,
      };
      await createProduct(product);
    }
    if (e.target.id.value) {
      // Edit- Put
      e.preventDefault();
      await Swal.fire({
        icon: "success",
        title: "Producto Editado",
        timer: 5000,
        timerProgressBar: true,
      });
      const product = {
        id: e.target.id.value,
        nombre: e.target.nombre.value,
        precio: e.target.precio.value,
        cantidad: e.target.cantidad.value,
        imagen: e.target.imagen.value,
      };

      await saveProduct(product);
    }
  }
});

d.addEventListener("click", async (e) => {
  if (e.target.matches(".edit")) {
    Swal.fire({
      icon: "question",
      title: `¿Desea Editar el id ${e.target.dataset.idEdit}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      timer: 10000,
      timerProgressBar: true,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        $title.textContent = "Editar Producto";
        $form.nombre.value = e.target.dataset.nombreEdit;
        $form.precio.value = e.target.dataset.precioEdit;
        $form.cantidad.value = e.target.dataset.cantidadEdit;
        $form.imagen.value = e.target.dataset.imagenEdit;
        $form.id.value = e.target.dataset.idEdit;
        $form.crear.value = "Editar";
      } else {
        await Swal.fire({
          icon: "error",
          title: "Proceso fallido",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  }
  if (e.target.matches(".delete")) {
    Swal.fire({
      icon: "question",
      title: `¿Desea eliminar el id ${e.target.dataset.idDelete}?`,
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      timer: 10000,
      timerProgressBar: true,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await Swal.fire({
          icon: "success",
          title: "Producto Eliminado",
          timer: 2000,
          timerProgressBar: true,
        });
        deleteProduct(e.target.dataset.idDelete);
      } else {
        await Swal.fire({
          icon: "error",
          title: "Proceso fallido",
          timer: 2000,
          timerProgressBar: true,
        });
      }
    });
  }
});
