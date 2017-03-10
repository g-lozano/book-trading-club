import mongoose, { Schema } from 'mongoose';

const Trader = new Schema({
    id: String,
    username: String,
    first_name: String,
    last_name: String,
    city: String,
    state: String,
    hash: String,
});

export default mongoose.model('Trader', Trader);
