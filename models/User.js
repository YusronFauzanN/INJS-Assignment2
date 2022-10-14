const { rejects } = require('assert');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { resolve } = require('path');
const { nextTick } = require('process');


class User{
    static async login(email, password){
        return new Promise((resolve, reject) => {
            fs.readFile('./data/user.json', (err, result) => {
                const { user } = JSON.parse(result);
                    try {
                        let marker = false;
                        user.forEach(e => {
                            if (email == e.email && password == e.password) {
                                const token = jwt.sign({"email":e.email}, process.env.JWT_SECRET);
                                marker = true;
                                resolve({
                                    "success" : true,
                                    "token": token
                                });
                            }
                        });
                        if(marker == false){
                            resolve({
                                "msg": "Wrong email or password"
                            });
                        }
                    } catch (error) {
                        return error;
                    }
            });
        });
    }

    static async register(email, password){
        return new Promise((resolve,reject) => {
            fs.readFile('./data/user.json', (err, result) => {
                const data = JSON.parse(result);
                const obj = {
                    "email": email,
                    "password": password
                }
                try {
                    const found = data.user.some(e => e.email === email);
                    if(!found){
                        data.user.push(obj);
                        const user = data.user; //Array dari json file
                        const object = {
                            user
                        }; // Memasukan array ke object
                        let value = JSON.stringify(object);
                        fs.writeFile('./data/user.json', value, (err) => {
                            const token = jwt.sign({"email":email}, process.env.JWT_SECRET);
                            resolve({
                                "msg": "Registered",
                                "token": token
                            })
                        });
                    }
                } catch (error) {
                    return error;
                }
            });
        });
    }
}

module.exports = User;