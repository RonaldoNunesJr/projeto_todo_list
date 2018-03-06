const restful = require('node-restful')
const mongoose = restful.mongoose

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    done: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now },
    endAt: { type: Date, default: Date.now },
    pauseStatus: {type: Boolean, required: true, default: false},
    pauseTime: { type: Array, required: false } 
})

module.exports= restful.model('TodoJobs', todoSchema);