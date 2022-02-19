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

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// підключення монго дб
mongoose.connect(process.env.MONGO_URL)
.then(
    console.log('connected mongo')
)
.catch( err => {
    console.log(err)
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});


const upload = multer({storage: storage});

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api//marks', categoryRoute);

app.use(express.static(path.resolve(__dirname, "./client/build")));

app.listen(5000, () => {
    console.log('Backend is runningggg.');
});