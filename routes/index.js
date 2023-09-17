
import express from "express";
import { pageHome, pageTestimonials, pageTrips, pageUs, pageDetailTrip } from "../controllers/pagesController.js";
import { saveTestimonial } from "../controllers/testimonialController.js";

const router = express.Router();

router.get("/", pageHome);
router.get("/nosotros", pageUs);
router.get("/viajes", pageTrips);
router.get("/viajes/:slug", pageDetailTrip)
router.get("/testimoniales", pageTestimonials);
router.post("/testimoniales", saveTestimonial);

export default router;