const { generateToken, decodeToken } = require("../../helpers/tokens");
const { create_login_session, delete_login_session } = require("../login_session/database/query");
const { find_no_of_empty_room, find_room, find_all_room } = require("../room/database/query");
const { find_all_hall, create_hall, update_hall, delete_hall, find_hall } = require("./database/query")
const bcrypt = require("bcrypt");


exports.wardenLogin = async (req, res) => {
    try {

        const { email, password } = req.body;

        console.log(email)
        console.log(password)

        //finding  email in database
        let sa = await find_hall({ wardenEmail: email })

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
        const check = await bcrypt.compare(password, sa.wardenPassword);

        // if passsowrd doesn't match
        if (!check) {
            return res.send({
                code: 400,
                message: "Invalid credentials.Please try again.",
            });
        }

        const token = generateToken({ permissionNo: 2000, id: sa._id.toString() }, "7d");

        // store in the database  in login session
        const data = await create_login_session({ userId: sa._id, accessToken: token })

        // seding api response
        let wardenData = {
            ...sa,
            name: sa.warden_incharge,
            email: sa.wardenEmail,
            permissionNo: 2000,
        }
        res.send({ code: 200, data: { userInfo: wardenData, jwtToken: token }, message: " Warden logged in" });
    } catch (error) {
        res.send({ code: 500, message: error.message });
    }
};

exports.passwordSet = async (req, res) => {
    try {
        const { wardenPassword, _id } = req.body
        console.log(wardenPassword,_id)
        const cryptedPassword = await bcrypt.hash(wardenPassword, 12);

        const data = await update_hall({ _id: _id, wardenPassword: cryptedPassword })
        if (!data) {
            return res.send({ code: 400, data: data.reverse(), message: "cannot set password" })


        }
        return res.send({ code: 200, message: "password set succesfully" })

        return res.send({ code: 400, data: data.reverse(), message: "cannot set password" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

// get all section of student
exports.getAllHall = async (req, res) => {
    try {
        const data = await find_all_hall()
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.getAllHallRoomEmpty = async (req, res) => {
    try {
        const data = await find_all_hall()
        console.log(data)

        const hallList = []
        for (let i = 0; i < data.length; i++) {
            const hall = data[i];
            const roomLsts = await find_all_room({ hallId: hall._id });
            let emptyRoom = 0;
            for (let r = 0; r < roomLsts.length; r++) {
                emptyRoom += roomLsts[r].noOfBeds - roomLsts[r].noOfStudent;
            }
            console.log(emptyRoom)
            hallList.push({
                ...hall,
                noOfEmptyRooms: emptyRoom,
                noOfAlloted: 0
            })
        }

        return res.send({ code: 200, data: hallList, message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.getHall = async (req, res) => {
    try {
        const { id } = req.params
        const data = await find_hall({ _id: id })
        console.log(data)

        return res.send({ code: 200, data: data, message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.postAddHall = async (req, res) => {
    try {

        // console.log("Inside Post Hall Api.....")
        const {
            _id,
            image,
            name,
            warden_incharge,
            date_of_establish,
            care_taker,
            established_by,
            about,
            gallery,
            date_time,
            wardenEmail,
            wardenPassword,
            generalSecretory,
            sportSecretary,
            culuralSecretary,
            environmentalSecretory,
            maintainanceSecretory,
        } = req.body

        const fileName = req.file.filename;

        const data = await create_hall({
            _id: _id,
            image: fileName,
            name: name,
            date_of_establish: date_of_establish,
            warden_incharge: warden_incharge,
            care_taker: care_taker,
            established_by: established_by,
            about: about,
            gallery: gallery,
            date_time: date_time,
            wardenEmail: wardenEmail,
            wardenPassword: wardenPassword,
            generalSecretory: generalSecretory,
            sportSecretary: sportSecretary,
            culuralSecretary: culuralSecretary,
            environmentalSecretory: environmentalSecretory,
            maintainanceSecretory: maintainanceSecretory,


        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Hall" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}

exports.postEditHall = async (req, res) => {
    try {
        // console.log("Inside hall update Api.....")
        const {
            _id,
            image,
            name,
            warden_incharge,
            date_of_establish,
            care_taker,
            established_by,
            about,
            gallery,
            date_time,
            wardenEmail,
            wardenPassword,
            generalSecretory,
            sportSecretary,
            culuralSecretary,
            environmentalSecretory,
            maintainanceSecretory,

        } = req.body

        let fileName;
        if (req.file) {
            fileName = req.file.filename;

        }
        const data = await update_hall({
            _id: _id,
            image: fileName ? fileName : image,
            name: name,
            date_of_establish: date_of_establish,
            warden_incharge: warden_incharge,
            care_taker: care_taker,
            established_by: established_by,
            about: about,
            gallery: gallery,
            date_time: date_time,
            wardenEmail: wardenEmail,
            wardenPassword: wardenPassword,
            generalSecretory: generalSecretory,
            sportSecretary: sportSecretary,
            culuralSecretary: culuralSecretary,
            environmentalSecretory: environmentalSecretory,
            maintainanceSecretory: maintainanceSecretory,

        })

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the Hall" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteHall = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_hall({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the hall." })
        }

        return res.send({ code: 200, message: "Hall deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}