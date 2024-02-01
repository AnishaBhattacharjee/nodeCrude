const user=require('../Model/userModel')

const viewUser=async(req,res)=>{
    try{
        const userData= await user.find()
        return res.status(200).json({
            success:true,
            message:"Data Found",
            data: userData
        })
    }catch(err){
   return res.status(404).json({
        success:false,
        message:"no data found"
    })
    }
}

module.exports={
    viewUser
}