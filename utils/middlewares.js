exports.checkPrice = (req,res,next) => {
    if(req.body.Price < 500){
        res.send("Price To much low,we do not allow to sell.")
    }else{
        next();
    }
} 