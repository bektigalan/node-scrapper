const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const host = `https://trends.google.com/trends/trendingsearches/daily?geo=ID`;

const scrapTopTopics = () => {
    return new Promise((resolve, reject) => {
        puppeteer
        .launch()
        .then(browser => browser.newPage())
        .then(page => {
            return page.goto(host, 
            {
                waitUntil:'load', 
                timeout:0
            }).then(function() {
                return page.content();
            });
        })
        .then(html => {
            const $ = cheerio.load(html);
            const result = [];
            $("div[class='homepage-trending-stories generic-container'] > div").each((index, element) => {
                const date = $(element).find(".content-header-title").text();
                const list = $(element).find("md-list");
                const topics = [];

                list.each((index, element) => {
                    topics.push({
                        title: $(element).find("span[ng-repeat='titlePart in titleArray'] > span").text()
                    });
                });

                result.push({
                    date,
                    topics
                });
            });

            resolve(result);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// scrapTopTopics()
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

module.exports = {
    scrapTopTopics
}