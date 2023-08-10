// validation.js

// Definimos una función llamada 'applyValidation'
function applyValidation() {
  "use strict";

  // Buscamos todos los formularios a los que queremos aplicar estilos de validación personalizados de Bootstrap
  const forms = document.querySelectorAll(".needs-validation");

  // Iteramos sobre cada formulario y evitamos el envío del mismo
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        // Si el formulario no es válido...
        if (!form.checkValidity()) {
          // Prevenimos el envío del formulario y detenemos la propagación del evento
          event.preventDefault();
          event.stopPropagation();
        }

        // Agregamos la clase 'was-validated' al formulario para mostrar los estilos de validación
        form.classList.add("was-validated");
      },
      false
    );
  });
}

applyValidation();
