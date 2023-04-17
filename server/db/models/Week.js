const Sequelize = require('sequelize')
const db = require('../db')


const Week = db.define('week', {
    // id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     unique: true,
    // },
   date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
    totalCals: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
})


module.exports = Week
