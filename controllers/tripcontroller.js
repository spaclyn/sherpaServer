const Express = require("express")
const router = Express.Router()

/* to add another route , just use the router.get('/URL', (req, res) => {
    res.send('what you want to get in post man to test')
}) */


router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route')
})

router.get('/about', (req, res) => {
    res.send('Whatsup! This is our about route')
})

module.exports = router