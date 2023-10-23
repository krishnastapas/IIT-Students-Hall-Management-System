const db = require("./schema")


// find student from studentdetails by email
exports.findCheifWardenQuery = async ({ email, id }) => {
    let admin;
    if (email) {
        admin = await db.findOne({ email: email });
    }
    else if (id) {
        admin = await db.findOne({ _id: id });

    }

    if (admin)
        return {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            password: admin.password,
        }
    // not found 
    return null;
}
exports.createCheifWarden = async ({ name, email, passoword, role }) => {
    const data = await new db(
        {
            "name": name,
            "email": email,
            "password": passoword,
            "role": role
        }
    ).save()
    if (data) {
        return {
            id: data._id,
            name: data.name,
            passoword: data.passoword,
            role: data.role
        }
    }
    return null
}
exports.updateCheifWarden = async ({ id ,name,email,passoword}) => {
    const data = await db.updateOne({ _id: id }, {
        name:name,
        email:email,
        passoword:passoword
    })
    return data
}

