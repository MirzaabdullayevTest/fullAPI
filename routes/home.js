const { Router } = require('express')
const router = Router()

// route
router.get('/', (req, res) => {
    // res.status(200).send('This is home page')
    res.render('index', {
        layout: 'main',
        title: 'Hello world'
    })
})

module.exports = router
