const express = require("express")
const fs = require("fs") // Callback
const fsPromise = require("fs/promises") // Promises

const app = express()

// Endpoint de bienvenida
app.get("/", (request, response) => {
  response.write("Bienvenida a nuesta api de express")
  response.end()
})

// Leer archivo
/**
 * 1 -> callbacks
 * 2 -> promises -> then/catch
 * 3 -> async/await
 */

/**
 * Reglas async/await
 * Async era para hacer una funcion asincrona -> todo lo de adentro de la fn va a ser async
 * Await se usaba dentro de esa funcion para esperar una promesa
 */
// Ejercicios
// Endpoint que lea text1.txt con async/await

app.get("/file-async-await", async (request, response) => {
  try {
    const files = await fsPromise.readFile("text1.txt", "utf8")
    response.write(files)
    response.end()
  } catch(error) {
    response.write(error)
    response.end()
  }
})

// Endpoints koders
// recurso/identicador -> koders


/**
 * 1 - PATH PARAM -> identificadores -> modifican la ruta del lado de back
 * /recurso/identificador -> /koders/:id
 * 2 - QUERY PARAM -> no cambian la ruta -> /koders
 * ?ciudad=Gdl&municipio=
 */
app.get("/koders", async (request, response) => {

  // Destructurando
  const { query } = request

  // Si el cliente no me manda algo me regrese todos los koders
  const db = await fsPromise.readFile("koders.json", "utf8") 
  const parsedDB = JSON.parse(db)

  // Filtrado dinamico
  if(Object.keys(query).length) {
    // Significa que no es 0 y le mandamos una query o mas en el cliente
    const kodersFound = parsedDB.koders.filter(koder => koder.modulo === query.modulo)
    response.json(kodersFound)
  } else {
    // Significa que es 0
    response.json(parsedDB.koders)
  }
})

// Recibir un koder en especifico con el id
app.get("/koders/:id", async (request, response) => {
  // Path params
  const { params } = request

  // DB
  const db = await fsPromise.readFile("koders.json", "utf8")
  const parsedDB = JSON.parse(db)

  // Filtramos para encontrar al koder con identiciador 2
  const foundKoder = parsedDB.koders.filter((koder) => koder.id === Number(params.id))[0]

  // Respondemos
  response.json(foundKoder)
})

app.listen(8080, () => {
  console.log("Server is listening ...")
})

/**
 * Tarea: 
 * En el endpoint de enlistar koders, recibir modulo como query params
 * y regresar todos los koders que tengan ese modulo
 * 
 * []
 */