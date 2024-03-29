const User = require('../model/users_model.js');

module.exports.signin = (req, res)=>{
    if(!req.isAuthenticated())
        return res.render('user-signin');
    else
        res.redirect('back');
};

module.exports.signup = (req, res)=>{
    if(!req.isAuthenticated())
        return res.render('user-signup');
    else
        res.redirect('back');
};

module.exports.profile = (req, res)=>{
    return res.render('profile');
};

module.exports.create = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email})
        console.log(req.body.email, user);
        if (!user){
            try{
                User.create(req.body);
                return res.redirect('/user/signin');
            }catch(err){
                console.log('error in creating user while signing up'); 
                return;
            }
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log('error in finding user in signing up'); 
        return;
    }
}

module.exports.authorize = (req, res)=>{
    res.redirect('/');
}
