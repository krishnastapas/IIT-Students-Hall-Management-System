const { getCurrentDateTime } = require("../../../helpers/utils");
const db = require("./schema");

exports.find_login_sesssion_Id = async ({ userId }) => {

    const data = await db.findOne({ userId: userId });
    if (data) {
        return {
            id: data._id,
            userId: data.userId,
            accessToken: data.accessToken,
            date_time: data.date_time,
        }
    }
}

exports.find_login_sesssion_accesstoken = async ({ accessToken }) => {

    const data = await db.findOne({ accessToken: accessToken });
    if (data) {
        return {
            id: data._id,
            userId: data.userId,
            accessToken: data.accessToken,
            date_time: data.date_time
        }
    }
}

exports.create_login_session = async ({ userId, accessToken }) => {

    const currentDateTime = getCurrentDateTime();
    console.log(currentDateTime);
    const data = await new db(
        {
            accessToken: accessToken,
            userId: userId,
            active: true,
            date_time: currentDateTime
        }
    ).save()

    if (!data) {
        return null;
    }

    return {
        id: data._id,
        userId: data.userId,
        accessToken: data.accessToken,
        date_time: data.date_time
    }

}

exports.update_jwtToken = async ({ userId, accessToken }) => {
    const currentDateTime = getCurrentDateTime();
    const data = await db.updateOne({ userId: userId }, {
        accessToken: accessToken,
        date_time: currentDateTime
    })
    return data;
}
exports.delete_login_session = async ({ accessToken }) => {
    const data = await db.deleteOne({ accessToken: accessToken });

    return data;
}

exports.delete_all_login_session = async ({ userId }) => {
    const data = await db.deleteMany({ userId: userId });

    return data;
}
