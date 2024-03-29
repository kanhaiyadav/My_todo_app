let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/tasks_db");

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Problem connecting to the database'));

db.once('open', ()=>{
    console.log("Databse connection successful...");
})

module.exports = db;