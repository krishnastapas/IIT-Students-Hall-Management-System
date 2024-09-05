const db = require("./schema")

exports.find_all_staff = async ({ hallId }) => {

    const data = await db.find({ hallId: hallId });
    const res = []
    if (data.length) {
        for (let i = 0; i < data.length; i++) {
            res.push({
                _id: data[i]._id,
                image: data[i].image,
                name: data[i].name,
                email: data[i].email,
                password: data[i].password,
                dob: data[i].dob,
                salary: data[i].salary,
                salaryType: data[i].salaryType,
                designation: data[i].designation,
                date_of_joining: data[i].date_of_joining,
                date_time: data[i].date_time,
                hallId: data[i].hallId
            })
        }

        return res;
    }
    return []

}
exports.find_staff = async ({ _id }) => {

    const data = await db.findOne({ _id: _id });

    if (data) {
        return {
            _id: data._id,
            image: data.image,
            name: data.name,
            email: data.email,
            password: data.password,
            dob: data.dob,
            salary: data.salary,
            salaryType: data.salaryType,
            designation: data.designation,
            date_of_joining: data.date_of_joining,
            date_time: data.date_time,
        }
    }

    return null;
}

exports.create_staff = async ({
    image,
    name,
    email,
    password,
    dob,
    salary,
    salaryType,
    designation,
    date_of_joining,
    date_time,
    hallId
}) => {
    const data = await new db(
        {

            image: image,
            name: name,
            email: email,
            password: password,
            dob: dob,
            salary: salary,
            salaryType: salaryType,
            designation: designation,
            date_of_joining: date_of_joining,
            date_time: date_time,
            hallId: hallId
        }
    ).save();

    if (data) {
        return {
            _id: data._id,
            image: data.image,
            name: data.name,
            email: data.email,
            password: data.password,
            dob: data.dob,
            salary: data.salary,
            salaryType: data.salaryType,
            designation: data.designation,
            date_of_joining: data.date_of_joining,
            date_time: data.date_time,
            hallId: data.hallId
        }
    }

    return null;
}

exports.update_staff = async ({
    _id,
    image,
    name,
    email,
    dob,
    salary,
    salaryType,
    designation,
    date_of_joining,
    date_time, }) => {

    const data = await db.updateOne({ _id: _id }, {
        _id: _id,
        image: image,
        name: name,
        email: email,
        dob: dob,
        salary: salary,
        salaryType: salaryType,
        designation: designation,
        date_of_joining: date_of_joining,
        date_time: date_time,
    })

    if (data) {
        return data;
    }

    return null;

}

exports.delete_staff = async ({ _id }) => {
    const data = await db.deleteOne({ _id: _id });

    return data;
}