const {engine} = require('express-edge');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const postStoreController = require('./controllers/postStore');
const getPostController = require('./controllers/getPost');


const app = express();


mongoose.connect('mongodb://localhost/node-js-blog-database', {useNewUrlParser: true, useUnifiedTopology: true});


app.use(fileUpload());

app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


const validateCreatePostMiddleware = (req, res, next) => {
    if(!req.files || !req.body.username || !req.body.title || !req.body.subtitle || !req.body.content) {
        return res.redirect('/posts/new');
    }

    next();
};
app.use('/posts/store', validateCreatePostMiddleware);


app.get('/', homePageController);

app.get('/post/:id', getPostController);

app.get('/posts/new', createPostController);

// getting input from user and save in database
app.post('/posts/store', postStoreController);


app.listen(3000, () => {
    console.log(`Server running at http://${'127.0.0.1'}:${3000}/`);
});