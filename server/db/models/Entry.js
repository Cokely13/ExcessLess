const Sequelize = require('sequelize')
const db = require('../db')


const Entry = db.define('entry', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
},
   date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    treatId: {
      type: Sequelize.INTEGER,
      allowNull: false
  },
  treatName: {
    type: Sequelize.STRING,
    allowNull: false,
},
cals: {
  type: Sequelize.INTEGER,
  allowNull: false
},
size: {
type: Sequelize.STRING,
allowNull: false
},
  number: {
    type: Sequelize.INTEGER,
    allowNull: false
},
})


module.exports = Entry
