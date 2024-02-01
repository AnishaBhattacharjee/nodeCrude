const Student=require('../Model/studentModel')


const viewPage=async(req,res)=>{
    try{
        const stuData= await Student.find()
        res.render('crud/viewStudent',{
            title:"studentpage",
            result:stuData
        })
        console.log(stuData);
    }catch(error){
        console.log(error);
    }
    
}
const addData=(req,res)=>{
    res.render('crud/addStudent',{
        title:"addData"
    })
}
const createData=(req,res)=>{
    // console.log(req.body);
    const StudentData=new Student({
        name:req.body.name,
        email:req.body.email,
        city:req.body.city,
        phone:req.body.phone
    })
    StudentData.save().then((data)=>{
        console.log(data,'data has been added successfully');
        res.redirect('/students')
    }).catch((error)=>{
        console.log(error);
        res.redirect('/addStudent')
    })
}

const edit=(req,res)=>{
    const id=req.params.id
    Student.findById(id).then(data=>{
        console.log(data)
        res.render('crud/Edit',{
            title:"edit-page",
            singledata:data
        })
    }).catch(err=>{
        console.log(err)
    })
}

const updateData=(req,res)=>{
   
    // console.log(image);
    const id=req.body.s_id
    const name=req.body.name
    const email=req.body.email
    const city=req.body.city
    const phone=req.body.phone
    Student.findById(id).then((result)=>{
        result.name=name
        result.email=email
        result.city=city
        result.phone=phone
        
        return result.save().then(results=>{    
            res.redirect('/students')
            console.log(results,"update successfully")
        })
    }).catch(err=>{
        console.log(err,"update failed-")
    })
}


const deleteData=(req,res)=>{

    const id=req.params.id
    // Student.deleteOne({_id:id}).then(del=>{
    //     res.redirect('/students')
    // }).catch((err)=>{
    //     console.log(err,"delete failed")
    // })

    Student.findByIdAndUpdate({_id:id},{status:0}).then(del=>{
        res.redirect('/students')
    }).catch(err=>{
        console.log(err,"delete failed")
    })
}

module.exports={
    viewPage,addData,createData,edit,updateData,deleteData
}