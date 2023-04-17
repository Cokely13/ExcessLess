const {db, models: {User, Treat} } = require('../server/db')

const treats = [
  {
    name: 'Soda',
    cals: 150,
    size: '12 ounces',
    servings: 25
  },
  {
    name: 'Beer',
    cals: 200,
    size: '12 ounces',
    servings: 17
  },
  {
    name: 'Wine',
    cals: 120,
    size: '5 ounces',
    servings: 30
  },
  {
    name: 'Potato Chips',
    cals: 160,
    size: '1 ounce',
    servings: 22
  },
  {
    name: 'Donut',
    cals: 200,
    size: '1 donut',
    servings: 18
  },
  {
    name: 'Cake',
    cals: 150,
    size: '1 slice',
    servings: 23
  },
  {
    name: 'Hard Liquor',
    cals: 120,
    size: '1.5 ounces',
    servings: 30
  },
  {
    name: 'Candy',
    cals: 100,
    size: '1 piece',
    servings: 35
  }
];

const users = [
  { username: 'cody', password: '123' },
  { username: 'murphy', password: '123' }
];

async function seed() {
  await Treat.sync({ force: true });
  await Treat.bulkCreate(treats);

  await User.sync({ force: true });
  await Promise.all(users.map(user => User.create(user)));
}

seed();
