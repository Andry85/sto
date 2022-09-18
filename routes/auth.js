const router = require("express").Router();
require('dotenv').config();
let CLIENT_URL;
const {OAuth2Client} = require('google-auth-library');

const clientId="58800646258-eq8uhldgmpvhvenfd73cuu12o95b9brc.apps.googleusercontent.com";

const authClient = new OAuth2Client(clientId);
let googleUser = null;


if (process.env.NODE_ENV === "production") {
    CLIENT_URL = 'https://parkovka.in.ua';
} else {
    CLIENT_URL = 'http://localhost:3000'; 
}




router.post("/login/success", (req, res)=>{
    const {idToken} = req.body;

    if (idToken) {
        authClient.verifyIdToken({idToken, audience: clientId})
        .then(response => {
            googleUser = response;
        })
        .catch(error => {
            console.log(error);
        }) 
    }
});

router.get("/login/success", (req, res)=>{
    
    if (googleUser) {
        if(googleUser.payload) {
            res.status(200).json({
                error: false,
                success: true,
                message: "success",
                user: googleUser.payload, 
            });
        } else {
            res.status(403).json({
                error: true,
                message: "Not autorized",
            });
        }
    }

});



router.post("/logout", (req, res)=>{
    res.status(200).json({
        error: false,
        success: true,
        message: "success",
        user: null, 
    });
    
    res.redirect(CLIENT_URL);
});





module.exports = router;