module.exports = (req, res, err) => {
    console.log(req.session.registrationErrors);

    res.render('register');
}