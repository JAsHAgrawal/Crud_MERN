var {Userdb,joiSchema} = require('../model/model');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const Auth = require('../middlewares/authmiddleware');
const xlsx = require('xlsx');
const path = require('path');
const download = require('download');
const joi = require('joi');

//making excel file path
//..............................................................................................
const exportExcel = (data, workSheetColumnNames, name, fpath) => {
  const workBook = xlsx.utils.book_new();
  const workSheetData = [
      workSheetColumnNames,
      ... data
  ];
  
  const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, name);
  xlsx.writeFile(workBook, path.resolve(fpath));
}

const exportUsersToExcel = (users, workSheetColumnNames, name, fpath , no_of_cols) => {
  const cur_cols = []
  const cur_col_names = []
  const data = users.map(user => {
      const total_cols = [user._id,user.email];
      for(let i =0;i<= no_of_cols;i++){
        cur_cols[i] = total_cols[i];
        cur_col_names[i] = workSheetColumnNames[i];
      }
      console.log(cur_cols)
      return cur_cols;
  });
  exportExcel(data, cur_col_names, name, fpath);
}

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
    const {email, password} = req.body;

    try {
        const User = {email,password}
        // const err = await Userdb.joiValidate(User);
        // if (err) throw err;
        const result = await joiSchema.validate({ email, password})
        console.log(result)
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

module.exports.get_data = (req,res) => {
  var users = Userdb.find(function(err,response){
    if (err) return console.error(err);

        res.json(response);
  });
}

module.exports.post_data = (req,res) => {
  const data = req.body.data;
  const columName = req.body.workSheetColumnName;
  const no_of_cols = req.body.no_of_cols;
  console.log(req.body)
  const datee = new Date().getTime();
  const name = `${datee}.xlsx`;
  const fpath = `./client/using_redux/src/outputFiles/${name}`
  console.log(name)
  var writeStream = fs.createWriteStream(fpath);
  exportUsersToExcel(data, columName, name, fpath,no_of_cols);
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `${name}`
  );
  res.json({name:name})
  
}






