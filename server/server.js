const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const verifyJwtToken = require('./middleware/verifyJwtToken');
const multer = require('multer');
const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const postRouter = require('./routes/post');

// connect to MongoDB
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGO_DB;
async function connectDB() {
  try {
    mongoose.connect(mongoDB);
  }
  catch(err) {
    // handle error
  }
}
connectDB();

const app = express();

// configs
app.use(cors());
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, 'public/images')));

// upload image (profile pic)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({storage: storage});

// send to routes
// routes with files
app.post("/auth/signup", upload.single('pic'), AuthController.signup_post)
// app.put('/user', verifyJwtToken, upload.single("profilePic"), UserContoller.profilePic_put)
app.post('/posts', verifyJwtToken, upload.single("pic"), PostController.post_post);

// routes without files
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json({ err: err.message });
  console.log(err.message)
  res.end();
});

module.exports = app;
