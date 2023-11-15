const { getCurrentDateTime } = require("../../helpers/utils")
const { generateToken, decodeToken } = require("../../helpers/tokens");
const { find_all_mess, create_mess, update_mess, delete_mess, find_mess } = require("./database/query")
const bcrypt = require("bcrypt");
const { delete_login_session, create_login_session } = require("../login_session/database/query");

exports.messLogin = async (req, res) => {
  try {

    const { email, password } = req.body;

    //   console.log(email)
    //   console.log(password)

    //finding superadmin email in database
    let sa = await find_mess({ email:email })

    if (!sa) {
      return res.send({
        code: 400,
        message:
          "The email address you entered is not connected to an account.",
      });
    }

  

    // comaparing password
    const check = await bcrypt.compare(password, sa.password);

    // if passsowrd doesn't match
    if (!check) {
      return res.send({
        code: 400,
        message: "Invalid credentials.Please try again.",
      });
    }

    const token = generateToken({ permissionNo: 3000, id: sa._id.toString() }, "7d");

    // store in the database  in login session
    const data = await create_login_session({ userId: sa._id, accessToken: token })

    // seding api response
    let messData = {
      id: sa._id,
      name: sa.name,
      email: sa.email,
      permissionNo: 4000,
    }
    
    res.send({ code: 200, data: { userInfo: messData, jwtToken: token }, message: "mess Warden logged in" });
  } catch (error) {
    res.send({ code: 500, message: error.message });
  }
};

exports.passwordSet = async (req, res) => {
  try {
      const { password } = req.body
      const data = await update_mess({ password: password })
      if (!data) {
          return res.send({ code: 400, data: data.reverse(), message: "cannot set password" })


      }
      return res.send({ code: 200, message: "password set succesfully" })

      return res.send({ code: 400, data: data.reverse(), message: "cannot set password" })
  } catch (error) {
      return res.send({ code: 500, message: "Error" + error })
  }
}
// exports.messLoggout = async (req, res) => {
//   try {
//     const accesstoken = req.headers['Authorization']
//     const token = decodeToken(accesstoken);

//     // delete the entry with this 
//     const data = await delete_login_session({ accesstoken: token })
//     if (!data) {
//       return res.send({ code: 400, message: "Cannot Logout! server Error." })
//     }

//     return res.send({ code: 200, message: "Logout successfully." })
//   } catch (error) {
//     return res.send({ code: 500, message: error.message })
//   }
// }


// get all section of mess
exports.getAllMess = async (req, res) => {
  try {
    const data = await find_all_mess()
    console.log(data)

    return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
  } catch (error) {
    return res.send({ code: 500, message: "Error" + error })
  }
}


exports.postMess = async (req, res) => {
  try {

    // console.log("Inside Post Mess Api.....")
    const {
      hallList,
      name,
      managerName,
      perDayMeal,
      date_time,
      email,
      password,
      establishedDate,
      establishedBy,
    } = req.body

    // console.log({
    //     image,
    //     name,
    //     email,
    //     password,
    //     dob,
    //     salary,
    //     salaryType,
    //     designation,
    //     date_of_joining,
    //     date_time,
    // })
    const cryptedPassword = await bcrypt.hash(password, 12);

    const data = await create_mess({
      hallList: hallList,
      name: name,
      managerName: managerName,
      perDayMeal: perDayMeal,
      email: email,
      password: cryptedPassword,
      establishedDate: establishedDate,
      establishedBy: establishedBy,
      date_time: getCurrentDateTime(),
    });

    if (!data) {
      return res.send({ code: 400, message: "Cannot create the Mess" })
    }
    return res.send({ code: 200, message: "SuccessFully Created." })

  } catch (error) {
    return res.send({ code: 500, message: "Error" + error })
  }

}


exports.putMess = async (req, res) => {
  try {
    // console.log("Inside mess update Api.....")
    const {
      _id,
      hallList,
      name,
      managerName,
      perDayMeal,
      date_time,
      email,
      password,
      establishedDate,
      establishedBy,

    } = req.body


    const data = await update_mess({
      _id: _id,
      hallList: hallList,
      name: name,
      managerName: managerName,
      perDayMeal: perDayMeal,
      date_time: date_time,
      email: email,
      password: password,
      establishedDate: establishedDate,
      establishedBy: establishedBy,
      date_time: getCurrentDateTime(),
    })

    if (!data) {
      return res.send({ code: 400, message: "Cannot update the Mess" })
    }
    return res.send({ code: 200, message: "Sucessfully Updated!" })
  } catch (error) {
    return res.send({ code: 500, message: "Error" + error })
  }
}

exports.deleteMess = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await delete_mess({ _id: id })

    if (!data) {
      return res.send({ code: 400, message: "Cannot delete the mess." })
    }

    return res.send({ code: 200, message: "Mess deleted Successfully." })
  } catch (error) {
    return res.send({ code: 500, message: error.message })
  }
}