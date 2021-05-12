var Userdb = require('../model/model');
// var fs = require('fs');
const jwt = require('jsonwebtoken');
const Auth = require('../middlewares/authmiddleware')

//handling errors
//............................................................................
const handleError = (err) =>{
    console.log(err.message,err.code);
    let errors = {email:'',password:''}
    if(err.message === 'incorrect email'){
        errors.email = 'that email is not registered';
    }
    if(err.message === 'incorrect password'){
        errors.password = 'password does not match';
    }

    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
      }
    
      // validation errors
      if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;
        });
      }
    
      return errors;
}
//creating token
//............................................................................
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'jash agrawal', {
    expiresIn: maxAge
  });
};
//post request handler
//............................................................................
module.exports.signup_post = async (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // const user = new Userdb({
    //     email : req.body.email,
    //     password : req.body.password,
       
    // })
    const {email, password} = req.body;

    try {
        const user = await Userdb.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        console.log(res.cookie);
        // res.cookie('')
        res.status(201).json({ user: user._id });
      }
      catch(err) {
        const errors = handleError(err);
        res.status(400).json({ errors });
      }
}
//............................................................................

module.exports.login_post = async (req,res)=>{
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const {email,password} = req.body;
    try{
        const user = await Userdb.login(email,password);
        const token = createToken(user._id);
        console.log(token);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
        res.json({'jwt':token});
        res.status(200).json({user:user._id});
    }
    catch(err){ 
        const errors = handleError(err)
        res.status(400).json({errors})
    }
     
}
//...................................................................
module.exports.signup_get = (req, res) => {
    res.send('signup');
}
//...............................................................
module.exports.login_get = (req, res) => {
    res.send('login');
}
module.exports.home_get = (req, res) => {
  res.send('Home');
}
module.exports.getuser_post = (req, res,next) => {
  
  console.log(id)
  Userdb.findById(id)
        .then( response => {
          res.json(response)
        })
        .catch(err => {
          console.log(err)
        });
  
}





