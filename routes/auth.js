const router = require("express").Router();
const passport = require('passport');
require('dotenv').config();
let CLIENT_URL;


if (process.env.NODE_ENV === "production") {
    CLIENT_URL = 'http://www.parkovka.in.ua';
} else {
    CLIENT_URL = 'http://localhost:3000'; 
}


router.get("/login/success", (req, res)=>{
    

    if(req.user) {
        res.status(200).json({
            error: false,
            success: true,
            message: "success",
            user: req.user, 
            // cookies: req.cookies
        });
    } else {
        res.status(403).json({
            error: true,
            message: "Not autorized",
        });
    }

    
});

router.get("/login/faild", (req, res)=>{
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect(CLIENT_URL);
});

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "login/faild"
}));

router.get("/google", passport.authenticate("google", ["profile", "email"]));


module.exports = router;