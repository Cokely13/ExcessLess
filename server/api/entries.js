const router = require('express').Router()
const { models: { Entry, User}} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const entries = await Entry.findAll({

      include: [User],
    })
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

//POST: add a new Entry
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Entry.create(req.body));
  } catch (error) {
    next(error);
  }
});


//Get read all entries
router.get('/:id', async (req, res, next) => {
  try {
    const entries = await Entry.findByPk(req.params.id, {
      include: [User],
    })
  ;
    res.json(entries)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const entry = await Entry.findByPk(req.params.id);
    await entry.destroy();
    res.send(entry);
  } catch (error) {
    next(error);
  }
});
