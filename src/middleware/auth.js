  
const jwt = require('jsonwebtoken');
const user = require('../schama/user');
const {
    TE,
    eRes
} = require('../../utils');

const auth = async (req, res, next) => {
    try {
        req.headers.authorization ? req.headers.authorization : eRes(res, "Token Required");
        let isVerify = await jwt.verify(req.headers.authorization, process.env.SECRET);
        if (isVerify) {
            req.email = isVerify.data;
            next();
        } else {
            eRes(res, "Token is Not Valid")
        }

    } catch (error) {
        eRes(res, "Token is Not Valid")
    }
}
const singleAdmin = async (req, res, next) => {
    try {
        let userInfo = req.body;
        if (userInfo.userType === 'admin') {      
            let userData = await user.findOne({ userType: 'admin' });
            if (userData) {
                return eRes(res,'One admin is there you can not create new admin')
            } else {
                next();
            }
        } else {
            next();
        }
    } catch (error) {
        eRes(res,error)
    }
}
const isAdmin = async (req, res, next) => {
    try {
        let authData = await auth(req, res, next);
        if (authData) {
            let admin = await user.findOne({ email: authData.email })
            if (admin) {
                next()
            } else {
                eRes(res,'You does not have permission to delete')
            }
        }
    } catch (error) {
        eRes(res,error)
    }  
}
module.exports = {
    auth,
    singleAdmin,
    isAdmin
}