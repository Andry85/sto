const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');


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

module.exports = router;