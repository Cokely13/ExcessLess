const Sequelize = require('sequelize')
const db = require('../db')


const Log = db.define('week', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
},
   weekId: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
    treatId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    number: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
})


module.exports = Log
