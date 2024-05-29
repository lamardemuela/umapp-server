//* ⤵️ IMPORTS
const router = require("express").Router();

//* 👇🏻 RUTAS INDEX

// 🔗 test route
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// 🔗 authentication route
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

// 🔗 user.role: dogTrainer route
const dogTrainerRouter = require("./dogTrainer.routes")
router.use("/dog-trainer", dogTrainerRouter)

// 🔗 session route
const sessionRouter = require("./session.routes")
router.use("/session", sessionRouter)

// 🔗 dog route
const dogRouter = require("./dog.routes")
router.use("/dog", dogRouter)

// 🔗 Message route
const messageRouter = require("./message.routes")
router.use(messageRouter)

//* ⤴️ EXPORTS
module.exports = router;
