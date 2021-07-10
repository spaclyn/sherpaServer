const router = require("express").Router()
const { UserModel } = require('../models')

router.post("/register", async (req,res) => {
    let { email, password, name, location } = req.body.user
    await UserModel.create({
        email,
        password,
        name,
        location
    })
    res.send("This is our register endpoint!")
})


module.exports = router