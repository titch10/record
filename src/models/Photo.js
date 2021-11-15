const {Schema, model}=require('mongoose');

const Photo = new Schema({
    title: String,
    descripcion:String,
    imageURL: String,
    public_id:String,
    created_at: {type: Date, default: Date.now()}
})

module.exports = model('Photo',Photo)