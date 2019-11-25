const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    username: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, default: 0 },
    reps: { type: Number, default: '' },
    tempo: { type: String, default: '' },
    weight: { type: Number, default: '' }
  },
  {
    timestamps: true
  }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
