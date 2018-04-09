function getArticles() {
    $.get('scrape')
    .then(articles => {
        console.log(articles);
    });
}