import mongoose from '../db/mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: Date,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client"
    }
});

export default mongoose.model("Task", taskSchema);