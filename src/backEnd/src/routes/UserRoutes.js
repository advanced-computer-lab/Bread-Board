const express=require('express');
const userController=require('../Controller/UserController');
const flightController=require('../Controller/FlightController');
const userRouter=express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({extended: false}));

userRouter.get('/',userController.home);
userRouter.post('/createFlight',flightController.createFlight);
userRouter.get('/searchFlight',flightController.searchFlight);
userRouter.get('updateFlight',flightController.updateFlight);

module.exports=userRouter;