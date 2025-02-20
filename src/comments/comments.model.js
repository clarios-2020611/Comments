import { model, Schema } from "mongoose";

const commentsSchema = Schema(
    {
        title: {
            type: String,
            maxLength: [100, 'Description is too long']
        },
        body: {
            type: String,
            required: [true, 'Body comment is required'],
            maxLength: [1000, 'Description is too long'],
        },
        likes: {
            type: Number,
            min: [0, 'Likes cannot be negative number']
        },
        pictures: {
            type: [String]
        },
        comment: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            bodyComment: String,
            img: String //Path para poner imagenes en los comentarios
        }],
        category: {
            type: Schema.Types.ObjectId,
            required: [true, 'Category is required']
        },
        status: {
            type: Boolean,
            default: true
        }
    }
);

export default model('Comments', commentsSchema);