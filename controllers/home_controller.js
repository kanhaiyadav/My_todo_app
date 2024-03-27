module.exports.home = function(req, res){
    res.send('<h1>hi there everybody</h1>');
}

module.exports.about = (req, res)=>{
    res.send("<h1>Here is everything you want to know about me</h1>");
}