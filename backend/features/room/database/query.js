const db = require("./schema")

exports.find_all_room = async ({ hallId, blockId }) => {

    const data = await db.find({ hallId, blockId });
    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                name: data[i].name,
                date_time: data[i].date_time,
                hallId: data[i].hallId,
                blockId: data[i].blockId,
                noOfBeds: data[i].noOfBeds,
                isEmpty: data[i].isEmpty,
                studentId: data[i].studentId,
                status: data[i].status,
                floor: data[i].floor,
            })
        }

        return res;
    }
    return []

}
exports.find_room = async ({ _id }) => {

    const data = await db.findOne({ _id: _id });

    if (data) {
        return {
            _id: data._id,
            name: data.name,
            date_time: data.date_time,
            hallId: data.hallId,
            blockId: data.blockId,
            noOfBeds: data.noOfBeds,
            isEmpty: data.isEmpty,
            studentId: data.studentId,
            status: data.status,
            floor: data.floor
        }
    }

    return null;
}

exports.create_room = async ({
    name,
    date_time,
    hallId,
    blockId,
    noOfBeds,
    isEmpty,
    studentId,
    status,
    floor
}) => {
    const data = await new db(
        {
            name: name,
            date_time: date_time,
            hallId: hallId,
            blockId: blockId,
            noOfBeds: noOfBeds,
            isEmpty: isEmpty,
            studentId: studentId,
            status: status,
            floor: floor
        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            name: data.name,
            date_time: data.date_time,
            hallId: data.hallId,
            blockId: data.blockId,
            noOfBeds: data.noOfBeds,
            isEmpty: data.isEmpty,
            studentId: data.studentId,
            status: data.status,
            floor: data.floor
        }
    }

    return null;
}

exports.update_room = async ({
    _id,
    name,
    date_time,
    hallId,
    blockId,
    noOfBeds,
    isEmpty,
    studentId,
    status,
    floor
}) => {

    const data = await db.updateOne({ _id: _id }, {
        name: name,
        date_time: date_time,
        hallId: hallId,
        blockId: blockId,
        noOfBeds: noOfBeds,
        isEmpty: isEmpty,
        studentId: studentId,
        status: status,
        floor: floor
    })

    if (data) {
        return data;
    }

    return null;

}

exports.delete_room = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}