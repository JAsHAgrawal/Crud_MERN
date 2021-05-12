const jwt = require('jsonwebtoken');

var Userdb = require('../model/model');

const requireAuth = (req, res, next) => {
  const token = req.body.token.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'jash agrawal', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        
      } else {
        id = decodedToken.id;
        getuserdetails(id);
      }
    })
  } else {
    res.redirect('/login');
    console.log('a');
  }
  next();
};
const getuserdetails = (id) => {
    Userdb.findById(id)
        .then( resp => {
          console.log(resp);
        })
        .catch(err => {
          console.log(err)
        });
}

module.exports = { requireAuth };