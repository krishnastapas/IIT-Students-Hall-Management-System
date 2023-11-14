const db = require("./schema")

exports.find_all_student = async () => {

    const data = await db.find();
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
            date_time: data.date_time,
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
    dob,
    roomId,
    blockId,
    hallId,
    date_time, }) => {

    const data = await db.updateOne({ _id: _id }, {
        rollNumber: rollNumber,
        courseName: courseName,
        department: department,
        admisionDate: admisionDate,
        vallidDate: vallidDate,
        name: name,
        email: email,
        address: address,
        phoneNumber: phoneNumber,
        dob: dob,
        roomId: roomId,
        blockId: blockId,
        hallId: hallId,
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