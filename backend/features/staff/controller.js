const { getCurrentDateTime } = require("../../helpers/utils")
const { find_all_staff, create_staff, update_staff, delete_staff } = require("./database/query")
const bcrypt = require("bcrypt");

// get all section of student
exports.getAllStaff = async (req, res) => {
    try {
        const { id } = req.params
        const data = await find_all_staff({hallId:id})
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postStaff = async (req, res) => {
    try {

        // console.log("Inside Post Staff Api.....")
        const {
            image,
            name,
            email,
            password,
            dob,
            salary,
            salaryType,
            designation,
            date_of_joining,
            date_time,
            hallId
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

        const data = await create_staff({
            name: name,
            email: email,
            date_of_joining: date_of_joining,
            date_time: getCurrentDateTime(),
            designation: designation,
            dob: dob,
            image: image,
            password: cryptedPassword,
            salary: salary,
            salaryType: salaryType,
            hallId: hallId
        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Staff" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putStaff = async (req, res) => {
    try {
        // console.log("Inside staff update Api.....")
        const {
            _id,
            image,
            name,
            email,
            dob,
            salary,
            salaryType,
            designation,
            date_of_joining,
            date_time,
            hallId

        } = req.body


        const data = await update_staff({
            name: name,
            email: email,
            date_of_joining: date_of_joining,
            date_time: getCurrentDateTime(),
            designation: designation,
            dob: dob,
            image: image,
            salary: salary,
            salaryType: salaryType,
            hallId: hallId,
            _id: _id
        })

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the Staff" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_staff({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the staff." })
        }

        return res.send({ code: 200, message: "Staff deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}