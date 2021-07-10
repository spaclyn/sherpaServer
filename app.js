const Express = require("express")
const app = Express();

const controllers = require("./controllers")

//if we no longer want 'trip' then change "/trip" here. dont change ANYTHING else
app.use('/trip', controllers.tripController)

app.use('/test', (req, res) => {
    res.send('this is a message from the test endpoint of the server')
})

app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000.`)
})