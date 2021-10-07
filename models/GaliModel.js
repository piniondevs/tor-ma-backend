import { Schema } from "mongoose";

const galiModel = new Schema({
    id: {
        type: String,
        required: true
    },
    gali: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Galis = mongoose.model('gali', galiModel);

export default Galis;