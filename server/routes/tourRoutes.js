const express = require("express");
const router = express.Router();
const tourController = require("../controllers//tourController");
const authController = require("../controllers/authController");

router
     .route("/")
     .post( authController.protect, tourController.createTour)
     .get( authController.protect, tourController.getAllTours);

router
     .route("/:id")     
     .get(tourController.getTourById )
     .delete(authController.protect,authController.restrictTo("admin", "moderator"),tourController.deleteTour )
     .patch(authController.protect,authController.restrictTo("admin", "moderator"),tourController.updateTour );

module.exports = router;