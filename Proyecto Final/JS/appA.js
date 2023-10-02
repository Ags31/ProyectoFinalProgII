//------------------SECCION ALUMNOS----------------------------------

const listadoA = document.getElementById("listA")
const nombre = document.getElementById("Nombre")
const apellido = document.getElementById("Apellido")
const documento = document.getElementById("Documento")
const contacto = document.getElementById("Contacto")
const btnAA = document.getElementById("AA")
const btnGA = document.getElementById("GA")
const btnCEA = document.getElementById("CEA")
let idA 
listarA()

async function guardarA()
{
  //axios.post("http://localhost:3000/Alumnos" , {Nombre: nombre.value , Apellido: apellido.value , Documento: documento.value , Contacto: contacto.value})
  //.then(function(respuesta){alert("GRABADO")})

  respuesta = await axios.post("http://localhost:3000/Alumnos" , {Nombre: nombre.value , Apellido: apellido.value , 
  Documento: documento.value , Contacto: contacto.value} )
    alert("Grabacion OK")
}

async function listarA()
{
  respuesta = await axios.get("http://localhost:3000/Alumnos")
  listadoA.innerHTML = " "
  respuesta.data.forEach(element => {listadoA.innerHTML += '<button onclick="BorrarA('+element.id+')"> ❌ </button>'+ " " +"Nombre Completo: "
  + element.Nombre + " " + element.Apellido + " " + "Documento:" + element.Documento +  " " + "Contacto:" + element.Contacto 
  + " " + '<button onclick="MostrarA('+element.id+')"> 👀 </button>'+ "<br>";});
}

async function BorrarA(id){
  await axios.delete("http://localhost:3000/Alumnos/"+id)
  listarA()
}

async function MostrarA(id)
{
  btnAA.hidden = false
  btnGA.hidden = true
  btnCEA.hidden = false
  idA = id
  respuesta = await axios.get("http://localhost:3000/Alumnos/" + id);
  nombre.value = respuesta.data.Nombre
  apellido.value = respuesta.data.Apellido
  documento.value = respuesta.data.Documento
  contacto.value = respuesta.data.Contacto
}

async function CancelarA()
{
  nombre.value = " "
  apellido.value = " "
  documento.value = " "
  contacto.value = " "
  btnAA.hidden = true
  btnGA.hidden = false
  btnCEA.hidden = true
}

async function ActualizarA()
{
  respuesta = await axios.put("http://localhost:3000/Alumnos/" + idA , {Nombre: nombre.value , Apellido: apellido.value , 
  Documento: documento.value , Contacto: contacto.value})
  btnAA.hidden = true 
  btnGA.hidden = false
}