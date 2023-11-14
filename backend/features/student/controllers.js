const { getCurrentDateTime } = require("../../helpers/utils")
const { generateToken, decodeToken } = require("../../helpers/tokens");
const { find_all_student, create_student, update_student, delete_student, find_student } = require("./database/query")
const bcrypt = require("bcrypt");
const { delete_login_session, create_login_session } = require("../login_session/database/query");

exports.studentLogin = async (req, res) => {
    try {
  
    //   console.log("Inside super admin login controllers.................")
      const { email, password } = req.body;
  
    //   console.log(email)
    //   console.log(password)
  
      //finding superadmin email in database
      let sa = await find_student({ email })
  
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
  
      const token = generateToken({ permissionNo: 3000, id: sa._id.toString() }, "7d");
  
      // store in the database  in login session
      const data = await create_login_session({ userId: sa._id, accessToken: token })
  
      // seding api response
      let studentData = {
        id: sa._id,
        name: sa.name,
        email: sa.email,
        permissionNo: 3000,
      }
      res.send({ code: 200, data: { userInfo: studentData, jwtToken: token }, message: "student Warden logged in" });
    } catch (error) {
      res.send({ code: 500, message: error.message });
    }
  };
  
  exports.studentLoggout = async (req, res) => {
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


// get all section of student
exports.getAllStudent = async (req, res) => {
    try {
        const data = await find_all_student()
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postStudent = async (req, res) => {
    try {

        // console.log("Inside Post Student Api.....")
        const {
            rollNumber,
            courseName,
            department,
            admisionDate,
            vallidDate,
            name,
            email,
            address,
            phoneNumber,
            password,
            dob,
            roomId,
            blockId,
            hallId,
            date_time,
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
        const cryptedPassword = await bcrypt.hash(dob, 12);

        const data = await create_student({
            rollNumber: rollNumber,
            courseName: courseName,
            department: department,
            admisionDate: admisionDate,
            vallidDate: vallidDate,
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            password: cryptedPassword,
            dob: dob,
            roomId: roomId,
            blockId: blockId,
            hallId: hallId,
            date_time: getCurrentDateTime(),
        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Student" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putStudent = async (req, res) => {
    try {
        // console.log("Inside student update Api.....")
        const {
            _id,
            rollNumber,
            courseName,
            department,
            admisionDate,
            vallidDate,
            name,
            email,
            address,
            phoneNumber,
            password,
            dob,
            roomId,
            blockId,
            hallId,
            date_time,

        } = req.body


        const data = await update_student({
            _id:_id,
            rollNumber: rollNumber,
            courseName: courseName,
            department: department,
            admisionDate: admisionDate,
            vallidDate: vallidDate,
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            password: password,
            dob: dob,
            roomId: roomId,
            blockId: blockId,
            hallId: hallId,
            date_time: getCurrentDateTime(),
        })

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the Student" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_student({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the student." })
        }

        return res.send({ code: 200, message: "Student deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}