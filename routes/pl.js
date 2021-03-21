const { Router } = require('express');
const { getRecord } = require('../controller');

const router = Router();

router.get('/pl/:category', getRecord);

module.exports = router;