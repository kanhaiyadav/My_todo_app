const Task = require('../model/task_model.js');
const User = require('../model/users_model.js');

module.exports.unknown = (req, res) => {
    return res.render('unknown');
}
module.exports.home = async (req, res) => {
    try {
        let user = await User.findById(req.user._id).populate("tasks");
        return res.render('home', {
            user: user
        });
    } catch (err) {
        console.error(err);
    }
}

module.exports.create_task = async (req, res) => {
    try {
        let user = await User.findById(req.user._id);
        let task = await Task.create({
            description: req.body.description,
            category: req.body.category,
            date: req.body.date,
            user: req.user._id
        });
        await user.tasks.push(task);
        await user.save();
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    task: task
                },
                message: "Task created successfully"
            });
        }
        return res.redirect('/home');
    } catch (err) {
        console.error(err);
    }
}

module.exports.delete_task = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, { $pull: { tasks: req.params.id } });
        await Task.findByIdAndDelete(req.params.id);
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    task_id: req.params.id
                },
                message: "Task deleted successfully"
            });
        }
        return res.redirect('/home');
    } catch (err) {
        console.log(err);
    }

}

module.exports.update = async (req, res) => {
    try {
        // let task = await Task.findById(req.body.id);
        await Task.findByIdAndUpdate(req.body.id, req.body.form_data);
        // await task.save();
        res.status(200).json({
            message: "updated successfully",
            data: {
                task_id: req.body.id,
                task: await Task.findById(req.body.id)
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err
        })
    }
}