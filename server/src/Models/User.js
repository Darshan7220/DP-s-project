import { Schema, model } from 'mongoose'

const userSchema = Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        require: [true, "Password is required"],
        minlength: [6, "Password must be at list 6 character"]
    },
    role: {
        type: String,
        require: true,
        enum: ['super_admin', 'admin', 'sub_admin', 'user'],
        default: 'user'
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    avatar: {
        type: String,
        default: null,
    },
    birthdate: {
        type: String,
        default: null,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        require: true
    },
    adharNumber: {
        type: String,
        unique: false,
        required: function () { return this.role === 'sub_admin' || this.role === 'user'; },
        sparse: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isdelete: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true
    })

const User = model('User', userSchema)
export default User