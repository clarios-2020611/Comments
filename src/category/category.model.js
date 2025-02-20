const { Schema, model } = require("mongoose");

const categorySchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
);

export default model('Category', categorySchema);