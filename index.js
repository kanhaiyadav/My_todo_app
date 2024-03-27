const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose.js');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./static'));
app.use(express.urlencoded({extended: true}))
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err)
    {
        console.error(err);
        return;
    }
    console.log('Your server is up and running...');
})