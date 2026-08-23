
exports.errorHandler = (err,req,res,next) => {
    console.log(err)
    res.json({msg:"Something went wrong."})
}