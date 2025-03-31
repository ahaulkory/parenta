import mongoose from 'mongoose';

const childSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
    },
    preferences: {
      clothing: {
        coldWeather: [String],
        warmWeather: [String],
        rainWeather: [String],
      },
    },
  },
  {
    timestamps: true,
  }
);

const Child = mongoose.model('Child', childSchema);

export default Child;
