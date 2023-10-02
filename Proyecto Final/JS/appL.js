//-----------------SECCION LIBROS-------------------------

  const titulo = document.getElementById("title")
  const listado = document.getElementById("listL")
  const autor = document.getElementById("autor")
  const btnGL = document.getElementById("GL")
  const btnAL = document.getElementById("AL")
  const btnCEL = document.getElementById("CEL")
  const estado = document.getElementById("estado")

  let idG
  listar()

async function guardarL()
  {
    //axios.post("http://localhost:3000/Libros" , {titulo: titulo.value , Autor: autor.value})
    //.then(function(respuesta){alert("GRABADO")})

    respuesta = await axios.post("http://localhost:3000/Libros" , {titulo: titulo.value , Autor: autor.value, Estado: estado.value})
      alert("Grabacion OK")
  }

  async function listar()
  {
    respuesta = await axios.get("http://localhost:3000/Libros")
    listado.innerHTML = " "
    respuesta.data.forEach(element => {listado.innerHTML += '<button onclick="Borrar('+element.id+')"> ❌ </button>'+ " " +"Titulo: "
    + element.titulo + " Autor:" + element.Autor + " " +'<button onclick="Mostrar('+element.id+')"> 👀 </button>'+ "<br>";});
  }

  async function Borrar(id)
  {
      respuesta = await axios.get("http://localhost:3000/Libros/" + id)
      if(respuesta.data.Estado != "Alquilado")
      {
      try {
          await axios.delete("http://localhost:3000/Libros/" + id)
      } catch (error) {
          alert("error al borrar")
      }
  }
      else{
      alert("No se puede eliminar un libro alquilado")}
  }
 
  async function Mostrar(id)
  {
    btnAL.hidden = false
    btnGL.hidden = true
    btnCEL.hidden = false
    idG = id
    respuesta = await axios.get("http://localhost:3000/Libros/" + id);
    titulo.value = respuesta.data.titulo
    autor.value = respuesta.data.Autor
    estado.value = respuesta.data.Estado
  }

  async function Actualizar()
  {
    respuesta = await axios.put("http://localhost:3000/Libros/" + idG , {titulo: titulo.value , Autor: autor.value, Estado: estado.value});
    btnAL.hidden = true 
    btnGL.hidden = false
  }

  // async function ActualizarlistL(id) 
  // {
  //   idG = id
  //   respuesta = await axios.get("http://localhost:3000/Libros/" + idG);
  //   titulo.value = respuesta.data.titulo
  //   autor.value = respuesta.data.Autor
  //   estado.value = respuesta.data.Estado
  // }

  async function Cancelar()
  {
    titulo.value = " "
    autor.value = " "
    estado.value = " "
    btnAL.hidden = true
    btnGL.hidden = false
    btnCEL.hidden = true
  }