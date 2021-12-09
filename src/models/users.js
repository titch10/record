const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UserSchema = new Schema ({
    grupo: String,
    correo: String,
    numero: String,
    ide: String,
    fecha: String,
    name1: String,
    name2: String,
    name3: String,
    name4: String,
    name5: String,
    
    locacion: String,
    modo: String,
    spotify:String,
    youtube:String,
    itunes:String,
    deezer:String,
    
    imageURL: String,
    public_id:String,
    path:{type:String}
    
})

const User = mongoose.model('User',UserSchema)


module.exports = User