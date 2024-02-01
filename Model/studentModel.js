const mongoose=require('mongoose')
const stuSchema=mongoose.Schema

const studentSchema= new stuSchema({
name:{
    type: String,
    required:true
},
email:{
    type: String,
    required:true
},
city:{
    type: String,
    required:true
},
phone:{
    type: Number,
    required:true
},
status:{
    type: Number,
    default:1
},
},
{
    timestamps:true
}
)

const studentModel=mongoose.model('studentData',studentSchema)
module.exports=studentModel