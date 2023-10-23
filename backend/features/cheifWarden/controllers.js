const { generateToken, decodeToken } = require("../../helpers/tokens");
const bcrypt = require("bcrypt");
const { delete_login_session, find_login_sesssion_Id, create_login_session } = require("../login_session/database/query");
const { findCheifWardenQuery, createCheifWarden, updateCheifWarden } = require("./database/query");

// super admin
exports.chiefWardenLogin = async (req, res) => {
  try {

    console.log("Inside super admin login controllers.................")
    const { email, password } = req.body;

    console.log(email)
    console.log(password)

    //finding superadmin email in database
    let sa = await findCheifWardenQuery({ email })

    if (!sa) {
      return res.send({
        code: 400,
        message:
          "The email address you entered is not connected to an account.",
      });
    }

    // const login_session = await find_login_sesssion_Id({ userId: sa._id })

    // alredy someone Logged in
    // if (login_session) {
    //   return res.send({
    //     code: 300,
    //     userId: sa._id,
    //     message: "Already You are logged In from other device.",

    //   })
    // }


    // comaparing password
    const check = await bcrypt.compare(password, sa.password);

    // if passsowrd doesn't match
    if (!check) {
      return res.send({
        code: 400,
        message: "Invalid credentials.Please try again.",
      });
    }

    const token = generateToken({ permissionNo: 1000, id: sa._id.toString() }, "7d");

    // store in the database  in login session
    const data = await create_login_session({ userId: sa._id, accessToken: token })

    // seding api response
    let cheifWardenData = {
      id: sa._id,
      name: sa.name,
      email: sa.email,
      permissionNo: 1000,
    }
    res.send({ code: 200, data: { userInfo: cheifWardenData, jwtToken: token }, message: "Chief Warden logged in" });
  } catch (error) {
    res.send({ code: 500, message: error.message });
  }
};

exports.chiefWardenLoggout = async (req, res) => {
  try {
    const accesstoken = req.headers['Authorization']
    const token = decodeToken(accesstoken);

    // delete the entry with this 
    const data = await delete_login_session({ accesstoken: token })
    if (!data) {
      return res.send({ code: 400, message: "Cannot Logout! server Error." })
    }

    return res.send({ code: 200, message: "Logout successfully." })
  } catch (error) {
    return res.send({ code: 500, message: error.message })
  }
}

exports.postChiefWarden = async (req, res) => {
  try {

    const {
      name,
      email,
      password,

    } = req.body;
    const cryptedPassword = await bcrypt.hash(password, 12);
    const data = await createCheifWarden({ email: email, name: name, passoword: cryptedPassword, role: "SA" })
    if (!data) {
      return res.send({ code: 400, message: "Cannot create" })
    }
    return res.send({ code:200, message: "create sucessfully" })
  } catch (error) {
    return res.send({ code: 500, message: "Error!" })
  }

}

exports.updateSaDeatils = async (req, res) => {
  try {
      console.log("Inside the upadate super admin details api..........")
      const {
          name,
          email,
          password,

      } = req.body.data.info;

      console.log(req.body.data)

      const cryptedPassword = await bcrypt.hash(password, 12);

      let token = req.body.data.accessToken
      console.log("from backend jwt login" + token);


      const decodeObj = decodeToken(token)
      console.log(decodeObj)
      let userId = decodeObj.id
      if (!decodeObj || !userId) {
          return res.send({ code: 400, msg: "Access denied." })
      }


    //   calling update query
      const data=updateCheifWarden({email:email,passoword:cryptedPassword,name:name})
      if (!data) {
          return res.send({ code: 400, msg: "Error occured." })
      }
      //   const emailVerificationToken = generateToken(
      //     { id: user._id.toString() },
      //     "30m"
      //   );
      // sendVerificationEmail(user.email, user.first_name, url);
      // const token = generateToken({ id: admin._id.toString() }, "7d");
      return res.send({
          code: 200,
          msg: "ChiefWarden Details Updated",
      });
  } catch (error) {
      res.json({ code: 500, msg: "Error!" + error });
  }
};


