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

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(session({
    name:'todo',
    secret:'somethingrandom',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create({
        mongoUrl: "mongodb://localhost/tasks_db",
        autoRemove: 'disabled',
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());

app.use(cookieParser());
app.use(express.static('./assets'));
app.use(express.urlencoded({extended: true}))
app.use('/', require('./routes/index.js'));

app.listen(port, function(err){
    if(err)
    {
        console.error(err);
        return;
    }
    console.log('Your server is up and running...');
})

