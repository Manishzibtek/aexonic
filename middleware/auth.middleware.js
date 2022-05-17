const jwt = require('jsonwebtoken');
require('dotenv').config();
const config = require('../middleware/config')
const key = config.jwtKey;
const stringFile = require('../common/string.json')

const Auth = (update = false) => {

    return (req, res, next) => {
        let splited = req.path.split('/');
        if (process.env.jwt_exceptional_url.includes(req.path) || splited[1] == 'file') {
            next()
        } else {
            let { authorization } = req.headers;
            if (!authorization) 
                return res.status(stringFile.AUTHORIZATION_ERROR_STATUS_CODE).send({
                code: 1,
                message: stringFile.UNAUTHORISED_ACCESS_MESSAGE
            });
            let userData = verifyToken(authorization);
            req.userData = {
                userId: userData.userId,
                userEmail: userData.userEmail
            };
            if (!userData) return res.status(stringFile.AUTHORIZATION_ERROR_STATUS_CODE).send({
                code: 2,
                message: stringFile.UNAUTHORISED_ACCESS_MESSAGE
            });
            else next();
        }

    }
}


const verifyToken = (token) => {
    try {
        return jwt.verify(token, key);
    } catch (err) {
        console.log("Error in token :(");
        return false;
    }
}

module.exports = Auth;
