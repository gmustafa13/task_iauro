const user = require('../schama/user');
const {
    TE,
    eRes,
    sRes
} = require('../../utils')
const jwt = require('jsonwebtoken');

const create = async (req, res) => {
    try {
        let userData = req.body ? req.body : TE("Body not present");
        let data = new user(userData);
        let result = await data.save();
        if (result) {
            return sRes(res, result, 200)
        } else {
            TE('error while saving Data')
        }
    } catch (error) {
        return eRes(res, error, 401);
    }
}
const signIn = async (req, res) => {
    let userInfo = req.body;
    if (!userInfo.password) {
        eRes(res, "password required for sigin")
    };
    let userData = await user.findOne({
        email: userInfo.email
    });
    if (userData) {
        let isPasswordCorrect = await jwt.verify(userInfo.password, process.env.jwt_secret); 
        if (isPasswordCorrect) {
            return await generateToken(userData);
        } else {
            return TE("in correct password")
        }
    }else {
        return eRes(res, 'User not Found');
}
}
const generateToken = async (userInfo) => {
    return await jwt.sign({
        data: userInfo.email
    }, process.env.SECRET);

}
const deleteUser = async (req, res) => {
    try {
        let id = req.params;
        let deleteObj = await user.findOneAndDelete({
            _id: id
        });
        if (!deleteObj) {
            return eRes(res, 'error while deleting')
        }
        return sRes(res, 'successfully deleted')

    } catch (error) {
        eRes(res, error)
    }
}
const updateUser = async (req, res) => {
    try {
        let id = req.params;
        let userInfo = req.body;

        let updatedData = await user.findOneAndUpdate({
            _id: id
        }, userInfo, {
            returnNewDocument: true
        });
        if (updatedData) {
            return sRes(res, updatedData)
        } else {
            return eRes(res, 'error while updating user')
        }
    } catch (error) {
        eRes(res, error)

    }
}

module.exports = {
    create,
    signIn,
    deleteUser,
    updateUser
}