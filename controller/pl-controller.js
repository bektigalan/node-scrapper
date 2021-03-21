const { scrapGoalRecord } = require('../module');
const createError = require('http-errors');

const getGoalRecord = (req, res, next) => {
    scrapGoalRecord()
    .then(data => {
        res.json({
            data
        })
    })
    .catch(err => {
        next(createError(500));
    })
};

module.exports = {
    getGoalRecord
}