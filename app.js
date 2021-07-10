require("dotenv").config()
const Express = require("express")
const app = Express();
const dbConnection = require("./db")

const controllers = require("./controllers")

app.use(Express.json())

app.use('/user', controllers.userController)

app.use(require("./middleware/validate-jwt"))
app.use('/trip', controllers.tripController)
app.use('/test', (req, res) => {
    res.send('this is a message from the test endpoint of the server')
})

dbConnection.authenticate()
    .then(() => dbConnection.sync())
    .then(() => {
        app.listen(3000, () => {
            console.log(`[Server]: App is listening on 3000.`)
        })
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`)
    })

