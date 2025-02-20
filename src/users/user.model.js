import { model, Schema } from "mongoose";

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minLength: [1, 'Name cannot be empty'],
            maxLength: [15, 'Name cannot be overcome 15 characteres'],
            match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'Name needs only letters']
        },
        lastname: {
            type: String,
            required: [true, 'Lastname is required'],
            minLength: [1, 'Lastname cannot be empty'],
            maxLength: [15, 'Lastname cannot be overcome 15 characteres'],
            match: [/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/, 'Lastname needs only letters']
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            minLength: [1, 'Username cannot be empty'],
            maxLength: [10, 'Username cannot be overcome 10 characteres']
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email is not valid']
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be strong']
        },
        role: {
            type: String,
            enum: ['CLIENT', 'ADMIN'],
            default: 'CLIENT'
        },
        status: {
            type: Boolean,
            default: true
        }
    }
);


export default model('User', userSchema);