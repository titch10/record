
const verifyToken = (req,res,next)=>{
    console.log('accediendo al middleware')
    next()
}
exports.verifyToken = verifyToken