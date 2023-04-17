const router = require('express').Router()
const { models: { Treat, User}} = require('../db')
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const treats = await Treat.findAll()
    res.json(treats)
  } catch (err) {
    next(err)
  }
})

//POST: add a new treat
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Treat.create(req.body));
  } catch (error) {
    next(error);
  }
});


//Get read all treats
router.get('/:id', async (req, res, next) => {
  try {
    const treats = await Treat.findByPk(req.params.id)
  ;
    res.json(treats)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const treat = await treat.findByPk(req.params.id);
    await treat.destroy();
    res.send(treat);
  } catch (error) {
    next(error);
  }
});
