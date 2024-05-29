//* ⤵️ IMPORTS
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El campo Nombre es obligatorio.']
    },
    telephone: {
      type: Number
    },
    email: {
      type: String,
      required: [true, 'El campo Email es obligatorio.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'El campo Contraseña es obligatorio.']
    },
    picProfile: {
      type: String,
      default: "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
    },
    province: {
      type: String,
      required: [true, 'El campo Provincia es obligatorio.']
    },
    town: {
      type: String,
      required: [true, 'El campo Población es obligatorio.']
    },
    services: {
      type: [String],
      enum: ["Servicio a domicilio", "Adiestramiento y educación", "Educación temprana", "Corrección de conductas", "Orientación del cachorro", "Obediencia", "Socialización", "Entreamiento con correa", "Entrenamiento en casa", "Ansiedad por separación", "Manejo de la agresión", "Entrenamientos de perros de terapia", "Enrenamiento de perros de servicio", "Manejo de miedos y fobias"]
    },
    rates: {
      type: Number
    },
    morningSchedule: {
      type: String
    },
    afternoonSchedule: {
      type: String,
    },
    role: {
      type: String,
      enum: ["dogOwner", "dogTrainer"],
      default: "dogOwner"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

//* ⤴️ EXPORTS
const User = model("User", userSchema);
module.exports = User;
