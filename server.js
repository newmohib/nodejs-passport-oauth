const express = require('express');
const app = express();
const cors = require('cors')
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const GoogleStrategy = require('passport-google-oauth20');
const passportConfig = require('./passport-config')
const { checkAuthenticated} = require('./helper/middleware')
const config = require('./config/index');
const port = config.port;

app.set('view-engine', 'ejs');
app.use(flash());
app.use(cors())
app.use(session({
    secret: config.secret,
    saveUninitialized: true,
    resave: true,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(passportConfig)

app.get('/', (req, res) => {
    res.render('index.ejs')
});

app.get('/home', checkAuthenticated, (req, res) => {
    console.log("user", req.user);
    res.send("success Login")
});

app.get('/login', passport.authenticate('google', { scope: ['profile'] }));

app.get('/oauth',
    passport.authenticate('google', {
        successRedirect: "http://localhost:3000",
        failureRedirect: "/"

    }),

);

app.get('/login/success', (req, res) => {
    res.send({status:200})
});

app.get('/logout', (req, res) => {
    req.logOut()
    res.redirect("/")
})















app.listen(port, function (e) {
    console.log('Server running at port', port);
});
