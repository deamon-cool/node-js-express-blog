const bcrypt = require('bcrypt');
const User = require('../database/models/User');

module.exports = (req, res) => {
    const {email, password} = req.body;

    // find user through email
    User.findOne({email}, (error, user) => {
        if(user) {
            // Compare passwords - there are the same ? User is true
            bcrypt.compare(password, user.password, (error, result) => {
                if(result) {
                    // store user session
                    res.redirect('/');
                } else {
                    res.redirect('/auth/login');
                }
            });
        } else {
           return res.redirect('/auth/login');
        }
    });
};