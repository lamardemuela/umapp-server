//* ⤵️ IMPORTS
const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: [true, 'El campo Emisor es obligatorio.']
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: [true, 'El campo Receptor es obligatorio.']
    },
    text: {
        type: String,
        equire: [true, 'El campo Mensaje es obligatorio.']
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: "Chat"
    } 
})


//* ⤴️ EXPORTS
const Message = model("Message", messageSchema);
module.exports = Message;