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
        type: String,
        required: true
    },
    Info: {
        type: String,
        required: true
    },
    CheckIn: {
        type: String,
        required:true
    },
    CheckOut: {
        type: String,
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