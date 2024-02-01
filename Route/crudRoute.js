const express = require('express')
const Route=express.Router()
const CrudController= require('../Controller/CrudController')

Route.get('/students',CrudController.viewPage)
Route.get('/addStudent',CrudController.addData)
Route.post('/create',CrudController.createData)
Route.get('/edit/:id',CrudController.edit)
Route.post('/updatedata',CrudController.updateData)
Route.get('/delete/:id',CrudController.deleteData)


module.exports=Route