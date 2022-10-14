const jwt = require('jsonwebtoken');
const fs = require('fs');
const User = require('./../models/User');

async function authMiddleware(req, res, next) {
    try {
        const { authorization } = req.headers;
        // Cek Token jika tidak error menjadi Internal Server Error
        if (!authorization) {
            throw {name: "Unauthorized"}
        }
        const userToken = authorization.split('Bearer ');
        if (userToken.length !== 2) throw { name: 'InvalidToken' };
        const { email } = jwt.verify(userToken[1], process.env.JWT_SECRET);
        fs.readFile('./data/user.json', (err, result) => {
            const data = JSON.parse(result);
            const found = data.user.some(e => e.email === email);
            if(!found){
                throw {name: "Unauthorized"}
            };
            req.user = { email };
            next();
        });
    } catch (error) {
        console.log(error);
        // res.status(401).json({message: 'unauthorized'});
        // next(error);
    }
}

module.exports = authMiddleware;
