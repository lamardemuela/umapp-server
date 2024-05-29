//* ⤵️ IMPORTS
const { Schema, model } = require("mongoose");

const sessionSchema = new Schema ({
    dogTrainer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dogOwner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    dog: {
        type: Schema.Types.ObjectId,
        ref: "Dog"
    },
    day: {
        type: Date,
        require: [true, 'El campo Día es obligatorio.']
    },
    hour: {
        type: String,
        require: [true, 'El campo Hour es obligatorio.']
    },
    location: {
        type: String,
        required: [true, 'El campo Ubicación es obligatorio.']
    },
    notes: {
        type: String
    }
})

//* ⤴️ EXPORTS
const Session = model("Session", sessionSchema);
module.exports = Session;