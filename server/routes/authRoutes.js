const router = require('express').Router();
const controller = require('../controller/authController.js')

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/update').patch(controller.update)


module.exports = router;