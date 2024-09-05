const { find_all_hall, create_hall, update_hall, delete_hall } = require("./database/query")

// get all section of student
exports.getAllHall = async (req, res) => {
    try {
        const data = await find_all_hall()
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postHall = async (req, res) => {
    try {

        // console.log("Inside Post Hall Api.....")
        const {
            _id,
            image,
            name,
            warden_incharge,
            date_of_establish,
            care_taker,
            established_by,
            about,
            gallery,
            date_time,
        } = req.body


        const data = await create_hall({
            _id: _id,
            image: image,
            name: name,
            date_of_establish: date_of_establish,
            warden_incharge: warden_incharge,
            care_taker: care_taker,
            established_by: established_by,
            about: about,
            gallery: gallery,
            date_time: date_time,

        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Hall" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putHall = async (req, res) => {
    try {
        // console.log("Inside hall update Api.....")
        const {
            _id,
            image,
            name,
            warden_incharge,
            date_of_establish,
            care_taker,
            established_by,
            about,
            gallery,
            date_time,

        } = req.body


        const data = await update_hall({
            _id: _id,
            image: image,
            name: name,
            date_of_establish: date_of_establish,
            warden_incharge: warden_incharge,
            care_taker: care_taker,
            established_by: established_by,
            about: about,
            gallery: gallery,
            date_time: date_time,
        })

        if (!data) {
            return res.send({ code: 400, message: "Cannot update the Hall" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteHall = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_hall({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the hall." })
        }

        return res.send({ code: 200, message: "Hall deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}