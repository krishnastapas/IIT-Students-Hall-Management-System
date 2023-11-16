const db = require("./schema")

exports.find_all_request_room_change = async ({ hallId, studentId }) => {

    let data
    if (hallId) {
        data = await db.find({ hallId: hallId });

    }
    if (studentId) {
        data = await db.find({ studentId: studentId })
    }


    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                hallId: data[i].hallId,
                studentId: data[i].studentId,
                roomId: data[i].roomId,
                reasonForChange: data[i].reasonForChange,
                date_time_applied: data[i].date_time_applied,
                date_time_action: data[i].date_time_action,
                status: data[i].status,
                isAccepted: data[i].isAccepted,
                comment: data[i].comment

            })
        }

        return res;
    }
    return []

}
exports.find_request_room_change = async ({ _id }) => {

    const data = await db.findOne({ _id: _id });

    if (data) {
        return {
            _id: data._id,
            hallId: data.hallId,
            studentId: data.studentId,
            roomId: data.roomId,
            reasonForChange: data.reasonForChange,
            date_time_applied: data.date_time_applied,
            date_time_action: data.date_time_action,
            status: data.status,
            isAccepted: data.isAccepted,
            comment: data.comment

        }
    }

    return null;
}

exports.create_request_room_change = async ({
    hallId,
    studentId,
    roomId,
    reasonForChange,
    date_time_applied,
    date_time_action,
    status,
    isAccepted,
    comment
}) => {
    const data = await new db(
        {
            hallId: hallId,
            studentId: studentId,
            roomId: roomId,
            reasonForChange: reasonForChange,
            date_time_applied: date_time_applied,
            date_time_action: date_time_action,
            status: status,
            isAccepted: isAccepted,
            comment: comment

        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            image: data.image,
            name: data.name,
            email: data.email,
            password: data.password,
            dob: data.dob,
            salary: data.salary,
            salaryType: data.salaryType,
            designation: data.designation,
            date_of_joining: data.date_of_joining,
            date_time: data.date_time,
            hallId: data.hallId,
            isAccepted: data.isAccepted,
            comment: data.comment
        }
    }

    return null;
}

exports.update_request_room_change = async ({
    _id,
    hallId,
    studentId,
    roomId,
    reasonForChange,
    date_time_applied,
    date_time_action,
    status,
    isAccepted,
    comment,
}) => {

    const data = await db.updateOne({ _id: _id }, {
        hallId: hallId,
        studentId: studentId,
        roomId: roomId,
        reasonForChange: reasonForChange,
        date_time_applied: date_time_applied,
        date_time_action: date_time_action,
        status: status,
        isAccepted: isAccepted,
        comment: comment
    })

    if (data) {
        return data;
    }

    return null;

}

exports.delete_request_room_change = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}