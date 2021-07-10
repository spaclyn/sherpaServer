const Express = require("express")
const app = Express();

app.use('/test', (req, res) => {
    res.send('this is a message from the test endpoint of the server')
})

app.listen(3000, () => {
    console.log(`[Server]: App is listening on 3000.`)
})