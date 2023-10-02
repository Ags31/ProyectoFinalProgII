//-------------------SECCION PRESTAMOS--------------------

const alumno = document.getElementById("alumno")
const listado = document.getElementById("listL")
const documento = document.getElementById("documento")
const fecP = document.getElementById("fecP")
const PP = document.getElementById("PP")
const LDL = document.getElementById("LDL")
const ss = document.getElementById("ss")
let idL
let i = 0
let idAL 


async function listarP()
{
  respuesta = await axios.get("http://localhost:3000/Libros/")
        listado.innerHTML = " "
        respuesta.data.forEach(element => {listado.innerHTML += '<button onclick="MostrarP('+element.id+')"> XX </button>'+ " " + element.titulo + " "+ element.id + " " + element.Estado + "<br>";});
}

async function ValidarP() 
{
respuesta = await axios.get("http://localhost:3000/Alumnos")
respuesta.data.forEach(element => {
  if(element.Documento == documento.value)
  {
  alumno.innerHTML = element.Nombre + " " + element.Apellido + " DNI: " + element.Documento
  listarP()
  fecP.hidden = false
  PP.hidden = false
  LDL.hidden = false
  ss.hidden = false
  idAL = id
  }
})
}

async function PrestamoP()
{

  respuesta = await axios.post("http://localhost:3000/Prestamo" , {AlumnosDNI: documento.value , LibrosID: ss.value ,FechaPrestamo: fecP.value})
}

async function MostrarP(id)
{
  idL = id
  respuesta = await axios.get("http://localhost:3000/Libros/" + id);
  
  if(respuesta.data.Estado != "Alquilado")
  {
  try {
    ss.value = respuesta.data.id
  } catch (error) {
      alert("error al borrar")
  }
}
  else{
  alert("No se puede alquilar un libro alquilado")}
}

// async function MostrarP(id)
// {
//   btnAL.hidden = false
//   btnGL.hidden = true
//   idL = id
//   respuesta = await axios.get("http://localhost:3000/Libros/" + id);
//   titulo.value = respuesta.data.titulo
//   autor.value = respuesta.data.Autor
//   estado.value = respuesta.data.Estado
// }
