const axios = require('axios');
const cheerio = require('cheerio');

const host = `https://www.premierleague.com`;
const url = `${host}/stats/top/players/goal_assist?se=-1&cl=-1&iso=-1&po=-1?se=-1`;

axios(url)
.then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $('.statsTableContainer > tr');
    const topPremierLeagueScorers = [];

    statsTable.each(function() {
        const rank = $(this).find('.rank > strong').text();
        const playerName = $(this).find('.playerName > strong').text();
        const detail = host + $(this).find('.playerName').attr('href');
        const nationality = $(this).find('.playerCountry').text();
        const goals = $(this).find('.mainStat').text();

        topPremierLeagueScorers.push({
            rank,
            name: playerName,
            detail,
            nationality,
            goals,
          });
    });

    console.log(topPremierLeagueScorers);
})
.catch(console.error);