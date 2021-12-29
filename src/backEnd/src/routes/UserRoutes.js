const express = require("express");
const userController = require("../Controller/UserController");
const flightController = require("../Controller/FlightController");
const reservedController = require("../Controller/ReserveController");
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

userRouter.post("/flightsChange", flightController.flightsChange);

userRouter.post("/returnFlights", flightController.returnFlights);

userRouter.get("/reserve/:flight/:cabin", reservedController.getFlightReserved);

userRouter.post("/reserve", reservedController.createReserve);

userRouter.put("/reserveUpdateSeats", reservedController.updateReserveSeats);

userRouter.put(
  "/updateReserveFlights",
  reservedController.updateReserveFlights
);

userRouter.get("/userReserve/:user", reservedController.getUserFlights);

userRouter.put("/updateInfo", userController.updateInfo);

userRouter.put("/updatePassword", userController.updatePassword);

userRouter.post("/getUser", userController.getUser);

userRouter.put("/updateReservations", reservedController.updateReservations);

userRouter.put(
  "/cancelUserReserve/:reserve",
  reservedController.cancelUserFlight
);

userRouter.post(
  "/emailmeUserReserve/:reserve",
  reservedController.emailmeUserFlight
);

userRouter.post("/forgotPassword", userController.forgotPassword);

userRouter.post("/sendEmail", userController.sendEmail);

userRouter.post("/priceOfReservation", reservedController.priceOfReservation);

userRouter.post("/sendEmailRefund", userController.sendEmailRefund);

module.exports = userRouter;
