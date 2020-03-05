const Post = require('../database/models/Post');

module.exports = async (req, res) => {
    let posts = await Post.find();

    res.render('index', {posts});
};