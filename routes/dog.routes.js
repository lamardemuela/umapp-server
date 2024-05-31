//* ⤵️ IMPORTS
const Dog = require("../models/Dog.model");
const router = require("express").Router();
const { isTokenValid, isDogOwner } = require("../middlewares/auth.middleware")

//* 👇🏻 DOG ROUTES

//🔗 POST "/api/dog" => crear un perro
router.post("/", isTokenValid, isDogOwner, async(req, res, next) => {
    // destructuring
    const { name, image, breed, age, weight, sex, size, dateOfAdquisition, description } = req.body
    //console.log("reqbody", req.body);
    try {
        await Dog.create({
            dogOwner: req.payload._id,
            name,
            image,
            breed,
            age,
            weight,
            sex,
            size,
            dateOfAdquisition,
            description
        })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

//🔗 PUT "/api/dog/:dogId" => editar un perro
router.put("/:dogId", isTokenValid, isDogOwner, async (req, res, next) => {
    const { name, image, breed, age, weight, sex, size, dateOfAdquisition, description } = req.body
    try {
        await Dog.findByIdAndUpdate(req.params.dogId, {
            name,
            image,
            breed,
            age,
            weight,
            sex,
            size,
            dateOfAdquisition,
            description
        })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

//🔗 GET "/api/dog" => listar perro
router.get("/", isTokenValid, async (req, res, next) => {
    try {
        const response = await Dog.find()
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
})

//🔗 GET "/api/dog/:dogId" => detalles de un perro
router.get("/:dogId", isTokenValid, async (req, res, next) => {
    try {
        const response = await Dog.findById(req.params.dogId)
        .populate("dogOwner", "name telephone email picProfile province town services rates morningSchedule afternoonSchedule afternoonSchedule")
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
})

//🔗 DELETE "/api/dog/:dogId" => eliminar un perro
router.delete("/:dogId", isTokenValid, isDogOwner, async (req, res, next) => {
    try {
        await Dog.findByIdAndDelete(req.params.dogId)
        res.sendStatus(202)
    } catch (error) {
        next(error)
    }
})

//* ⤴️ EXPORTS
module.exports = router;