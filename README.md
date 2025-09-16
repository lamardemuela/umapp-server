# umapp

## [See the app!](https://umapp-server-production.up.railway.app/)
![App Logo](/src/assets/umapp-logo.png)

## Description

🌟 On one hand, umapp is born to connect users with dogs and dog trainers. Sometimes it can be difficult to find a dog trainer in your city, and you don't know where to start.

🌟 On the other hand, umapp aims to solve and digitize the management of dog trainers with their clients, allowing for tracking that serves both parties.

#### [Client Repo here](https://github.com/lamardemuela/umapp-client)

#### [Server Repo here](https://github.com/lamardemuela/umapp-server)

## Backlog Functionalities

Functionalities I wish to add to this proyect later:

- Authentication and authorization process with Google (login and signup)
- Password recovery functionality with NodeMailer
- Most comprehensive autocomplete for municipalities and cities

## Technologies used

**Frontend**

- HTML
- CSS
- Javascript
- React JS
- React Router Dom
- React Context
- Axios

**Backend**

- Javascript
  . Node JS
- Express JS
- MongoDB
- Mongoose
- JWT auth.

**Libraries**

- Cloudinary

# Server Structure

## Models

User model

```javascript
{
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true, trim: true},
  password: {type: String, required: true},
  telephone: {type: Number},
  picProfile: {type: String},
  province: {type: String, required: true},
  services: {type: String, enum: ["Servicio a domicilio", "Adiestramiento y educación", "Educación temprana", "Corrección de conductas", "Orientación del cachorro", "Obediencia", "Socialización", "Entreamiento con correa", "Entrenamiento en casa", "Ansiedad por separación", "Manejo de la agresión", "Entrenamientos de perros de terapia", "Enrenamiento de perros de servicio", "Manejo de miedos y fobias"]},
  rates: {type: Number},
  description: {type: String},
  role: {type: String, enum: ["dogOwner", "dogTrainer"], default: "dogOwner"},
}
```

Dog model

```javascript
 {
    dogOwner: {type: Schema.Types.ObjectId,ref:'User'}
   name: {type: String, required: true},
   image: {type: String},
   breed: {type: String, required: true},
   age: {type: String, required: true},
   weight: {type: String},
   sex: {type: [String], enum: ["macho", "hembra"]},
   size: {type: [String], enum: ["pequeño", "mediano", "grande"], require: true},
    dateOfAdquisition: {type: String},
    description: {type: String, require: true}
 }
```

Session model

```javascript
{
  dogTrainer: {type: Schema.Types.ObjectId,ref:'User'},
  dogOwner: {type: Schema.Types.ObjectId,ref:'User'},
  dog: {type: Schema.Types.ObjectId,ref:'Dog'},
  day: {type: Date, required: true},
  hour: {type: String, required: true},
  location: {type: String, required: true},
  notes: {type: String}
}
```

## API Endpoints (backend routes)

| Method | URL                              | Request Body                       | Description                               |
|--------|----------------------------------|------------------------------------|-------------------------------------------|
| GET    | `/api/dog-trainer`               | n/a                                | List all trainers                         |
| GET    | `/api/dog-trainer/:dogTrainerId`       | {dogTrainerId}                           | Trainer details                           |
| POST   | `/api/session`                   | {Session model properties}         | Create session                            |
| GET    | `/api/session`                   | n/a                                | List sessions                             |
| GET    | `/api/session/:sessionId`        | {sessionId}                        | Session details                           |
| PUT    | `/api/session/:sessionId`        | {Session model properties}         | Edit sessions                             |
| DELETE | `/api/session/:sessionId`        | {sessionId}                        | Delete sessions                           |
| GET    | `/api/dog/:dogId`                | {dogId}                            | Dog details                               |
| POST   | `/api/dog`                       | {Dog model properties}             | Create dogs                               |
| GET    | `/api/dog`                       | n/a                                | List dogs                                 |
| PUT    | `/api/dog`                       | {Dog model properties}             | Edit dogs                                 |
| DELETE | `/api/dog/:dogId`                | {dogId}                            | Delete dogs                               |
| POST   | `/api/auth/signup`               | n/a                                | Signup                                    |
| POST   | `/api/auth/login`                | n/a                                | Login                                     |
| GET    | `/api/auth/verify`               | n/a                                | Validate token                            |
| GET    | `/api/user`                      | n/a                                | Registered users                          |
| GET    | `/api/user/owner`              | n/a                           | User details                              |
| PUT    | `/api/user/owner`              | n/a                           | Edit User details                              |

## Links

### Project

[Repository Link Client](https://github.com/lamardemuela/umapp-client)

[Repository Link Server](https://github.com/lamardemuela/umapp-server)

[Deploy Link](https://umapp-server.onrender.com)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1aRkcTZZbVtu6G3FkuwRlqRTQPNShvMVVzX8R-3zRIsw/edit?usp=sharing)
