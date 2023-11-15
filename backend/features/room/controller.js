const { getCurrentDateTime } = require("../../helpers/utils")
const { find_all_room, create_room, update_room, delete_room } = require("./database/query")
const bcrypt = require("bcrypt");

// get all section of student
exports.getAllRoom = async (req, res) => {
    try {
        const { hallId, blockId } = req.params;
        const data = await find_all_room({ hallId: hallId, blockId: blockId })
        console.log(data)
        const sortedData = data.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0; // Objects are equal
        });
        return res.send({ code: 200, data: sortedData, message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postRoom = async (req, res) => {
    try {

        // console.log("Inside Post Room Api.....")
        const {
            name,
            date_time,
            hallId,
            blockId,
            noOfBeds,
            noOfStudent,
            studentId,
            price,
            floor
        } = req.body



        const data = await create_room({
            name: name,
            date_time: date_time,
            hallId: hallId,
            blockId: blockId,
            noOfBeds: noOfBeds,
            noOfStudent: noOfStudent,
            studentId: studentId,
            price: price,
            floor: floor
        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Room" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putRoom = async (req, res) => {
    try {
        // console.log("Inside room update Api.....")
        const {
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
        } = req.body


        const data = await update_room({
            _id: _id,
            date_time: getCurrentDateTime(),
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

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the Room" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_room({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the room." })
        }

        return res.send({ code: 200, message: "Room deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}