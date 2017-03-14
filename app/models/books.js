import mongoose, { Schema } from 'mongoose';

const Book = new Schema({
    id: String,
    title: String,
    img: String,
    owner: String,
});

export default mongoose.model('Book', Book);
