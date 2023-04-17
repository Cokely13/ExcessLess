//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Week = require('./models/Week')
const Treat = require('./models/Treat')

//associations could go here!

Week.hasMany(Treat)
Treat.belongsTo(User)
Week.belongsTo(User)
User.hasMany(Week)

module.exports = {
  db,
  models: {
    User,
    Week,
    Treat,
  },
}
