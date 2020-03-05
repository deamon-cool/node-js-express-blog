const path = require('path');
const {engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/Post');
const fileUpload = require('express-fileupload');


const app = express();


mongoose.connect('mongodb://localhost/node-js-blog-database', {useNewUrlParser: true, useUnifiedTopology: true});


app.use(fileUpload());

app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const customMiddleware = (req, res, next) => {
    console.log('I HAVE BEEEN CAALLLED :) ');
    next();
};

app.use(customMiddleware);
app.use('/posts/store', validateCreatePostMiddleware);


app.get('/', async (req, res) => {
    let posts = await Post.find({});

    res.render('index', {posts});
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    res.render('post', {post});
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/posts/new', (req, res) => {
    res.render('create');
});

// getting input from user and save in databas
app.post('/posts/store', (req, res) => {
    const {image} = req.files;

    image.mv(path.resolve(__dirname, 'public/posts', image.name), (error) => {

        Post.create({
            ...req.body,
            image: `/posts/${image.name}`
        }, (error, post) => {
            console.log(req.body);
            res.redirect('/');
        });

    });


});


app.listen(3000, () => {
    console.log(`Server running at http://${'127.0.0.1'}:${3000}/`);
});