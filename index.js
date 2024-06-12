const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose.js');
const passport = require('passport');
const passportLocal = require('./config/passport.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const path = require('path');
const customMware = require('./config/middleware.js');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

//Here we are encrypting the user.id that is stored in session cookie.
app.use(session({
    name: 'todo',

    //it is a secret key used to encrypt and decrypt the user.id stored in session
    // TODO change the secret before deployment in production mode
    secret: 'somethingrandom',

    //True: When saveUninitialized is set to true, the session will be saved to the store even if it is new and has not been modified. This can be useful if you need to track visits to your site for statistics or similar purposes, even if the session data is empty.
    //Example: Consider a web application where users can browse content without logging in or performing any actions that modify the session. With saveUninitialized: true, a session would be created and stored for every visitor, even if they don't do anything that requires session data. This can lead to a large number of unnecessary sessions in your store.
    saveUninitialized: false,

    //True: When resave is set to true, the session will be saved back to the session store, even if the session was never modified during the request.
    resave: false,
    cookie: {
        //setting the expiry time of cookie
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/tasks_db",
        autoRemove: 'disabled',
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

//code for setting up flash messages
app.use(flash());
app.use(customMware.setFlash);

app.use(cookieParser());
app.use(express.static('./assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//making uploads folder static(i.e. making it available for finding static files)
app.use("/uploads", express.static(__dirname + "/uploads"));
console.log(__dirname + "/uploads");

app.use('/', require('./routes/index.js'));

app.listen(port, function (err) {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Your server is up and running...');
})

