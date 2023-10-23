const { generateToken, decodeToken } = require("../../helpers/tokens");
const bcrypt = require("bcrypt");
// const { findStudent } = require("../student/database/dataBaseQuery");
// const { find_department } = require("../department/database/databaseQuery");
// const { findSuperAdminQuery } = require("../superAdmin/database/databaseQuery");
const { update_jwtToken } = require("../login_session/database/query");
// const { findAdmin } = require("../admin/database/adminQuery");
const { findCheifWardenQuery } = require("../cheifWarden/database/query");
// const { find_user } = require("../User/database/databaseQuery");

exports.postJwtLogin = async (req, res) => {
    try {
        console.log("Inside the pist JWT login app...............")
        const jwtToken = req.header('Authorization');
        console.log(jwtToken)
        const token = await decodeToken(jwtToken);
        console.log(token)

        if (!token) {
            return res.send({ code: 400, message: "Token not found." })
        }
        let data;

        // admin
        if (token.permissionNo == 3000) {
            // data = await findAdmin({ id: token.id });
        }

        //department
        // if (token.permissionNo == 3001 || token.permissionNo == 3002 || token.permissionNo == 3003 ||
        //     token.permissionNo == 3004 || token.permissionNo == 3005) {
        //     data = await find_department({ id: token.id })
        //     if (!data) {
        //         data = await find_user({ id: token.id })
        //     }
        // }


        // superadmin
        if (token.permissionNo == 1000) {
            data = await findCheifWardenQuery({ id: token.id })
        }

        if (!data) {
            return res.send({ code: 400, message: "data not found" })
        }

        // generate new token
        const newtoken = generateToken({ permissionNo: token.permissionNo, id: data._id.toString() }, "7d");


        // update token to database
        const updated_data = await update_jwtToken({ accessToken: newtoken, userId: data._id });

        const userInfo = { ...data, permissionNo: token.permissionNo }
        console.log(userInfo)
        return res.send({ code: 200, data: { userInfo: userInfo, jwtToken: newtoken } })

    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}