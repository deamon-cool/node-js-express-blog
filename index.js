const path = require('path');
const {engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


mongoose.connect('mongodb://localhost/node-js-blog-database', {useNewUrlParser: true, useUnifiedTopology: true});


app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/post', (req, res) => {
    res.render('post');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// getting input from user
app.get('/posts/new', (req, res) => {
    res.render('create');
});


app.post('/posts/store', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});


app.listen(3000, () => {
    console.log(`Server running at http://${'127.0.0.1'}:${3000}/`);
});