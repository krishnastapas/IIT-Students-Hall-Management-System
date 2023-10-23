const { delete_all_login_session } = require("./database/query");


exports.postLogin = async (req, res) => {
    try {
        // const { email,password } = req.body;


    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}



