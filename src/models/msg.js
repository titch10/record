const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MsgSchema = new Schema ({
    title: String,
    descripcion: String,
    time: String
})

const Msg = mongoose.model('Msg',MsgSchema) 

module.exports = Msg