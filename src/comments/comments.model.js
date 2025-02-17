import { Schema } from "mongoose";

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
        }
    }
);