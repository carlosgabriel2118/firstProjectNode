const express = require('express')
const uuid = require('uuid')
const port = 3000

const server = express()
server.use(express.json())

//aulas sobres as rotas e os tipos de rotas

/*server.get('/users', (request, response) =>{

    // isso foi os query params

    const name = request.query.name
    const age = request.query.age

    //Outra forma de fazer isso

    const {name, age} = request.query

    console.log(name,age)*/

    //agora irei fazer route params

   /* const {id} = request.params

    console.log(id)

    // agora vou fazer body params

    const {name, age} = request.body

    return response.json({name,age})
})*/

server.listen(port, () => {
    console.log(`🚀 Server started on port ${port}`)
})

//aula na pratica sobre os middlewares

const users = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).send(`<h1>User not found</h1>`)
    }
    request.userIndex = index
    request.userId = id

    next()
}

server.get('/users', (request, response) => {
    return response.json(users)
})

server.post('/users', (request, response) => {
    const {name, age} = request.body

    const user = {id:uuid.v4(), name, age}

    users.push(user)

    return response.status(201).json(user)
})

server.put('/users/:id',checkUserId, (request, response) => {
    const {name, age} = request.body
    const index = request.userIndex
    const id = request.userId

    const userUpdater = {id, name, age}

    users[index] = userUpdater

    return response.json(userUpdater)
})

server.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index,1)

    return response.status(204).send("deletado com sucesso")
})