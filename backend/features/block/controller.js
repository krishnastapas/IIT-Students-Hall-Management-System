const { getCurrentDateTime } = require("../../helpers/utils")
const { find_all_block, create_block, update_block, delete_block } = require("./database/query")
const bcrypt = require("bcrypt");

// get all section of student
exports.getAllBlock = async (req, res) => {
    try {
        const {hallId}=req.params;
        const data = await find_all_block({hallId})
        console.log(data)

        return res.send({ code: 200, data: data, message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postBlock = async (req, res) => {
    try {

        // console.log("Inside Post Block Api.....")
        const {
            name,
            hallId,
            noOfFloors
        } = req.body

        

        const data = await create_block({
            name: name,
            date_time: getCurrentDateTime(),
            hallId: hallId,
            noOfFloors:noOfFloors
        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Block" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putBlock = async (req, res) => {
    try {
        // console.log("Inside block update Api.....")
        const {
            _id,
            name,
            hallId,
            noOfFloors

        } = req.body


        const data = await update_block({
            name: name,
            date_time: getCurrentDateTime(),
            hallId: hallId,
            noOfFloors:noOfFloors,
            _id:_id
        })

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the Block" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteBlock = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_block({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the block." })
        }

        return res.send({ code: 200, message: "Block deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}