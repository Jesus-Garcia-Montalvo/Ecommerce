const d = document;
let $form = document.getElementById("form");

$form.addEventListener("submit", async (e) => {
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
    title: "Compra realizada",
    timer: 5000,
    timerProgressBar: true,
  });
  const $nane = d.querySelector("#userName").value;
  const $lastname = d.querySelector("#userLastName").value;
  const $email = d.querySelector("#userEmail").value;
  const $document = d.querySelector("#userId").value;
  const $cardnumber = d.querySelector("#userCard").value;

  let respuesta = await fetch("http://localhost:5000/clientes/", {
    method: "POST",
    body: JSON.stringify({
      $nane,
      $lastname,
      $email,
      $document,
      $cardnumber,
    }),
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
  $form.reset();
  window.location.reload();
});
