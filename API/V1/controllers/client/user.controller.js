const User = require("../../models/user.model")
// [POST] /api/v1/client/login
module.exports.login = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    const existEmail = await User.findOne({deleted: false, email : email})
    if(!existEmail){
        console.log("email not exist!")
        res.json(

            {
                message: "email not exist!",
                code: 3
            }
        )
        return;
    }
    if(password !== existEmail.password){
        res.json(

            {
                message: "Incorrect password!",
                code: 4
            }
        )
        return;
    }
    res.json({
        message: "Login successful!",
        code:1,
        token: existEmail.token
    })
    
    
}

// [POST] /api/v1/client/add
module.exports.addUser = async (req, res) => {
    const  data = req.body;

    const clientNew = new User(data)
    await clientNew.save()

    res.json(
        {
            message: "Create Sucessful!",
            code: 1
        }
    )
}