//* ⤵️ IMPORTS
const User = require("../models/User.model");
const router = require("express").Router();
//todo const { isTokenValid } = require("../middlewares/auth.middleware")

//* 👇🏻 DOG TRAINER ROUTES

//🔗 GET "/api/dog-trainer" => listar todos los dogTrainers
router.get("/", async (req, res, next) => {
    try {
        const response = await User.find({role: "dogTrainer"})
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }

})

//🔗 GET "/api/dog-trainer/:dogTrainerId" => detalles de un dogTrainer
router.get("/:dogTrainerId", async (req, res, next) => {
    try {
        const response = await User.findById(req.params.dogTrainerId)
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
})

//* ⤴️ EXPORTS
module.exports = router;