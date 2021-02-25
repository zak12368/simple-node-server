'use strict';

const
    express = require('express'),
    routerController = require('../controllers/databaseController');

let router = express.Router();

router.use('/api', routerController);

module.exports = router;