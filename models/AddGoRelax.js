const mongoose = require('mongoose')

const pendataantamuhotelSchema = mongoose.Schema({
    Nama: {
        type: String,
        required: true
    },
    Alamat: {
        type: String,
        required: true
    },
    Number: {
        type: Number,
        required: true
    },
    Info: {
        type: Number,
        required: true
    },
    CheckIn: {
        type: Number,
        required:true
    },
    CheckOut: {
        type: Number,
        required:true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    versionKey: false

})
module.exports = mongoose.model('AddGoRelax', pendataantamuhotelSchema, 'addGoRelax')