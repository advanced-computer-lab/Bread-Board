const express=require('express');
const userController=require('../Controller/UserController');
const userRouter=express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended: false}));

userRouter.get('/',userController.home);

module.exports=userRouter;