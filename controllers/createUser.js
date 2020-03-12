module.exports = (req, res, err) => {
    res.render('register', {
        errors: req.flash('registrationErrors')
    });
}