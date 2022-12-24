const router = require("express").Router();
require('dotenv').config();
const passport = require("passport");


let CLIENT_URL;


if (process.env.NODE_ENV === "production") {
    CLIENT_URL = 'http://parkovka.in.ua';
} else {
    CLIENT_URL = 'http://parkovka.in.ua'; 
}


router.get('/login/success', (req, res) => {

    if (req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user
        })
    }
});


router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    })
});

router.get('/logout', (req, res) => {

    req.logout();
    req.redirect(CLIENT_URL);
});


router.get('/google', passport.authenticate('google', { scope: ["profile"] }));
router.get('/google/callback', passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
 }));


router.get('/facebook', passport.authenticate('facebook', { scope: ["profile"] }));
router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
 }));


module.exports = router;