const express = require("express");
const userController = require("../Controller/UserController");
const flightController = require("../Controller/FlightController");
const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(express.urlencoded({ extended: false }));

userRouter.get("/", userController.home);

userRouter.post("/createFlight", flightController.createFlight);

userRouter.post("/searchFlight", flightController.searchFlight);

userRouter.post("/searchFlightOne", flightController.searchFlightOne);

userRouter.put("/updateFlight", flightController.updateFlight);

userRouter.delete("/deleteFlight/:id", flightController.deleteFlight);

userRouter.get("/showFlight", flightController.showFlight);

userRouter.post("/departureFlights", flightController.departureFlights);
userRouter.post("/returnFlights", flightController.returnFlights);

module.exports = userRouter;
