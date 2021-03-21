const { scrapTopNews } = require('../module');
const createError = require('http-errors');

const category = {
    all: "/",
    finance: "/finance",
    tech: "/inet",
    sport: "/sport",
    health: "/health",
    food: "/food",
    otomotif: "/oto",
    travel: "/travel"
}

const getTopNews = (req, res, next) => {
    const path = category[req.params.category];

    if(!path){
        next(createError(404));
    }

    scrapTopNews(path)
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
    getTopNews
}