'use strict'

const {db, models: {User, Treat} } = require('../server/db')

/**
 *
 *
 *
 *
 *
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123', weight: "195" }),
    User.create({ username: 'murphy', password: '123', weight: "202" }),
  ])

  const treats = await Promise.all([
    Treat.create({
      name: 'Candy',
      cals: 100,
      size: '1 piece',
      servings: 35
    }),
    // Treat.create({
    //   name: 'Hard Liquor',
    //   cals: 120,
    //   size: '1.5 ounces',
    //   servings: 30
    // }),
    Treat.create( {
      name: 'Cake',
      cals: 150,
      size: '1 slice',
      servings: 23
    }),
    Treat.create({
      name: 'Donut',
      cals: 200,
      size: '1 donut',
      servings: 18
    }),
    // Treat.create( {
    //   name: 'Potato Chips',
    //   cals: 160,
    //   size: '1 ounce',
    //   servings: 22
    // }),
    Treat.create( {
      name: 'Wine',
      cals: 120,
      size: '5 ounces',
      servings: 30
    }),
    Treat.create({
      name: 'Beer',
      cals: 200,
      size: '12 ounces',
      servings: 17
    }),
    Treat.create( {
      name: 'Soda',
      cals: 150,
      size: '12 ounces',
      servings: 25
    }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
