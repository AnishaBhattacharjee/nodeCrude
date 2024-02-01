const express=require('express')
const Route=express.Router()
const HomeController=require('../Controller/HomeController')


Route.get('/',HomeController.home)

module.exports= Route