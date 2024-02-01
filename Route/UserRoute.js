const express = require('express')
const Route=express.Router()
const UserController= require('../Controller/UserController')

Route.get('/users',UserController.viewUser)
Route.get('/addUsers',UserController.addUserData)
Route.post('/createUser',UserController.createUserData)
Route.get('/edit/:id',UserController.edit)
Route.post('/updatedata',UserController.updateData)
Route.get('/delete/:id',UserController.deleteData)


module.exports=Route