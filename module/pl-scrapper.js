const axios = require('axios');
const cheerio = require('cheerio');

const host = `https://www.premierleague.com`;

const scrapGoalRecord = (category) => {
    const url = `${host}/stats/top/players/${category}?se=-1&cl=-1&iso=-1&po=-1`;
    return new Promise((resolve, reject) => {
        axios(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const statsTable = $('.statsTableContainer > tr');
            const topPremierLeagueScorers = [];

            statsTable.each((index, element) => {
                const rank = $(element).find('.rank > strong').text();
                const playerName = $(element).find('.playerName > strong').text();
                const detail = host + $(element).find('.playerName').attr('href');
                const nationality = $(element).find('.playerCountry').text();
                const goals = $(element).find('.mainStat').text();

                topPremierLeagueScorers.push({
                    rank,
                    name: playerName,
                    detail,
                    nationality,
                    goals,
                });
            });
            console.log(statsTable);
            resolve(topPremierLeagueScorers);
        })
        .catch(err => {
            reject(err)
        });
    });
}

module.exports = {
    scrapGoalRecord
}