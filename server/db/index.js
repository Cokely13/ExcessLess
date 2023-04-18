//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Entry = require('./models/Entry')
const Treat = require('./models/Treat')

//associations could go here!

// Treat.belongsTo(Entry)
// Entry.hasMany(Treat)

Entry.belongsTo(User)
User.hasMany(Entry)

module.exports = {
  db,
  models: {
    User,
    Entry,
    Treat,
  },
}
