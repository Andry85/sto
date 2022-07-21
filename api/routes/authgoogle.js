
const router = require("express").Router();
const passport = require('passport');
const CLIENT_URL = "http://localhost:3000";



router.get("login/success", (req, res)=>{
    if(req.user) {
        res.status(200).json({
            success: true,
            message: "success",
            user: req.user, 
            // cookies: req.cookies
        });
    }

    
});

router.get("login/faild", (req, res)=>{
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

router.get("logout", (req, res)=>{
    req.logout();
    req.redirect(CLIENT_URL);
});

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));
router.get("/google/callback", (req, res)=>{
    res.send('redirect page');
});

module.exports = router;