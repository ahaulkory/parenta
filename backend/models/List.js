import mongoose from 'mongoose';

const listSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['grocery', 'todo'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model('List', listSchema);

export default List;
