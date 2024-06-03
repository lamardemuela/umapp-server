//* ⤵️ IMPORTS
const router = require("express").Router();
const uploader =require("../middlewares/cloudinary.middleware")

//* 👇🏻 CLOUDINARY ROUTES

//🔗 POST "/api/upload" 
router.post("/", uploader.single("image"), (req, res, next) => {
    console.log("file:", req.file);

    if(!req.file) {
        res.status(400).json({ errorMessage: "Ha habido un problema al cargar la imágen. Inténtalo de nuevo" })
        return
    }

    res.json({imageUrl: req.file.path})
})


//* ⤴️ EXPORTS
module.exports = router;