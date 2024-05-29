//* ⤵️ IMPORTS
const Message = require("../models/Message.model");
const Chat = require("../models/Chat.model")
const router = require("express").Router();
const { isTokenValid, isDogTrainer } = require("../middlewares/auth.middleware")

//* 👇🏻 MESSAGE ROUTES

// POST "api/message" = crear message
router.post("/message", isTokenValid, async(req, res, next)=> {
    // 1. guardamos semder y receiver en una variable
    const sender = req.payload._id
    const receiver = req.body.receiver // lo recibimos desde el frontend
    try {
        // 2. comprobamos si existe un chat en nuestra db entre esos dos usuarios:
        const foundChat = await Chat.findOne({ $or:[ {user1: sender, user2: receiver}, {user1: receiver, user2: sender} ] })
        // 2.1. si no existe el chat, lo creamos y creamos el mensaje con el id que recibimos
        if(!foundChat){
            const createdChat = await Chat.create({
                user1: sender,
                user2: receiver
            })
            await Message.create({
                sender,
                receiver,
                text: req.body.text,
                chat: createdChat._id
            })
            res.sendStatus(201)
        // 2.2. si existe, creamos sólo el mensaje dentro de ese chat
        }else{
            await Message.create({
                sender,
                receiver,
                text: req.body.text,
                chat: foundChat._id
            })
            res.sendStatus(201)

        }
    } catch (error) {
        next(error)
    }
})

// GET "api/chat" => listar todos los chats
router.get("/chat", isTokenValid, async (req, res, next)=> {
    try {
        const response = await Chat.find()
        res.status(200).json({data: response}) 
    } catch (error) {
        next(error)
    }
})

// GET "api/chat/:chatId" => litar todos los mensajes de un chat
router.get("/chat/:chatId", isTokenValid, async (req, res, next) => {
    try {
    //    await Chat.findById(req.params.chatId)
       
       const chatMessages = await Message.find({chat: req.params.chatId})
       //.populate("user")
       res.status(200).json({data: chatMessages})
    } catch (error) {
        next(error)
    }
})

//🔗 DELETE "/api/message/:messageId" => crear un perro
router.delete("/message/:messageId", isTokenValid, async (req, res, next) => {
    try {
        await Message.findByIdAndDelete(req.params.messageId)
        res.sendStatus(202)
    } catch (error) {
        next(error)
    }
})

//* ⤴️ EXPORTS
module.exports = router;