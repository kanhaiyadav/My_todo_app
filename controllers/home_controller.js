const Task = require('../model/task_model.js');

module.exports.home = async (req, res)=>{
    try
    {
        let task_list = await Task.find({});
        return res.render('home', {
            tasks: task_list
        });
    }catch(err){
        console.error(err);
    }
}

module.exports.create_task = (req, res)=>{
    try{
        Task.create(req.body);
        return res.redirect('/');
    }catch(err){
        console.error(err);
    }
}

module.exports.delete_tasks = async(req, res)=>{
    let del_list = req.body;
    for(let i in del_list)
    {
        await Task.findByIdAndDelete(i);
    }
    return res.redirect('/');
}