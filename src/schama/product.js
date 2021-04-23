const mongoose = require('mongoose');
const schema = mongoose.Schema
let productSchema = new schema({
    name: {
        type: String,
        trim: true,
        require:[true , 'Product name required']
    },
    description: {
        type: String,
        trim: true,
        require:[true ,'product Description required']
    },
    isDisplay: {
        type: Boolean,
        default: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        require:[true, 'user Id is required']
    }
})
 
module.exports = mongoose.model("product", productSchema);