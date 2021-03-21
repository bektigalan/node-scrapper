const { scrapTopNews } = require('../module/kumparan-scrapper');
const createError = require('http-errors');

const category = {
    all: '/',
    trending: '/news'
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