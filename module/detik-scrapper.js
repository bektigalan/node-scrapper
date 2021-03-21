const axios = require('axios');
const cheerio = require('cheerio');

const host = `https://www.detik.com/`;

const scrapTopNews = () => {
    return new Promise((resolve, reject) => {
        axios(host)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const article = $("div[class='box cb-mostpop'] > div[class='list-content'] > article");
            const topNews = [];

            article.each(function() {
                const rank = $(this).find(".text-list__data").text();
                const date = $(this).find(".media__date > span").attr('title');
                const title = $(this).find(".media__title > a").attr('onclick').split(', ')[2].replace("\"", "");
                const link = $(this).find(".media__title > a").attr('href');

                topNews.push({
                    rank,
                    date,
                    title,
                    link
                });
            });

            resolve(topNews);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// scrapTopNews()
// .then(data => {
//     console.log(data)
// })
// .catch(err => {
//     console.log(err)
// })

module.exports = {
    scrapTopNews
}