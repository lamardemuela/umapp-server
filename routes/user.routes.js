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

// 🔗 GET "api/user/:userId" => perfil de un usuario
router.get("/owner", isTokenValid, async (req, res, next) => {
    try {
        const response = await User.findById(req.payload._id)
        .select({ name: 1, email: 1, picProfile: 1, province: 1, town: 1, services: 1, rates: 1, morningSchedule: 1, afternoonSchedule:1, role: 1 })
        res.status(200).json(response)
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