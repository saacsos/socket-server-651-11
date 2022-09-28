const express = require('express')
const PORT = 4000
const HOST = '0.0.0.0'

const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000']
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

server.listen(PORT, HOST)
console.log(`App running on http://${HOST}:${PORT}`)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('hello.message', (data) => {
    console.log(data)
    socket.broadcast.emit('chatroom', {
      data,
      socket_id: socket.id
    })
  })

  socket.on('rewards.create', (data) => {
    if (data.success) {
      socket.broadcast.emit('rewards.index', {
        refresh: true
      })
    }
  })


})