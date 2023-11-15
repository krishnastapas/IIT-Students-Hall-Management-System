const db = require("./schema")

exports.find_all_student = async ({ roomId, blockId, hallId }) => {

    let data = await db.find();

    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                rollNumber: data[i].rollNumber,
                courseName: data[i].courseName,
                department: data[i].department,
                admisionDate: data[i].admisionDate,
                vallidDate: data[i].vallidDate,
                name: data[i].name,
                email: data[i].email,
                address: data[i].address,
                phoneNumber: data[i].phoneNumber,
                password: data[i].password,
                dob: data[i].dob,
                date_time: data[i].date_time,
                roomId: data[i].roomId,
                blockId: data[i].blockId,
                hallId: data[i].hallId,
                messId: data[i].messId,
                messRecord: data[i].messRecord,
                hallRecord: data[i].hallRecord,

            })
        }

        return res;
    }
    return []

}

exports.find_all_student_hall_not_alloted = async () => {

    let data = await db.find({
        $and: [
            {
                $or: [
                    { hallId: { $exists: false } },
                    { hallId: { $eq: null } },
                    { hallId: { $eq: "" } },
                    { hallId: { $eq: " " } }
                ]
            },
            {
                $or: [
                    { roomId: { $exists: false } },
                    { roomId: { $eq: null } },
                    { roomId: { $eq: "" }, },
                    { roomId: { $eq: " " }, }
                ]
            },
            {
                $or: [
                    { messId: { $exists: false } },
                    { messId: { $eq: null } },
                    { messId: { $eq: "" } },
                    { messId: { $eq: " " } }
                ]
            }
        ]
    })

    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                rollNumber: data[i].rollNumber,
                courseName: data[i].courseName,
                department: data[i].department,
                admisionDate: data[i].admisionDate,
                vallidDate: data[i].vallidDate,
                name: data[i].name,
                email: data[i].email,
                address: data[i].address,
                phoneNumber: data[i].phoneNumber,
                password: data[i].password,
                dob: data[i].dob,
                date_time: data[i].date_time,
                roomId: data[i].roomId,
                blockId: data[i].blockId,
                hallId: data[i].hallId,
                messId: data[i].messId,
                messRecord: data[i].messRecord,
                hallRecord: data[i].hallRecord,

            })
        }

        return res;
    }
    return []

}

exports.find_all_student_room_not_alloted = async ({ hallId }) => {

    console.log(hallId)

    let data = await db.find({
        hallId: hallId,
        $and: [
            {
                $or: [
                    { roomId: { $exists: false } },
                    { roomId: { $eq: null } },
                    { roomId: { $eq: "" } },
                    { roomId: { $eq: " " } }
                ]
            },
            {
                $or: [
                    { blockId: { $exists: false } },
                    { blockId: { $eq: null } },
                    { blockId: { $eq: "" } },
                    { blockId: { $eq: " " } }
                ]
            }
        ]
    })

    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                rollNumber: data[i].rollNumber,
                courseName: data[i].courseName,
                department: data[i].department,
                admisionDate: data[i].admisionDate,
                vallidDate: data[i].vallidDate,
                name: data[i].name,
                email: data[i].email,
                address: data[i].address,
                phoneNumber: data[i].phoneNumber,
                password: data[i].password,
                dob: data[i].dob,
                date_time: data[i].date_time,
                roomId: data[i].roomId,
                blockId: data[i].blockId,
                hallId: data[i].hallId,
                messId: data[i].messId,
                messRecord: data[i].messRecord,
                hallRecord: data[i].hallRecord,

            })
        }

        return res;
    }
    return []

}

exports.find_student = async ({ _id, email }) => {

    let data
    if (_id) {

        data = await db.findOne({ _id: _id });
    }

    if (email) {
        data = await db.findOne({ email: email });
    }

    if (data) {
        return {
            _id: data._id,
            rollNumber: data.rollNumber,
            courseName: data.courseName,
            department: data.department,
            admisionDate: data.admisionDate,
            vallidDate: data.vallidDate,
            name: data.name,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
            password: data.password,
            dob: data.dob,
            roomId: data.roomId,
            blockId: data.blockId,
            hallId: data.hallId,
            messId: data.messId,
            date_time: data.date_time,
            hallRecord: data.hallRecord,
            messRecord: data.messRecord,
        }
    }

    return null;
}

exports.create_student = async ({
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
    date_time,
    roomId,
    blockId,
    hallId,
    messId,
    hallRecord,
    messRecord
}) => {

    const data = await new db(
        {

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
            date_time: date_time,
            roomId: roomId,
            blockId: blockId,
            hallId: hallId,
            messId: messId,
            hallRecord: hallRecord,
            messRecord: messRecord
        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            rollNumber: data.rollNumber,
            courseName: data.courseName,
            department: data.department,
            admisionDate: data.admisionDate,
            vallidDate: data.vallidDate,
            name: data.name,
            email: data.email,
            address: data.address,
            phoneNumber: data.phoneNumber,
            password: data.password,
            dob: data.dob,
            date_time: data.date_time,
            roomId: data.roomId,
            blockId: data.blockId,
            hallId: data.hallId,
            hallRecord: data.hallRecord,
            messRecord: data.messRecord
        }
    }

    return null;
}

exports.update_student = async ({
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
    messId,
    hallRecord,
    messRecord,
    date_time,
}) => {

    const data = await db.updateOne({ _id: _id }, {
        rollNumber: rollNumber,
        courseName: courseName,
        department: department,
        admisionDate: admisionDate,
        vallidDate: vallidDate,
        name: name,
        email: email,
        password: password,
        address: address,
        phoneNumber: phoneNumber,
        dob: dob,
        roomId: roomId,
        blockId: blockId,
        hallId: hallId,
        messId: messId,
        hallRecord: hallRecord,
        messRecord: messRecord,
        date_time: date_time,
    })

    if (data) {
        return data;
    }

    return null;

}

exports.delete_student = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}