const express = require("express")
const fs = require("fs")

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

// Callback
app.get("/files-callbacks", (request, response) => {
  fs.readFile("text1.txt", "utf8", (err, data) => {
    if(err) {
      response.write("Hubo un error")
      response.end()
    }
    response.write(data)
    response.end()
  })
})

app.listen(8080, () => {
  console.log("Server is listening ...")
})