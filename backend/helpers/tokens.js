const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const { find_login_sesssion_accesstoken } = require("../features/login_session/database/query");
dotenv.config()


const TOKEN_SECRET = 'jgsalgdjksgfkljsajkfn.h;k2349237-p9oweiofhsdklfbkjsadhf239'
exports.generateToken = (payload, expired) => {
  return jwt.sign(payload, TOKEN_SECRET, {
    expiresIn: expired,
  });
};

exports.decodeToken = async (token) => {
  // console.log(token)
  if (
    !token ||
    !token.startsWith('Bearer') ||
    !token.split(' ')[1]
  ) return null;

  const theToken = token.split(' ')[1];
  // console.log(theToken)
  try {

    let payload = jwt.verify(theToken, TOKEN_SECRET);
    console.log(payload)
    return {
      id: payload.id,
      permissionNo: payload.permissionNo
    }
    
    
    // verify from the database
    // let data = await find_login_sesssion_accesstoken({ accessToken: theToken });

    // // console.log(data)
    // if (data && data.userId != payload.id) {
    //   return null
    // }
    // let payload_database = jwt.verify(data.accessToken, TOKEN_SECRET);
    // return {
    //   id: data.userId,
    //   permissionNo: payload_database.permissionNo
    // }
  } catch (error) {
    console.log("Invallid token")
    return null;
  }
}