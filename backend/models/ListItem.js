import mongoose from 'mongoose';

const listItemSchema = new mongoose.Schema(
  {
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const ListItem = mongoose.model('ListItem', listItemSchema);

export default ListItem;
