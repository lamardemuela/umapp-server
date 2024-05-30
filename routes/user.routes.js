//* ⤵️ IMPORTS
const { isTokenValid } = require("../middlewares/auth.middleware");
const User = require("../models/User.model");
const router = require("express").Router();

//* 👇🏻 USER ROUTES

// 🔗 GET "api/user"= => listar todos los usuarios
router.get("/", async (req, res, next) => {
    try {
        const response = await User.find()
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
})

// 🔗 GET "api/user/:userId" => detalles de un usuario
router.get("/:userId", isTokenValid, async (req, res, next) => {
    try {
        const response = await User.findById(req.params.userId)
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
})


//* ⤴️ EXPORTS
module.exports = router;