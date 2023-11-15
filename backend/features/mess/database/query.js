const db = require("./schema")

exports.find_all_mess = async () => {

    const data = await db.find();
    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                hallList: data[i].hallList,
                name: data[i].name,
                managerName: data[i].managerName,
                perDayMeal: data[i].perDayMeal,
                date_time: data[i].date_time,
                email: data[i].email,
                password: data[i].password,
                establishedDate: data[i].establishedDate,
                establishedBy: data[i].establishedBy,
            })
        }

        return res;
    }
    return []

}
exports.findMessWithHallId = async ({ hallId }) => {

    let data
    console.log(hallId)
    if (hallId) {
        data = await db.findOne({ hallList: { $in: [hallId] } })
    }


    if (data) {
        return {
            _id: data._id,
            hallList: data.hallList,
            name: data.name,
            managerName: data.managerName,
            perDayMeal: data.perDayMeal,
            email: data.email,
            password: data.password,
            establishedDate: data.establishedDate,
            establishedBy: data.establishedBy,
            date_time: data.date_time
        }
    }

    return null;
}
exports.find_mess = async ({ _id, email }) => {

    let data
    if (_id) {

        data = await db.findOne({ _id: _id });
    }

    if (email) {
        data = await db.findOne({ email: email });
    }

    if (data) {
        return {
            _id: data._id,
            hallList: data.hallList,
            name: data.name,
            managerName: data.managerName,
            perDayMeal: data.perDayMeal,
            email: data.email,
            password: data.password,
            establishedDate: data.establishedDate,
            establishedBy: data.establishedBy,
            date_time: data.date_time
        }
    }

    return null;
}

exports.create_mess = async ({
    hallList,
    name,
    managerName,
    perDayMeal,
    date_time,
    email,
    password,
    establishedDate,
    establishedBy,
}) => {

    const data = await new db(
        {

            hallList: hallList,
            name: name,
            managerName: managerName,
            perDayMeal: perDayMeal,
            date_time: date_time,
            email: email,
            password: password,
            establishedDate: establishedDate,
            establishedBy: establishedBy,
        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            hallList: data.hallList,
            name: data.name,
            managerName: data.managerName,
            perDayMeal: data.perDayMeal,
            date_time: data.date_time,
            eemail: data.email,
            password: data.password,
            establishedDate: data.establishedDate,
            establishedBy: data.establishedBy,
        }
    }

    return null;
}

exports.update_mess = async ({
    _id,
    hallList,
    name,
    managerName,
    perDayMeal,
    date_time,
    email,
    password,
    establishedDate,
    establishedBy, }) => {

    const data = await db.updateOne({ _id: _id }, {
        hallList: hallList,
        name: name,
        managerName: managerName,
        perDayMeal: perDayMeal,
        date_time: date_time,
        email: email,
        password: password,
        establishedDate: establishedDate,
        establishedBy: establishedBy,
    })

    if (data) {
        return data;
    }

    return null;

}

exports.delete_mess = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}