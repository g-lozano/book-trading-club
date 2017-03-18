import mongoose, { Schema } from 'mongoose';

const Book = new Schema({
    id: String,
    title: String,
    img: String,
    owner: String,
    swap_status: String,
    swapper: String
});

export default mongoose.model('Book', Book);
