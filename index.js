const express =  require('express');
const app = express();
const dotenv = require('dotenv');
const fs = require('fs');

// підключення монгуса
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require('path/posix');
const PORT = process.env.PORT || 5000;
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');
const passportSetup = require('./passport');
let CLIENT_URL;



if (process.env.NODE_ENV === "production") {
    CLIENT_URL = 'https://parkovka.in.ua';
} else {
    CLIENT_URL = 'http://localhost:3000'; 
}



dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use(cookieSession(
    {
        name: "session",
        keys: ["lama"],
        maxAge: 24*60*60*100
    }

));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
    origin: CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

app.set('trust proxy', '127.0.0.1');


// підключення монго дб
mongoose.connect(process.env.MONGO_URL)
.then(
    console.log('connected mongo')
)
.catch( err => {
    console.log(err)
});




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'images'));
    },
    filename: function (req, file, cb) {
        cb(
        null,
        file.originalname
        );
    },
    });

const multi_upload = multer({storage,
fileFilter: (req, file, cb) => {
    if (
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/jpg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Only .jpg .jpeg .png images are supported!');
        err.name = 'ExtensionError';
        return cb(err);
    }
},
}).array('uploadImages', 10);

app.post('/api/upload', (req, res) => {
    multi_upload(req, res, function (err) {
    console.log(req.files);
    //multer error
    if (err instanceof multer.MulterError) {
        console.log(err);
        res.status(500).send({error: { msg: `multer uploading error: ${err.message}` },}).end();
        return;
    } else if (err) {
    //unknown error
    if (err.name == 'ExtensionError') {
        res.status(413).send({ error: { msg: `${err.message}` } }).end();
    } else {
        res.status(500).send({ error: { msg: `unknown uploading error: ${err.message}` } }).end();
    }
    return;
    }
    res.status(200).send('file uploaded');
});
});



app.use('/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/marks', categoryRoute);



app.use('/api/deleteImg/:arrayImages', (req, res, next) => {

    const imagesArr = req.params.arrayImages.split(",");

    for (const element of imagesArr) {
        let path = `./images/${element}`;

        fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        });
    }


    
})




app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



app.listen(PORT, () => {
    console.log('Backend is runningggg.');
});