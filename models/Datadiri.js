const fs = require('fs');
const jwt = require('jsonwebtoken');
const { resolve } = require('path');

class Datadiri{
    static async create(nama, umur, alamat, emailOwner){
        const { email } = emailOwner;
        return new Promise((resolve,reject) => {
            fs.readFile('./data/data.json', (err, result) => {
                const data = JSON.parse(result);
                const owner = jwt.sign({"email":email}, process.env.JWT_SECRET);
                const obj = {
                    "nama": nama,
                    "umur": umur,
                    "alamat": alamat,
                    "owner": owner
                }
                try {
                    data.datadiri.push(obj);
                    const datadiri = data.datadiri; //Array dari json file
                    const object = {
                        datadiri
                    }; // Memasukan array ke object
                    let value = JSON.stringify(object);
                    fs.writeFile('./data/data.json', value, (err) => {
                        resolve({
                            "msg": "Registered",
                        })
                    });
                } catch (error) {
                    return error;
                }
            });
        });
    }
    static async findAll(owner){
        const { email } = owner;
        return new Promise((resolve, reject) => {
            fs.readFile('./data/data.json', (err, result) => {
                const obj = [];
                const { datadiri } = JSON.parse(result);
                try {
                    let marker = false;
                    datadiri.forEach(e => {
                        const ownerTemp = jwt.verify(e.owner, process.env.JWT_SECRET);
                        if (email == ownerTemp.email) {
                            const temp = {
                                "nama": e.nama,
                                "umur": e.umur,
                                "alamat": e.alamat
                            };
                            obj.push(temp);
                        }
                        
                    });
                    if (marker == true) {
                        resolve(
                            obj
                        );
                    }else{
                        resolve({
                            "msg": "Data Not Found"
                        })
                    }
                } catch (error) {
                    
                }
            });
        });
    }
}
module.exports = Datadiri;