const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    author: String,
    title: String,
    url: String,
    urlToImage: String,
    publishedAt: String,
    content: String,
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
