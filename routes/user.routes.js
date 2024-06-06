//* ⤵️ IMPORTS
const { isTokenValid } = require("../middlewares/auth.middleware");
const User = require("../models/User.model");
const router = require("express").Router();

//* 👇🏻 USER ROUTES

// 🔗 GET "api/user"= => listar todos los usuarios
router.get("/", async (req, res, next) => {
    try {
        const response = await User.find(req.query)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// 🔗 GET "api/user/owner" => detalles de un usuario
router.get("/owner", isTokenValid, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id)
        .select({ name: 1, email: 1, picProfile: 1, province: 1, services: 1, rates: 1, role: 1, telephone:1 })
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// 🔗 PUT "api/user/owner" => editar info de un usuario
router.put("/owner", isTokenValid, async (req, res, next) => {
    // destructuring
    const {name, email, picProfile, province, services, rates, telephone } = req.body
    try {
        const response = await User.findByIdAndUpdate(req.payload._id, {
            name,
            email,
            picProfile,
            province,
            services,
            rates,
            telephone
        })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
})

// 🔗 GET "api/user/:userId" => detalles de un usuario
router.get("/:userId", isTokenValid, async (req, res, next) => {
    try {
        const response = await User.findById(req.params.userId)
        .select({ name: 1, email: 1, picProfile: 1, province: 1, town: 1, services: 1, rates: 1, morningSchedule: 1, afternoonSchedule:1, role: 1 })
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


//* ⤴️ EXPORTS
module.exports = router;