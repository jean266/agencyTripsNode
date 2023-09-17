
import { Trip } from "../models/Trip.js";
import { Testimonials } from "../models/Testimonials.js";

const pageHome = async (req, res) => { 

    const promiseDB = [];
    promiseDB.push( Trip.findAll({ limit: 3 }) );
    promiseDB.push( Testimonials.findAll({ limit: 3 }) );

    try {
        const result = await Promise.all(promiseDB);
        
        res.render("home", {
            page : "Inicio",
            clase: "home",
            trips : result[0],
            testimonials : result[1]
        });
    } catch (error) {
        console.error(error);
    }
}

const pageUs = (req, res) => {
    res.render("us", {
        page: "Nosotros"
    });
}

const pageTrips = async (req, res) => {
    // Consultar la DB
    const trips = await Trip.findAll();

    res.render("trips", {
        page: "Proximos Viajes",
        trips
    });
}

const pageTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonials.findAll();
        res.render("testimonials", {
            page: "Testimoniales",
            testimonials
        });
    } catch (error) {
        console.error(error);
    }
}

// Muestra un viajes por su slug
const pageDetailTrip = async (req, res) => {
    const { slug } = req.params;

    try {
        const trip = await Trip.findOne({ where : { slug }});
        res.render("trip", {
            page: "Información Viaje",
            trip
        })
    } catch (error) {
        console.error(error);
    }
}

export {
    pageHome,
    pageUs,
    pageTrips,
    pageTestimonials,
    pageDetailTrip
}