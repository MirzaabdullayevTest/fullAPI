const express = require('express')
const app = express()

const users = [
    { name: 'Tom', age: 50, id: 1 },
    { name: 'Harry', age: 10, id: 2 },
    { name: 'Elizabeth II', age: 96, id: 3 },
]

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.get('/', (req, res) => {
    res.status(200).send('This is home page')
})

app.get('/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/users/user', (req, res) => {
    const user = users.find(val => val.age === +req.query.age)
    res.status(200).send(user)
})

app.get('/users/:id', (req, res) => {
    const user = users.find(val => val.id === +req.params.id)
    res.status(200).send(user)
})

app.post('/users/add', (req, res) => {
    console.log(req.body);
    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    users.push(user)
    res.status(201).send('User created')
})

// delete // update

const port = 3000
app.listen(port, () => {
    console.log('Server working on port ', port);
})