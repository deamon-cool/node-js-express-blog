//Post collection
//Model are representing collection Post in database
const mongoose = require('mongoose');

// structure of documents in that collection
const PostSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    content: String,
    username: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;