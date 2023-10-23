const { find_all_staff, create_staff, update_staff, delete_staff } = require("./database/query")

// get all section of student
exports.getAllStaff = async (req, res) => {
    try {
        const data = await find_all_staff()
        console.log(data)

        return res.send({ code: 200, data: data.reverse(), message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}


exports.postStaff = async (req, res) => {
    try {

        // console.log("Inside Post Staff Api.....")
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


        const data = await create_staff({
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
            return res.send({ code: 400, message: "Cannot create the Staff" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}


exports.putStaff = async (req, res) => {
    try {
        // console.log("Inside staff update Api.....")
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


        const data = await update_staff({
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
            return res.send({ code: 400, message: "Cannot update the Staff" })
        }
        return res.send({ code: 200, message: "Sucessfully Updated!" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await delete_staff({ _id: id })

        if (!data) {
            return res.send({ code: 400, message: "Cannot delete the staff." })
        }

        return res.send({ code: 200, message: "Staff deleted Successfully." })
    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}