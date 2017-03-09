import mongoose, { Schema } from 'mongoose';

const Book = new Schema({
    id: String,
    name: String,
    img: String,
});

export default mongoose.model('Book', Book);
