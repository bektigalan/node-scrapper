const { scrapTopTopics } = require('../module/google-trend-scrapper');
const createError = require('http-errors');

const country = {
    ID: '?geo=ID',
    US: '?geo=US'
}
const getTopTopics = (req, res, next) => {
    const path = country[req.params.country.toUpperCase()];

    if(!path){
        createError(404);
    }

    scrapTopTopics(path)
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