const { Router } = require('express');
const { getGoalRecord } = require('../controller');

const router = Router();

router.get('/pl/goals', getGoalRecord);

module.exports = router;