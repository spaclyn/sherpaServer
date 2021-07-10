const { Router } = require("express")
const Express = require("express")
const router = Express.Router()

//add JWT validation

const { TripModel } = require("../models")


router.get('/practice', (req, res) => {
    res.send('Hey!! This is a practice route')
})

/*
Create a Trip
/create
*/

Router.post("/create", validateJWT, async (req, res) => {
    const { country, state, city, date } = req.body.trip
    const { id } = req.user
    const tripEntry = {
        country,
        state,
        city,
        date,
        owner: id
    }
    try {
        const newTrip = await TripModel.create(tripEntry)
        res.status(200).json(newTrip)
    } catch (err) {
        res.status(500).json({ error: err })
    }
    TripModel.create(tripEntry)
})

/*
View all trips
/
*/

Router.get("/", async (req, res)=> {
    try {
        const allTrips = await TripModel.findAll()
        res.status(200).json(allTrips)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
View trips by user
/mytrips
*/

Router.get("/mytrips", validateJWT, async (req, res)=> { const { id } = req.user
    try {
        const userTrips = await TripModel.findAll({
            where: {
                owner: id
            }
        })
        res.status(200).json(userTrips)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
View trips by country
/country
*/

Router.get("/:country", async (req, res)=> { const { country } = req.params
    try {
        const countryResults = await TripModel.findAll({
            where: {
                country: country
            }
        })
        res.status(200).json(countryResults)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
Updating Trips
/update/:tripId
*/

router.put("/update/:tripId", validateJWT, async (req, res) => {
    const { country, state, city, date } = req.body.trip
    const tripId = req.params.tripId
    const userId = req.user.id

    const query = {
        where: {
            id: tripId,
            owner: userId
        }
    }

    const updatedTrip = {
        country: country,
        state: state,
        city: city,
        date: date
    }

    try {
        const update = await TripModel.update(updatedTrip, query)
        res.status(200).json(update)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
Deleting Trips
/delete/:tripId
*/

router.delete("/delete/:tripId", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const tripId = req.params.id

    try {
        const query = {
            where: {
                id: tripId,
                owner: ownerId
            }
        }

        await TripModel.destroy(query)
        res.status(200).json({ message: "Trip Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})



router.get('/about', (req, res) => {
    res.send('Whatsup! This is our about route')
})

module.exports = router