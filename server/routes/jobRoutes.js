const router = require('express').Router();
const controller = require('../controller/jobController.js');


router.route('/').post(controller.create).get(controller.getAll)

router.route('/stats').get(controller.showStats)

router.route('/:id').delete(controller.remove).patch(controller.update)

module.exports = router;