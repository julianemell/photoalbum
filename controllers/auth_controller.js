/**
 * Auth Controller
 */

const bcrypt = require('bcrypt');
const debug = require('debug')('books:auth_controller');
const jwt = require('jsonwebtoken');
const models = require('../models');
  
 /**
   * Login a user, sign a JWT token and return it
   *
   * POST /login
   * {
   *   "email": "",
   *   "password": ""
   * }
   */
/* const login = async (req, res) => {
    // check if a user with the username exists
    const user = await models.User.login(req.body.email, req.body.password); //i login ska vi skicka anv.namn och lösen
    if(!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authentication failed'
        });
    }
     
    //construct JWT payload
    //vilken del ska skickas med i denna token - ej mer än nödvändigt
    const payload = {
        sub: user.get('email'),
        user_id: user.get('id'),
        name: user.get('first_name') + ' ' + user.get('last_name'),
    }
 
    //sign payload and get access token
    const access_token = jwt.sign(payload, 'shhh');
 
    //respond with the access token 
    return res.send({
        status: 'success',
        data: {
            access_token,
        }
    });
}
 
module.exports = {
    login,
} */