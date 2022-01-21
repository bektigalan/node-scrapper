const axios = require('axios');
const puppeteer = require('puppeteer');
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
                    topNews.push({
                        rank: index + 1,
                        title: $(element).find(".media__title > a").text(),
                        subtitle: $(element).find(".media__date").text(),
                        image: $(element).find(".media__image > a > span > img").attr('src'),
                        link: $(element).find(".media__title > a").attr('href'),
                        date: $(element).find(".media__date > span").attr('title')
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
                    topics.push({
                        rank: index + 1,
                        topic: $(element).find(".media__title > a").text().trim()
                    });
                });

                resolve(topics);
            })
            .catch(err => {
                reject(err);
            });
    });
}

const scrapTopVideos = () => {
    return new Promise((resolve, reject) => {
        puppeteer
            .launch()
            .then(browser => browser.newPage())
            .then(page => {
                return page.goto('https://20.detik.com/?tag_from=wp_belt_videoTerpopuler',
                    {
                        waitUntil: 'load',
                        timeout: 0
                    }).then(function () {
                        return page.content();
                    });
            })
            .then(html => {
                const $ = cheerio.load(html);
                const newsHeadlines = [];
                $("article[class='list-content__item column-4 animated']").each((index, element) => {
                    newsHeadlines.push({
                        rank: index + 1,
                        title: $(element).find("h3").text().trim(),
                        thumbnail: $(element).find("span[class='ratiobox ratiobox--16-9 lqd'] > img").attr('data-thumbnail'),
                        uploaded: $(element).find("div[class='media__date'] > span").attr('title'),
                        link: $(element).find("a").attr('href')
                    });
                });

                resolve(newsHeadlines);
            })
            .catch(err => {
                reject(err);
            });
    });
}

module.exports = {
    scrapTopNews,
    scrapTopTopics,
    scrapTopVideos
}