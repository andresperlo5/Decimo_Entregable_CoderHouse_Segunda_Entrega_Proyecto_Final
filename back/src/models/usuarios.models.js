const { Schema } = require('mongoose')

const UserSchema = new Schema({
    carritoID: {
        type: Schema.Types.ObjectId,
        ref: 'cart'
    },
    usuario: {
        type: String,
        trim: true
    },
    contrasenia: {
        type: String,
        trim: true
    },
    admin: {
        type: Boolean,
        default: false
    },

    token: [String]
})

module.exports = UserSchema
