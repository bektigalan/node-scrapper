const axios = require('axios');
const cheerio = require('cheerio');

const host = `https://indeks.kompas.com`;

const scrapTopNews = (category) => {
    return new Promise((resolve, reject) => {
        axios(host + category)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html);
            const div = $("div[class='latest--indeks mt2 clearfix'] > div");
            const news = [];

            div.each((index, element) => {
                const rank = index + 1;
                const title = $(element).find(".article__list__title > h3 > a").text();
                const subtitle = $(element).find(".article__list__info > div[class='article__subtitle article__subtitle--inline']").text();
                const image = $(element).find("div[class='article__list__asset clearfix'] > .article__asset > img").attr('src');
                const link = $(element).find(".article__list__title > h3 > a").attr('href');
                const date = $(element).find(".article__list__info > div[class='article__date']").text();

                news.push({
                    rank,
                    title,
                    subtitle,
                    image,
                    link,
                    date
                });
            });

            resolve(news);
        })
        .catch(err => {
            reject(err);
        });
    });
}

// scrapTopNews('/headline')
// .then(data => {
//     console.log(data);
// })
// .catch(err => {
//     console.log(err);
// })

module.exports = {
    scrapTopNews
}