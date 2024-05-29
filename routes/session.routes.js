//* ⤵️ IMPORTS
const Session = require("../models/Session.model");
const router = require("express").Router();
const { isTokenValid, isDogTrainer } = require("../middlewares/auth.middleware")

//* 👇🏻 SESSION ROUTES

 //🔗 POST "/api/session" => crear una session
 router.post("/", isTokenValid, isDogTrainer, async (req, res, next) => {
    //destructuring
    const { dogTrainer, dogOwner, dog, day, hour, location, notes } = req.body

    try {
        await Session.create({
            dogTrainer: req.payload._id,
            dogOwner,
            dog,
            day,
            hour,
            location,
            notes
        })
        res.sendStatus(201)
    } catch (error) {
        next(error)
    }
 })

 //🔗 PUT "/api/session/:sessionId" => editar una session
 router.put("/:sessionId", isTokenValid, isDogTrainer, async (req, res, next) => {
    //destructuring
    const { dogTrainer, dogOwner, dog, day, hour, location, notes } = req.body

    try {
        await Session.findByIdAndUpdate(req.params.sessionId, {
            dogOwner,
            dog,
            day,
            hour,
            location,
            notes
        })
        res.sendStatus(201) 
    } catch (error) {
        next(error)
    }
 })

 //🔗 GET "/api/session" => listar sessions
 router.get("/", isTokenValid, async (req, res, next) => {
    try {
        const response = await Session.find()
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
 })

 // 🔗 GET "/api/session/:sessionId" => detalles de una Session
 router.get("/:sessionId", isTokenValid, async(req, res, next) => {
    try {
        const response = await Session.findById(req.params.sessionId)
        .populate("dog")
        res.status(200).json({data: response})
    } catch (error) {
        next(error)
    }
 })

  // 🔗 DELETE "/api/session/:sessionId" => eliminar una Session
  router.delete("/:sessionId", isTokenValid, isDogTrainer, async (req, res, next) => {
    try {
        await Session.findByIdAndDelete(req.params.sessionId)
        res.sendStatus(202)
    } catch (error) {
        next(error)
    }
  })

//* ⤴️ EXPORTS
module.exports = router;