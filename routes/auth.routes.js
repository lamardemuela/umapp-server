//* ⤵️ IMPORTS
const User = require("../models/User.model");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isTokenValid } = require("../middlewares/auth.middleware")

//* 👇🏻 AUTHENTICATION ROUTES

//🔗 POST "/api/auth/signup" => recibir data del usuario y crearlo en la db
router.post("/signup", async (req, res, next) => {

  // destructuring req.body:
  const { name, telephone, email, password, picProfile, province, town, services, rates, availability, morningSchedule, afternoonSchedule, morningAndAfternoonSchedule, role } = req.body;

  // 1. campos obligatorios
  if (!name || !email || !password || !province || !town) {
    res
      .status(400)
      .json({
        errorMessage:
          "Los campos: nombre, email, contraseña, provincia y ciudad son obligatorios",
      });
    return;
  }

  // 2. contraseña segura
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({
        errorMessage:
          "La contraseña tiene que tener más de 8 caracteres, al menos una letra mayúscula y una minúscula",
      });
    return;
  }

  // 3. email único
  try {
    // verificamos si existe en la db
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res
        .status(400)
        .json({
          errorMessage: "Ya existe un usuario registrado con este email",
        });
      return;
    }

    //4. encriptamos la contraseña
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    // 5. creamos el usuario en la db
    await User.create({
      name: name,
      telephone: telephone,
      email: email,
      password: hashPassword,
      picProfile: picProfile,
      province: province,
      town: town,
      services: services,
      rates: rates,
      availability: availability,
      morningSchedule: morningSchedule,
      afternoonSchedule: afternoonSchedule,
      morningAndAfternoonSchedule: morningAndAfternoonSchedule,
      role: role
    });
    res.sendStatus(201)
  } catch (error) {
    next(error);
  }
});

//🔗 POST "/api/auth/login" => recibir credenciales del usuario y validarlas (creación y envío de token)
router.post("/login", async (req, res, next) => {
    console.log(req.body);

    // destructuring req.body:
    const { email, password, role } = req.body;

    // 1. credenciales enviadas
    if(!email || !password) {
        res.status(400).json({errorMessage:"Los campos Email y Contraseña son obligatorios"})
        return
    }

    // 2. base de datos
    try {
        // 2.1. el usuario existe?
        const foundUser = await User.findOne ({email:email})
        console.log(foundUser);
        if(!foundUser){
            res.status(400).json({errorMessage:"Usuario no registrado"})
            return
        }

        // 2.2. la contraseña es correcta?
        const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
        if(isPasswordCorrect === false){
            res.status(400).json({errorMessage:"Contraseña incorrecta"})
            return
        }

        // 3. usuario validado 
        // 3.1. token => creamos payload (info del usuario)
        const payload = {
            _id: foundUser._id,
            email: foundUser.email,
            role: foundUser.role
        }

        // 3.2. Firma Token
        const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {algorithm: "HS256", expiresIn: "365d" })

        // 3.3 enviamos el Token al cliente
        res.status(200).json({authToken: authToken})
    } catch (error) {
        next(error)
    }

})

//🔗 GET "/api/auth/verify" => recibir token y validarlo
router.get("/verify", isTokenValid,  (req, res, next) => {
    console.log("payload", req.payload);
    res.status(200).json({payload: req.payload})
})

//* ⤴️ EXPORTS
module.exports = router;
