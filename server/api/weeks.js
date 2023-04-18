const router = require('express').Router()
const { models: { Week, User}} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const weeks = await Week.findAll({

      include: [User],
    })
    res.json(weeks)
  } catch (err) {
    next(err)
  }
})

//POST: add a new Week
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Week.create(req.body));
  } catch (error) {
    next(error);
  }
});


//Get read all weeks
router.get('/:id', async (req, res, next) => {
  try {
    const weeks = await Week.findByPk(req.params.id, {
      include: [User],
    })
  ;
    res.json(weeks)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const week = await Week.findByPk(req.params.id);
    await week.destroy();
    res.send(week);
  } catch (error) {
    next(error);
  }
});
