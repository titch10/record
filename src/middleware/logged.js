const isLogged = (req,res,next)=>{
    let logged =true
    if(logged){
    next()
    }else{
        console.log('debe loguearse')
    }
}

exports.isLogged=isLogged