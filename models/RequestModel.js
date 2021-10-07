import { Schema } from "mongoose";

const requestModel = new Schema({
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

const Requests = mongoose.model('gali', requestModel);

export default Requests;