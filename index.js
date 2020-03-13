const {engine} = require('express-edge');
const express = require('express');
const edge = require('edge.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require('connect-flash');

const createPostController = require('./controllers/createPost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/postStore');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logoutController = require('./controllers/logout');


const app = new express();

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));


mongoose.connect('mongodb://localhost/node-js-blog-database', {useNewUrlParser: true, useUnifiedTopology: true});


app.use(connectFlash());

app.use(fileUpload());

app.use(express.static('public'));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use('*', (req, res, next) => {
    edge.global('auth', req.session.userId);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// middlewares
const storePost = require('./middleware/storePost');
const auth = require('./middleware/auth');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');


app.get('/', homePageController);

app.get('/post/:id', getPostController);

app.get('/posts/new', auth, createPostController);

app.get('/auth/logout', logoutController);

// getting input from user and save in database
app.post('/posts/store', auth, storePost, storePostController);


// '/users/login'     '/users/registers'       => form actions

app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);

app.get('/auth/register', redirectIfAuthenticated, createUserController);
// getting input from user registration and save in database
app.post('/users/registers', redirectIfAuthenticated, storeUserController);


app.listen(3000, () => {
    console.log(`Server running at http://${'127.0.0.1'}:${3000}/`);
});