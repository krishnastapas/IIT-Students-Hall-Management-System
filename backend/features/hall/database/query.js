const db = require("./schema")

exports.find_all_hall = async () => {

    const data = await db.find();
    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                image: data[i].image,
                name: data[i].name,
                date_of_establish: data[i].date_of_establish,
                warden_incharge: data[i].warden_incharge,
                care_taker: data[i].care_taker,
                established_by: data[i].established_by,
                about: data[i].about,
                gallery: data[i].gallery,
                date_time: data[i].date_time,
            })
        }

        return res;
    }
    return []

}
exports.find_hall = async ({ _id }) => {

    const data = await db.findOne({ _id: _id });

    if (data) {
        return {
            _id: data._id,
            image: data.image,
            name: data.name,
            date_of_establish: data.date_of_establish,
            warden_incharge: data.warden_incharge,
            care_taker: data.care_taker,
            established_by: data.established_by,
            about: data.about,
            gallery: data.gallery,
            date_time: data.date_time,
        }
    }

    return null;
}

exports.create_hall = async ({
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
}) => {
    const data = await new db(
        {
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
        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            image: data.image,
            name: data.name,
            date_of_establish: data.date_of_establish,
            warden_incharge: data.warden_incharge,
            care_taker: data.care_taker,
            established_by: data.established_by,
            about: data.about,
            gallery: data.gallery,
            date_time: data.date_time,
        }
    }

    return null;
}

exports.update_hall = async ({
    _id,
    image,
    name,
    warden_incharge,
    date_of_establish,
    care_taker,
    established_by,
    about,
    gallery,
    date_time, }) => {

    const data = await db.updateOne({ _id: _id }, {
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

    if (data) {
        return data;
    }

    return null;

}

exports.delete_hall = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}