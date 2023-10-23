const { delete_all_login_session } = require("./database/query");


exports.postLogin = async (req, res) => {
    try {
        const { email,password } = req.body;

        // check the email and password in vallid or not
        // the user can be 

        // cheif worden

        // warden

        // worker

        // student


        // if not exit return invallid



        // match the both email and password
        
        if (!data) {
            return res.send({ code: 400, message: "cannot destroy the session." })
        }
        return res.send({ code: 200, message: "Logged Out !" })

    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}


exports.postDestory = async (req, res) => {
    try {
        const { userId } = req.body;

        const data =await delete_all_login_session({ userId: userId })

        if (!data) {
            return res.send({ code: 400, message: "cannot destroy the session." })
        }
        return res.send({ code: 200, message: "Logged Out !" })

    } catch (error) {
        return res.send({ code: 500, message: error.message })
    }
}

