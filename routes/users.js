const Joi = require('joi')
const { Router } = require('express')
const router = Router()


const users = [
    { name: 'Tom', age: 50, id: 1 },
    { name: 'Harry', age: 10, id: 2 },
    { name: 'Elizabeth II', age: 96, id: 3 },
]

router.get('/', (req, res) => {
    res.status(200).send(users)
})

router.get('/user', (req, res) => {
    const user = users.find(val => val.age === +req.query.age)
    res.status(200).send(user)
})

router.get('/:id', (req, res) => {
    const user = users.find(val => val.id === +req.params.id)
    res.status(200).send(user)
})

router.post('/add', (req, res) => {
    // if (!req.body.name) {
    //     return res.status(404).send('Name is required!')
    // }

    // if (req.body.name.trim().length < 3) {
    //     return res.status(404).send('Min length 3 of name')
    // }

    // if (!req.body.age) {
    //     return res.status(404).send('Age is required!')
    // }

    const schema = Joi.object({
        name: Joi.string().trim().required().min(3),
        age: Joi.number().integer().required().min(6).max(100)
    })

    const validation = schema.validate(req.body)

    if (!!validation.error) {
        return res.status(400).send(validation.error.message)
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    users.push(user)
    res.status(201).send('User created')
})

// delete // update
module.exports = router