const { getCurrentDateTime } = require("../../helpers/utils")
const { generateToken, decodeToken } = require("../../helpers/tokens");
const { find_all_student, create_student, update_student, delete_student, find_student, find_all_student_hall_not_alloted, find_all_student_room_not_alloted } = require("./database/query")
const bcrypt = require("bcrypt");
const { delete_login_session, create_login_session } = require("../login_session/database/query");
const { findMessWithHallId } = require("../mess/database/query");

exports.studentLogin = async (req, res) => {
    try {

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
            ...sa,
            permissionNo: 3000,
        }
        res.send({ code: 200, data: { userInfo: studentData, jwtToken: token }, message: "student Warden logged in" });
    } catch (error) {
        res.send({ code: 500, message: error.message });
    }
};




// get all section of student
exports.getAllStudent = async (req, res) => {
    try {
        let roomId = req.query.roomId;
        let hallId = req.query.hallId;
        let blockId = req.query.blockId;

        const data = await find_all_student({ roomId, hallId, blockId })
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.getAllStudentHallNotAlloted = async (req, res) => {
    try {
        let roomId = req.query.roomId;
        let hallId = req.query.hallId;
        let blockId = req.query.blockId;

        const data = await find_all_student_hall_not_alloted();
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.getAllStudentRoomNotAlloted = async (req, res) => {
    try {
        let roomId = req.query.roomId;
        let hallId = req.query.hallId;
        let blockId = req.query.blockId;

        const data = await find_all_student_room_not_alloted();
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
            hallRecord,
            messRecord,
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
        const cryptedPassword = await bcrypt.hash(rollNumber, 12);

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
            hallRecord: hallRecord,
            messRecord: messRecord,
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

exports.allotHallStudents = async (req, res) => {
    try {

        // console.log("Inside Post Student Api.....")
        const { studentList } = req.body

        if (!studentList) {
            return res.send({ code: 400, message: "Student list not found." })
        }
        for (let i = 0; i < studentList.length; i++) {

            const mess = await findMessWithHallId({ hallId: studentList[i].hallId });
            console.log(mess)
            const data = update_student({ ...studentList[i], messId: mess._id });

            if (!data) {
                return res.send({ code: 400, message: "Cannot Update the Student" })
            }
        }

        return res.send({ code: 200, message: "Alloted SuccessFully ." })

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
            hallRecord,
            messRecord,
            date_time,

        } = req.body

        const cryptedPassword = await bcrypt.hash(rollNumber, 12);

        const data = await update_student({
            _id: _id,
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
            hallRecord: hallRecord,
            messRecord: messRecord,
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