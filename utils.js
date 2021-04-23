const eRes = async (res, err, statusCode) => {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }
    let code = statusCode?statusCode:400
    return res.status(code).json({success: false, error: err});
}

const TE = async (msg)=>{
    throw new Error(msg)
}

const sRes = async (res, result, statusCode) => {
    let code = statusCode?statusCode:200
   return  res.status(code).json({success:true,result:result,status:code})
    
}


module.exports = {
    TE,
    eRes,
    sRes
}