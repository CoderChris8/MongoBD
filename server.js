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

request('https://www.wsj.com/news/technology', function(err, response, body){
    if ( err ) return console.log(err);
    $ = cheerio.load(body);

    let articles = $('.wsj-list.lead-story .wsj-card');

    articles.each((index, article ) => {
        const title = $(article).find('.wsj-headline a').text().trim();
        const body = $(article).find('.wsj-card-body .wsj-summary').text().trim();

        if ( body ) {
            
            Article.find({title: title}).then(article => {
                if ( !article ) {
                    Article
                    .create({title, body}).then(result => {
                        console.log(result);
                    })
                    .catch(err => console.log(err));
                }
            });
        }

    });
    
});