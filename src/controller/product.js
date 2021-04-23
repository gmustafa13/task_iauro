const product = require('../schama/product');
const {
    TE,
    eRes,
    sRes
} = require('../../utils')

const getProduct = async (req, res) => {
    try {

        let userInfo = req.query;
        let result;
        //pagination
        let page = parseInt(userInfo.page) ? parseInt(userInfo.page) : 1
        let limit = parseInt(userInfo.limit) ? parseInt(userInfo.limit) : 10
        let skip = (page - 1) * limit;

        // searching object

        if (userInfo.keyWord) {
            result = await product.find({
                $match: {
                    $or: [{
                            name: {
                                $regex: userInfo.keyWord
                            }
                        },
                        {
                            description: {
                                $regex: userInfo.keyWord
                            }
                        }
                    ]
                }
            }).skip(skip).limit(limit)
        } else {
            result = await product.find().skip(skip).limit(limit)
        }
        let count = await product.count();
        let temp = {
            data: result,
            limit: limit,
            page: page,
            count: count
        }
        return sRes(res, temp)
    } catch (error) {
        eRes(res, error)
    }

}

const deleteProduct = async (req, res) => {
    try {
        let id = req.params;
        let deleteObj = await product.findOneAndDelete({
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
const updateProduct = async (req, res) => {
    try {
        let id = req.params;
        let userInfo = req.body;

        let updatedData = await product.findOneAndUpdate({
            _id: id
        }, userInfo, {
            returnNewDocument: true
        });
        if (updatedData) {
            return sRes(res, updatedData)
        } else {
            return eRes(res, 'error while updating product')
        }
    } catch (error) {
        eRes(res, error)

    }
}

module.exports = {
    getProduct,
    deleteProduct,
    updateProduct
}