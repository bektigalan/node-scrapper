const { Router } = require('express');
const { getTopNews, getTopTopics } = require('../controller/detik-controller')

const router = Router();

router.get('/detik/topics', getTopTopics);
router.get('/detik/news/:category', getTopNews);

module.exports = router;