const express=require('express')
const mongoose=require('mongoose')
const body_parser=require('body-parser')
const cors = require('cors')
const ejs=require('ejs')
const app=express()

app.set('view engine','ejs')
app.set('views','views')

// works as a middleware to use the api in react
app.use(cors())

// to retrieve data from the body
app.use(body_parser.urlencoded({ extended: true }))
app.use('/productimage', express.static(__dirname + '/productimage'));
// create application/json parser
app.use(body_parser.json())

// for home routing
const HomeRouter=require('./Route/HomeRouter')
app.use(HomeRouter)

// for crud routing
const CrudRouter=require('./Route/crudRoute')
app.use(CrudRouter)

// for api routing
const ApiRouter=require('./Route/ApiRoute')
app.use('/api', ApiRouter)

// for api routing
const UserRouter=require('./Route/UserRoute')
app.use(UserRouter)
 
const dbDriver="mongodb+srv://anishab163:sM8lXuTkZEQ8y5HN@cluster0.m4nz8rm.mongodb.net/crudpractice"
const port= process.env.PORT || 4500
mongoose.connect(dbDriver,{useNewUrlParser:true,useUnifiedTopology:true})
.then(result=>{
    app.listen(port,()=>{
        console.log(`server running http://localhost:${port}`)
        console.log('dB is connected');
    })
}).catch(err=>{
    console.log(err)
})


