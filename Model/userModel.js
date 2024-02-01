const mongoose = require('mongoose')
const uSchema = mongoose.Schema

const userSchema = new uSchema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        street: {
            type: String,
            required: true
        },
        suite: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        zipcode: {
            type: Number,
            required: true
        },
        geo: {
            lat: {
                type: Number,
                required: true
            },
            lng: {
                type: Number,
                required: true
            },
        },

    },
    phone: {
        type: Number,
        required: true
    },
    website: {
        type: String,
        
    },
    company: {
        name: {
            type: String,
           
        },
        catchPhrase: {
            type: String,
            
        },
        bs: {
            type: String,
            
        },
    },
},
    {
        timestamps: true
    }
)

const userModel = mongoose.model('userData', userSchema)
module.exports = userModel