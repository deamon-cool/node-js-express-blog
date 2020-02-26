const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/test-database-blog', {useNewUrlParser: true, useUnifiedTopology: true});

// Post.findByIdAndUpdate('5e5531dd90f7bc0a54e2db50', {title: 'Hehe It works ;)'}, (err, data) => {
//     console.log(err, data);
// });

Post.find({}, (err, data)=>{
    console.log(err, data);
});