const mongoose = require('mongoose');
const Post = require('./database/models/Post');

mongoose.connect('mongodb://localhost/test-database-blog', {useNewUrlParser: true, useUnifiedTopology: true});

// Post.findByIdAndUpdate('5e5531dd90f7bc0a54e2db50', {title: 'Hehe It works ;)'}, (err, data) => {
//     console.log(err, data);
// });

let data2 = [];

Post.find({}, (err, data)=>{
    let data1 = data.length;
    data2 = data;
    console.log(err, data1);
});

Post.deleteMany(data2, (err, d) => {

});

