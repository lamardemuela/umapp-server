//* ⤵️ IMPORTS
const { Schema, model } = require("mongoose");

const chatSchema = new Schema({
    user1: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    user2: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

//* ⤴️ EXPORTS
const Chat = model("Chat", chatSchema);
module.exports = Chat;