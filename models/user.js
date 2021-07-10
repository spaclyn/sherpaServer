const { dataTypes } = require("sequelize")
const db = require("../db")

const User = db.define("user", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
})

module.exports = User