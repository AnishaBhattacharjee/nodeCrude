const express = require('express')
const Route=express.Router()
const ApiController= require('../Controller/ApiController')
const ProductController=require('../Controller/productController')
const UserApiController=require('../Controller/UserApiController')

Route.get('/students',ApiController.view)
Route.post('/students/create',ApiController.create)
Route.get("/edit/:id", ApiController.edit);
Route.post("/updatedata/:id", ApiController.update);
Route.delete("/deletedata/:id", ApiController.deleteData);

//****product  */
const productimage=require('../utility/ProductImage')
Route.post('/product',productimage.array('image',6),ProductController.product)
module.exports=Route


// ***user data***
Route.get('/users',UserApiController.viewUser)
// Route.get('/users/create',UserApiController.viewUser)



