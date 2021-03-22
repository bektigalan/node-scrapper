const { scrapTopTopics } = require('../module/google-trend-scrapper');
const createError = require('http-errors');

const getTopTopics = (req, res, next) => {
    scrapTopTopics()
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
}

module.exports = {
    getTopTopics
}