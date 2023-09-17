
import { Testimonials } from "../models/Testimonials.js";

const saveTestimonial = async (req, res) => {
    
    // Validar
    const { name, email, message } = req.body;

    const mistakes = [];

    if(name.trim() === "") {
        mistakes.push({message: "El nombre esta vacio"});
    }
    if(email.trim() === "") {
        mistakes.push({message: "El Correo esta vacio"});
    }
    if(message.trim() === "") {
        mistakes.push({message: "El mensaje esta vacio"});
    }

    if(mistakes.length > 0) {
        // Consultar testimoniales existentes
        const testimonials = await Testimonials.findAll();
        // Mostrar la vista con los errores
        res.render('testimonials', {
            page: "Testimoniales",
            mistakes,
            name,
            email,
            message,
            testimonials
        })
    } else {
        // Almacenarlo en la base de datos
        try {
            await Testimonials.create({
                name, 
                email,
                message
            });

            res.redirect("/testimoniales")
        } catch (error) {
            console.error(error);
        }
    }
}

export {
    saveTestimonial
}