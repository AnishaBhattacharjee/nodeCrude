const student=require('../Model/studentModel')

const view=async(req,res)=>{
try{
   const studentApiData= await student.find()
   return res.status(200).json({
    success:true,
    message:"Data Fetched Successfully",
    data:studentApiData
   })
}catch(error){
    return res.status(404).json({success:false,message:"Data Not Found"})
}
}

const create=async(req,res)=>{
    console.log(req.body);
try{
    const {name,email,phone,city}=req.body

    if (!(name && email && city && phone)) {
        return res.status(400).json({
            status:400,
            message:"All input is required"
        });
     }
     const checkDuplicate = await student.findOne({ email:email });
     if(checkDuplicate){
        return res.status(400).json({
            status:400,
            message:"Email Id Is Already Exist"
        });
     }

    const StuData= await new student({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        phone:req.body.phone
    })
 const result = await StuData.save()
   return res.status(201).json({
    success:true,
    message:"Data Added Successfully",
    data:result
   })
}catch(error){
    return res.status(404).json({success:false,message:"Error"})
}
}

const edit=async(req,res)=>{
    try{
        const id = req.params.id;
       const studentData= await student.findById(id)
       if(!studentData){
        return res.status(404).json({
            success:false,
            message: "Not found Student with id ",
           })
       }else{
        return res.status(200).json({
            success:true,
            message:"Data Fetched Successfully",
            data:studentData
           })
       }
       
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"Data Not Found"
        })
    }
    }

    const update=async(req,res)=>{
        try{
            if (!req.body) {
                return res.status(400).json({
                  message: "Data to update can not be empty!"
                });
              }
              const id = req.params.id;
             const result=await student.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
             if(!result){
                res.status(404).json({
                    message: `Cannot update Tutorial with id=${id}. Maybe Data was not found!`
                  });
             }else{
                return res.status(200).json({
                    success:true,
                    message:"Data update Successfully",
                   })

             }

        }catch(err){
            return res.status(404).json({
                success:false,
                error:err.message
            })

        }

    }


    const deleteData=async(req,res)=>{
        const id = req.params.id
        const sResult=await student.findByIdAndRemove(id).then(data => {
            if (!data) {
              return res.status(404).json({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
              });
            } else {
              return res.status(200).json({
                status:true,
                message: "Student was deleted successfully!"
              });
            }
          }).catch(err => {
             return res.status(500).json({
              message: "Could not delete Tutorial with id=" + id
            });
          });
    }

module.exports={
    view,create,edit,update,deleteData
}