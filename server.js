import { Mongoose } from 'mongoose';

const request = require('request');
const cheerio = require('cheerio');
const cheerio = require('mongoose');
Mongoose.connect('mongodb://localhost/scraping_example');
Mongoose.Promise = Promise;

const ArticleSchema = mongoose.ArticleSchema({
    title: String,
    body: String
});

const Article = mongoose.model('Article', ArticleSchema);

Article.find({}).then(articles => console.log(articles));

app.get('/scrape', (req, res) => {
    request('https://www.wsj.com/news/technology', function(err, response, html) {
        if ( err ) return console.log(err);
        $ = cheerio.load(html);

        let articles = $('.wsj-list.lead-story .wsj-card');
        let results = Array.from(articles).filter(val => {
            return $(val.find('.wsj-card-body .wsj-summary').text();
        });

        result.forEach((article, index) => {
            const title = $(article).find('.wsj-headline a').text().trim();
            const body = $(article).find('.wsj-card-body .wsj-summary').text().trim();
            const send = () => Article.find({}).then(article_data => res.send(article_data));

                Article.find({title: title}).then(article => {
                    if ( !article ) {
                        Article
                        .create({title, body}).then(result => {
                            
                            if (index === results.length - 1) send();
                        })
                        .catch(err => console.log(err));
                    } else {
                        if (index === results.length - 1) send();
                    }
                });
            });

        });
    });
});