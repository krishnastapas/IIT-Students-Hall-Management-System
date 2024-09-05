const db = require("./schema")

exports.find_all_block = async ({ hallId }) => {

    const data = await db.find({ hallId: hallId });
    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                name: data[i].name,
                date_time: data[i].date_time,
                hallId: data[i].hallId,
                noOfFloors: data[i].noOfFloors
            })
        }

        return res;
    }
    return []

}
exports.find_block = async ({ _id }) => {

    const data = await db.findOne({ _id: _id });

    if (data) {
        return {
            _id: data._id,
            name: data.name,
            date_time: data.date_time,
            hallId: data.hallId,
            noOfFloors: data.noOfFloors
        }
    }

    return null;
}

exports.create_block = async ({
    name,
    date_time,
    hallId,
    noOfFloors
}) => {
    const data = await new db(
        {

            name: name,
            date_time: date_time,
            hallId: hallId,
            noOfFloors: noOfFloors
        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            name: data.name,
            date_time: data.date_time,
            hallId: data.hallId,
            noOfFloors: data.noOfFloors
        }
    }

    return null;
}

exports.update_block = async ({
    _id,
    name,
    date_time,
    hallId,
    noOfFloors
}) => {

    const data = await db.updateOne({ _id: _id }, {
        _id: _id,
        name: name,
        date_time: date_time,
        hallId: hallId,
        noOfFloors: noOfFloors
    })

    if (data) {
        return data;
    }

    return null;

}

exports.delete_block = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}