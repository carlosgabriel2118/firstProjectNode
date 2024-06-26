const express = require('express')
const uuid = require('uuid')

const port = 3000
const server = express()
server.use(express.json())

const users = []

server.get('/users', (request, response) => {
    return response.json(users)
})

server.post('/users', (request, response) => {
    const {name, age} = request.body

    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

server.put('/users/:id', (request, response) => {

    const {id} = request.params
    const {name, age} = request.body

    const userUpdater = {id, name, age}

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).send(`<h1>User not found</h1>`)
    }

    users[index] = userUpdater

    return response.json(userUpdater)
})

server.delete('/users/:id', (request, response) => {

    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).send(`<h1>User not found</h1>`)
    }

    users.splice(index,1)

    return response.status(204).send("deletado com sucesso")
})

server.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})