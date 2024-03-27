const mongoose = require('mongoose');

const task_schema = new mongoose.Schema({
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    }
})

const Task = mongoose.model('Task', task_schema);
module.exports = Task;