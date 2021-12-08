const mongoose = require('mongoose')
const Schema = mongoose.Schema


const TaskSchema = new Schema ({
    tarea: String,
    status:{
        type: Boolean,
        default: false
    },
    time: String
})

const Task = mongoose.model('Task',TaskSchema) 

module.exports = Task