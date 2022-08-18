const express = require("express")
const fs = require("fs") // Callback
const fsPromise = require("fs/promises") // Promises

/**
 * GET
 * POST
 * PUT
 * PATCH
 * DELETE
 */
const app = express()

// Middlewares
app.use(express.json()) // parseando a json

// Endpoint de bienvenida
app.get("/", (request, response) => {
  response.write("Bienvenida a nuesta api de express")
  response.end()
})

app.post("/koders", async (request, response) => {
  // Recibimos el body que nos manda el cliente
  const { body } = request

  // Acceder nuestra bd
  const bd = await fsPromise.readFile("koders.json", "utf8")
  const parsedBD = JSON.parse(bd)

  // Koder a crear
  const newKoder = {
    id: parsedBD.koders.length + 1,
    ...body
  }

  // Agregar el koder a lo que ya teniamos
  parsedBD.koders.push(newKoder)

  // Crear koder en la base de datos
  await fsPromise.writeFile("koders.json", JSON.stringify(parsedBD, "\n", 2), "utf8")

  // Respondemos con el Koder creado o estatus de exitoso
  response.status(201)
  response.json({ success: true })
})

// Ejercicio
// PUT -> me van a reemplazar el koder
// PATH PARAM -> id -> 2
// BODY -> data con la que van a reeemplazar
// REFLEJAr -> en su bd -> koders.json
// findIndex 

// Tarea
// PATCH -> solo actualizar lo que el cliente diga
/**
 * Ruta: PATCH -> /koders/1
 * Body: { name: "Alejandra" }
 * 
 * Resultado esperado : que al koder con id 1 SOLO le cambie el nombre, si se le manda mas tmb eso
 * Respuesta esperada : El koder con sus nuevos cambios
 */

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




/**
 * 1 - PATH PARAM -> identificadores -> modifican la ruta del lado de back
 * /recurso/identificador -> /koders/:id
 * 2 - QUERY PARAM -> no cambian la ruta -> /koders
 * ?ciudad=Gdl&municipio=
 */

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

app.delete("/koders/:id", async (request, response) => {
  // Path params
  const { params } = request

  // Acceder a la bd
  const bd = await fsPromise.readFile("koders.json", "utf8")
  const parsedBD = JSON.parse(bd) // Manejar el json

  const kodersQueSeQuedan = parsedBD.koders.filter(koder => koder.id !== Number(params.id))
  parsedBD.koders = kodersQueSeQuedan

  // Escribir en nuestra BD
  await fsPromise.writeFile("koders.json", JSON.stringify(parsedBD, "\n", 2), "utf8")

  // Respuesta
  response.json({ success: true })
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