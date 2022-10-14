const { Console } = require('console');
const fs = require('fs');
const User = require('./../models/User');


class LoginController{

    static async login(req, res, next){
        const { email, password } = req.body;
        await User.login(email, password)
            .then((result)=>{
                if(!result.msg){
                    res.status(200).json({
                        "token": result.token
                    });
                }
                else{
                    res.status(200).json({
                        "msg": result.msg
                    });
                }
            });
    }

    static async  register(req, res){
        const { email, password } = req.body;
        await User.register(email, password)
            .then((result) => {
                res.status(200).json(result);
            });

    }
}

module.exports = LoginController;