const express =  require('express');
const app = express();
const dotenv = require('dotenv');

// підключення монгуса
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const multer = require("multer");
const path = require('path/posix');
const PORT = process.env.PORT || 5000;
const cookieSession = require('cookie-session');
const passport = require('passport');
const cors = require('cors');

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
    origin: "http://localhost:5000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}));

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



app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/marks', categoryRoute);

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('../client/build'));
}

app.listen(PORT, () => {
    console.log('Backend is runningggg.');
});