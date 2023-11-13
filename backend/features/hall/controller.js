const { find_all_hall, create_hall, update_hall, delete_hall, find_hall } = require("./database/query")

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
exports.getHall = async (req, res) => {
    try {
        const {id}=req.params
        const data = await find_hall({_id:id})
        console.log(data)

        return res.send({ code: 200, data: data, message: "Data fetched succesfully" })
    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }
}

exports.postAddHall = async (req, res) => {
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
            wardenEmail,
            wardenPassowrd,
            generalSecretory,
            sportSecretary,
            culuralSecretary,
            environmentalSecretory,
            maintainanceSecretory,
        } = req.body

        const fileName = req.file.filename;

        const data = await create_hall({
            _id: _id,
            image: fileName,
            name: name,
            date_of_establish: date_of_establish,
            warden_incharge: warden_incharge,
            care_taker: care_taker,
            established_by: established_by,
            about: about,
            gallery: gallery,
            date_time: date_time,
            wardenEmail: wardenEmail,
            wardenPassowrd: wardenPassowrd,
            generalSecretory: generalSecretory,
            sportSecretary: sportSecretary,
            culuralSecretary: culuralSecretary,
            environmentalSecretory: environmentalSecretory,
            maintainanceSecretory: maintainanceSecretory,


        });

        if (!data) {
            return res.send({ code: 400, message: "Cannot create the Hall" })
        }
        return res.send({ code: 200, message: "SuccessFully Created." })

    } catch (error) {
        return res.send({ code: 500, message: "Error" + error })
    }

}

exports.postEditHall = async (req, res) => {
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
            wardenEmail,
            wardenPassowrd,
            generalSecretory,
            sportSecretary,
            culuralSecretary,
            environmentalSecretory,
            maintainanceSecretory,

        } = req.body

        let fileName;
        if (req.file) {
            fileName = req.file.filename;

        }
        const data = await update_hall({
            _id: _id,
            image: fileName ? fileName : image,
            name: name,
            date_of_establish: date_of_establish,
            warden_incharge: warden_incharge,
            care_taker: care_taker,
            established_by: established_by,
            about: about,
            gallery: gallery,
            date_time: date_time,
            wardenEmail: wardenEmail,
            wardenPassowrd: wardenPassowrd,
            generalSecretory: generalSecretory,
            sportSecretary: sportSecretary,
            culuralSecretary: culuralSecretary,
            environmentalSecretory: environmentalSecretory,
            maintainanceSecretory: maintainanceSecretory,

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