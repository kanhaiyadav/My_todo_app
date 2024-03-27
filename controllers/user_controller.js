module.exports.profile = (req, res)=>{
    res.send("<h1>It is the profile page</h1>");
};

module.exports.password_manager = (req, res)=>{
    res.send("<h1>Here are your passwords</h1>")
};

module.exports.edit_profile = (req, res)=>{
    res.send("<h1>What do you want to change</h1>");
};