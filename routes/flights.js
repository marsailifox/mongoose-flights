var express = require('express');
var router = express.Router();
const flightsCtrl = require('../controllers/flights')

router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/', flightsCtrl.index)
router.get('/:id', flightsCtrl.show)
router.delete('/:id', flightsCtrl.delete)
router.post('/:id/destinations', flightsCtrl.addDestinations)

module.exports = router;