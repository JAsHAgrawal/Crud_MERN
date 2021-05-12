const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

var schema = new mongoose.Schema({
    email : {
        type : String,
        required: [true,'pease enter email'],
        unique:true,
        validate:[isEmail, "please enter valid email"]    
    },
    password : {
        type: String,
        required: true,
        minlength:[6,"minimum 6 letters"]
    },
})
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

const Userdb = mongoose.model('authx', schema);

module.exports = Userdb;