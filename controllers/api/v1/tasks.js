let Task = require("../../../model/task_model.js");

module.exports.index = async (req, res) => {
    let tasks = await Task.find({});
    return res.status(200).json({
        message: "Hello from API v1",
        tasks: tasks
    });
}

module.exports.delete = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        console.log(task.user.toString(), req.user.id, task.user.toString() === req.user.id);
        if(task.user.toString() === req.user.id) {
            await Task.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                message: "Task deleted successfully"
            });
        } else {
            return res.status(401).json({
                message: "Unauthorized, you cannot delete this post"
        })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to delete the task"
        });
    }
}