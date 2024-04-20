import { createServer } from 'http'
import { readFile } from 'fs'
import { join, dirname } from 'path'
import { getContentType } from './getContentType.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // Obtener ruta del archivo actual
const __dirname = dirname(__filename) // Obtener ruta de la carpeta actual
console.log(__dirname)
const server = createServer((req, res) => {
  const { method, url } = req
  if (method === 'GET') {
    if (url === '/') {
      // Servir el archivo home.html desde la carpeta views
      readFile(join(__dirname, 'views', 'home.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' })
          res.end('<h1>Error interno del servidor</h1>')
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data)
        }
      })
    } else if (url === '/login') {
      // Servir el archivo login.html desde la carpeta views
      readFile(join(__dirname, 'views', 'login.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' })
          res.end('<h1>Error interno del servidor</h1>')
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data)
        }
      })
    } else if (url === '/register') {
      // Servir el archivo register.html desde la carpeta views
      readFile(join(__dirname, 'views', 'register.html'), (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' })
          res.end('<h1>Error interno del servidor</h1>')
        } else {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(data)
        }
      })
    } else {
      // Servir archivos estáticos desde la carpeta public (imagenes y css) { 'Content-Type': getContentType(filePath) }
      const filePath = join(__dirname, 'public', url)
      readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/html' })
          res.end('<h1>Error interno del servidor</h1>')
        } else {
          res.writeHead(200, { 'Content-Type': getContentType(filePath) })
          res.end(data)
        }
      })
    }
  } else if (method === 'POST') {
    if (url === '/login' || url === '/register') {
      // Redirigir al usuario a la página de inicio con un código de estado 302
      res.writeHead(302, { location: '/' }) // Redirige al home
      res.end()
    } else {
      // Enviar respuesta 404 para rutas POST no válidas
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('<h1>404 - Page not found</h1>')
    }
  }
})

// Coalescencia Nula ?? Devuelve el primer valor que no sea ni undefined ni null
const PORT = process.env.PORT ?? 3000
server.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`)
})
