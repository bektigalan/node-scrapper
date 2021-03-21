const axios = require('axios');
const cheerio = require('cheerio');

const host = `https://www.detik.com`;

const scrapTopNews = (category) => {
    return new Promise((resolve, reject) => {
        axios(host + '/terpopuler' + category)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const article = $("div[class='column-9'] > div[class='nhl indeks mgb-24'] > div[class='grid-row list-content'] > article");
            const topNews = [];

            article.each((index, element) => {
                const rank = index + 1;
                const title = $(element).find(".media__title > a").text();
                const subtitle = $(element).find(".media__date").text();
                const image = $(element).find(".media__image > a > span > img").attr('src');
                const link = $(element).find(".media__title > a").attr('href');
                const date = $(element).find(".media__date > span").attr('title');

                topNews.push({
                    rank,
                    title,
                    subtitle,
                    image,
                    link,
                    date
                });
            });

            resolve(topNews);
        })
        .catch(err => {
            reject(err);
        });
    });
}

const scrapTopTopics = () => {
    return new Promise((resolve, reject) => {
        axios(host)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const div = $("div[class='box terpopuler'] > div[class='list-content '] > article");
            const topics = [];

            div.each((index, element) => {
                const rank = index + 1;
                const topic = $(element).find(".media__title > a").text();

                topics.push({
                    rank,
                    topic
                });
            });

            resolve(topics);
        })
        .catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    scrapTopNews,
    scrapTopTopics
}