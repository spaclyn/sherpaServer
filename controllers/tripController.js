const { Router } = require("express")
const Express = require("express")
const router = Express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { TripModel } = require("../models")


/*
Create a Trip
/create
*/

router.post("/create", validateJWT, async (req, res) => {
    const { type, country, state, city, date, details } = req.body.trip
    const { id } = req.user
    const tripEntry = {
        type,
        country,
        state,
        city,
        date,
        details,
        owner: id
    }
    try {
        const newTrip = await TripModel.create(tripEntry)
        res.status(200).json(newTrip)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
View all trips
/
*/

router.get("/", async (req, res)=> {
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

router.get("/mytrips", validateJWT, async (req, res)=> {
    const {
        id
    } = req.user
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
View trips by type
/type
*/

router.get("/:type", async (req, res)=> { const { type } = req.params
    try {
        const typeResults = await TripModel.findAll({
            where: {
                type: type
            }
        })
        res.status(200).json(typeResults)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

/*
Updating Trips
/update/:tripId
*/

router.put("/update/:tripId", validateJWT, async (req, res) => {
    const { type, country, state, city, date, details } = req.body
    const tripId = req.params.tripId
    const userId = req.user.id

    console.log({ type, country, state, city, date, details, tripId, userId });
    const query = {
        where: {
            id: tripId,
            owner: userId
        }
    }

    const updatedTrip = {
        type: type,
        country: country,
        state: state,
        city: city,
        date: date,
        details: details
    }

        const update = await TripModel.update(updatedTrip, query)
        res.status(200).json(update)
    
})

/*
Deleting Trips
/delete/:tripId
*/

router.delete("/delete/:tripId", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const tripId = req.params.tripId

    try {
        const query = {
            where: {
                id: tripId,
                owner: ownerId
            }
        }
console.log("test");
        await TripModel.destroy(query)
        res.status(200).json({ message: "Trip Removed" })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports = router