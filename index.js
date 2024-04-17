import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { getContentType } from './getContentType.js'

const __filename = fileURLToPath(import.meta.url) // Obtener ruta del archivo actual
const __dirname = dirname(__filename)// Obtener ruta de la carpeta actual
const PORT = process.env.PORT || 3000

const server = createServer((req, res) => {
  const { method, url } = req
  if (method === 'GET') {
    let filePath
    if (url === '/') {
      filePath = 'views/home.html'
    } else if (url === '/login') {
      filePath = 'views/login.html'
    } else if (url === '/register') {
      filePath = 'views/register.html'
    } else if (url.startsWith('/public/')) {
      filePath = url.slice(1) // Mantén '/public/' en la URL
    }
    if (filePath) {
      const fullPath = join(__dirname, filePath)
      readFile(fullPath, (err, content) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' })
          res.end('Archivo no encontrado')
        } else {
          res.writeHead(200, { 'Content-Type': getContentType(filePath) })
          res.end(content)
        }
      })
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('404 Not Found')
    }
  } else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      // Redirigir al usuario a la página de inicio con un código de estado 302
      res.writeHead(302, { 'Content-Type': 'text/plain', location: '/' })

      res.end('Redirigiendo a la pagina de inicio')
    } else {
      // Enviar respuesta 404 para rutas POST no válidas
      res.writeHead(404, { 'Content-Type': 'text/plain' })

      res.end('404 Not Found')
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' })
    res.end('405 Method Not Allowed')
  }
})
server.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`)
})
