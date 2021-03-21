const { Router } = require('express');
const { getTopNews } = require('../controller')

const router = Router();

router.get('/detik/:category', getTopNews);

module.exports = router;