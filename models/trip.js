const { DataTypes } = require("sequelize")
const db = require("../db")

const Trip = db.define("trip", {
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


module.exports = Trip

