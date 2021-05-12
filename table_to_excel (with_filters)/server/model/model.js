const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');
var joi = require('joi');
const joigoose = require('joigoose')(mongoose)

// var schema = new mongoose.Schema({
//     email : {
//         type : String,
//         required: [true,'pease enter email'],
//         unique:true,
//         // validate:[isEmail, "please enter valid email"]    
//     },
//     password : {
//         type: String,
//         required: true,
//         minlength:[6,"minimum 6 letters"]
//     },
// })

  const joiSchema = joi.object({
    email: joi
    .string()
    .email()
    .required()
    ,
    password: joi.string().min(6).max(30).required(),
  })

    
  const schema = new mongoose.Schema(joigoose.convert(joiSchema))
    schema.post('save', function (doc, next) {
        
        next();
    });
  
  // fire a function before doc saved to db
    schema.pre('save',async function (next) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();
    });

    //stactic methods...............................................
    schema.statics.login = async function(email, password) {
        const user = await this.findOne({ email });
        if (user) {
          const auth = await bcrypt.compare(password, user.password);
          if (auth) {
            return user;
          }
          throw Error('incorrect password');
        }
        throw Error('incorrect email');
      };

      // schema.statics.joiValidate = function(obj) {
      //   var schema = {
      //     email: Joi.types.String().email().required(),
      //     password: Joi.types.String().min(6).max(30).required(),
      //   }
      //   return Joi.validate(obj, schema);
      // }

const Userdb = mongoose.model('authx', schema);

module.exports = {Userdb,joiSchema};