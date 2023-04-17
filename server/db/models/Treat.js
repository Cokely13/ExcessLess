const Sequelize = require('sequelize')
const db = require('../db')


const Treat = db.define('treat', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
   name: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: false
  },
    cals: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    size: {
      type: Sequelize.STRING,
      allowNull: false
  },
})


module.exports = Treat
