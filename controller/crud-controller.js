const Datadiri = require('./../models/Datadiri');


class CrudController{
    static async create(req, res){
        const { nama, umur, alamat } = req.body;
        const email = req.user;
        await Datadiri.create(nama, umur, alamat, email)
        .then((result) => {
            if(!result){
                res.status(200).json({
                    "msg": "Failed"
                })    
            }
            res.status(200).json(result);
        });
    }
    static async getAll(req, res){
        const email = req.user;
        await Datadiri.findAll(email)
        .then((result) => {
            if(!result.msg){
                res.status(200).json({
                    result
                });
            }
            else{
                res.status(404).json({
                    "msg": result.msg
                });
            }
        });
    }
}
module.exports = CrudController;