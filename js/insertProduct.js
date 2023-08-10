let mostrarprductos = d.querySelector(".insertar");

//peticio para mostrar elementos

const res = await fetch("http://localhost:3000/productos/"),
  data = await res.json();

console.log(data);
data.forEach((e) => {
  //Desestructuración
  const { nombre, imagen } = e;

  mostrarprductos.innerHTML += `

        <div class="card men card" style="width: 18rem" id="collecion">
          <img
            class="card-img-top"
            src="${imagen}"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">
              Versatile men's shoes that effortlessly combine style and
              functionality, making them an essential addition to any
              gentleman's footwear collection.
            </p>
            <a href="#" id="men-collection" class="btn info-btn"
              >See collection</a
            >
          </div>
        </div>
  
    
    `;
});
