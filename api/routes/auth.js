const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');
const CLIENT_URL = "http://localhost:3000";


//Register
router.post("/register", async (req, res) => {
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        });

        const user = await newUser.save();
        res.status(200).json(user);


    } catch(err) {
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        !user && res.status(400).json("Wrong credentionals!");

        const validated = await bcrypt.compare(req.body.password, user.password);

        !validated && res.status(400).json("Wrong credentionals!");


        const {password, ...others} = user._doc;

        res.status(200).json(others);

    } catch(err) {
        res.status(500).json(err);
    }
});


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