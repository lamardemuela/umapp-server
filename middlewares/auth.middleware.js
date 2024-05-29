//* ⤵️ IMPORTS
const jwt = require("jsonwebtoken")

function isTokenValid (req, res, next) {
    try {
        //console.log("req", req.headers.authorization);
        // 1. separamos "Bearer" del token
        const token = req.headers.authorization.split(" ")[1]

        // 2. validamos el token
        const payload = jwt.verify(token, process.env.TOKEN_SECRET)
        req.payload = payload

        // 3. token válido => permitimos acceso
        next()
        
    } catch (error) {
        res.status(401).json({errorMessage: "Token no válido o no existe"})
    }
}

function isDogTrainer (req, res, next) {
    if(req.payload.role === "dogTrainer"){
        next()
    }else{
        res.status(400).json({errorMessage: "Sólo tienen acceso los usuarios con el rol de Educador canino"})
    }
}

function isDogOwner (req, res, next) {
    console.log(req.payload);
    if(req.payload.role === "dogOwner"){
        next()
    }else{
        res.status(400).json({errorMessage: "Sólo tienen acceso los usuarios que BUSCAN un educador canino"})
    }
}

//* ⤴️ EXPORTS
module.exports = {
    isTokenValid,
    isDogTrainer,
    isDogOwner
  }