const db = require("./schema")

exports.find_all_room = async ({ hallId, blockId }) => {

    let data
    if (hallId && blockId)
        data = await db.find({ hallId, blockId });
    else if (hallId) {
        data = await db.find({ hallId: hallId });

    }
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
                noOfStudent: data[i].noOfStudent,
                studentId: data[i].studentId,
                price: data[i].price,
                floor: data[i].floor,
            })
        }

        return res;
    }
    return []

}

exports.find_no_of_empty_room = async ({ hallId }) => {


    try {
        const result = await db.aggregate([
            {
                $match: {
                    hallId: hallId
                }
            },
            {
                $group: {
                    _id: null,
                    bedDifferenceSum: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$noOfStudent", null]
                                },
                                then: "$noOfBeds",
                                else: {
                                    $subtract: ["$noOfBeds", "$noOfStudent"]
                                }
                            }
                        }
                    }
                }
            }
        ]);

        console.log(result)

        if (result.length > 0) {
            return result[0].bedDifferenceSum;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error calculating bed difference sum:", error);
        throw error;
    }


}


exports.find_room = async ({ _id, hallId }) => {

    let data = await db.findOne({ _id: _id });

    if (data) {
        return {
            _id: data._id,
            name: data.name,
            date_time: data.date_time,
            hallId: data.hallId,
            blockId: data.blockId,
            noOfBeds: data.noOfBeds,
            noOfStudent: data.noOfStudent,
            studentId: data.studentId,
            price: data.price,
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
    noOfStudent,
    studentId,
    price,
    floor
}) => {
    const data = await new db(
        {
            name: name,
            date_time: date_time,
            hallId: hallId,
            blockId: blockId,
            noOfBeds: noOfBeds,
            noOfStudent: noOfStudent,
            studentId: studentId,
            price: price,
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
            noOfStudent: data.noOfStudent,
            studentId: data.studentId,
            price: data.price,
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
    noOfStudent,
    studentId,
    price,
    floor
}) => {

    const data = await db.updateOne({ _id: _id }, {
        name: name,
        date_time: date_time,
        hallId: hallId,
        blockId: blockId,
        noOfBeds: noOfBeds,
        noOfStudent: noOfStudent,
        studentId: studentId,
        price: price,
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