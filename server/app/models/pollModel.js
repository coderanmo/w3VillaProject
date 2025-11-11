let mongoose = require('mongoose');

let pollSchema = new mongoose.Schema(
    {
        pollQuestion: {
            type: String,
            required: [true, 'Please fill question'],
            trim: true
        },
        pollAnswers: {
            type: [String],
            required: [true, 'Please provide at least one answer']

        },
        pollStatus: {
            type: Boolean,
            default: true
        },
        closingDateTime: {
            type: Date,
            required: [true, 'Please provide a closing date and time']
        },
        pollOrder: {
            type: Number,
            required: [true, 'Order is required'],
            unique: true
        }
    }
    
)

let pollModel = mongoose.model('poll', pollSchema);
module.exports = { pollModel };
