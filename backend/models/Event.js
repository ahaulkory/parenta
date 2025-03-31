import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['school', 'doctor', 'birthday', 'sport', 'other'],
      default: 'other',
    },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
    },
    source: {
      type: String,
      enum: ['gmail', 'outlook', 'manual', 'calendar'],
      default: 'manual',
    },
    sourceId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;
