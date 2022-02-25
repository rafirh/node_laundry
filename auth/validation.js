const {verify} = require('jsonwebtoken');
const secret = '#$@^%*&%$$@&'; 

module.exports={
    checkToken:(req,res,next)=>{
        let token = req.get("authorization");
 
        if(token){
            let wow = token.slice(7)
            verify(wow,secret,(err,decoded)=>{
                if(err){
                    res.json({
                        success:0,
                        message:"Login First",
                    })
                }else{
                    let user = decoded.result
                    next()  
                }
            })
        }else{
            res.json({
                success:0,
                message:"Access Denied : unauthorized user"
            })
        }
    }
}
