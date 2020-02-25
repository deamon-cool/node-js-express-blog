const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/test-database-blog', {useNewUrlParser: true, useUnifiedTopology: true});

Post.create({
    title: 'My first blog post',
    description: 'Blog post description',
    content: 'Content content content content content'
}, (error, post) => {
    console.log(error, post);
});

