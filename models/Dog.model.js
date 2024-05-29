//* ⤵️ IMPORTS
const { Schema, model } = require("mongoose");

const dogSchema = new Schema({
    dogOwner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        require: [true, 'El campo Nombre es obligatorio.']
    },
    image: {
        type: String,
        default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
    },
    breed: {
        type: String,
        require: [true, 'El campo Raza es obligatorio.']
    },
    age: {
        type: Number,
        require: [true, 'El campo Edad es obligatorio.']
    },
    weight: {
        type: String
    },
    sex: {
        type: [String],
        enum: ["macho", "hembra"]
    },
    size: {
        type: [String],
        enum: ["pequeño", "mediano", "grande"],
        require: [true, 'El campo Tamaño es obligatorio.']
    },
    dateOfAdquisition: {
        type: String
    },
    description: {
        type: String,
        require: [true, 'El campo Descripción es obligatorio.']
    }
})

//* ⤴️ EXPORTS
const Dog = model("Dog", dogSchema);
module.exports = Dog;