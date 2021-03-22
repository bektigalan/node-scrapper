const { Router } = require('express');
const { getTopTopics } = require('../controller/google-trend-controller');

const router = Router();

router.get('/google-trend/topics', getTopTopics);

module.exports = router;