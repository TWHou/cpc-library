const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryCheck = val => {
  const arr = ['College', 'Finacial Literacy', 'Healthy Relationship', 'History', 'Identity', 'Life Skills', 'Sexual Health'];
  return arr.includes(val);
};

const bookSchema = new Schema({
  title: { 
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  onShelf: {
    type: Boolean,
    default: true
  },
  borrowed: {
    type: Date
  },
  dueDate: {
    type: Date
  },
  category: {
    type: String,
    validate: [categoryCheck, '{PATH} is not one of the pre-defined categories']
  },
  renewed: {
    type: Number,
    max: 3,
    default: 0
  },
  name: {
    type: String
  },
  email: {
    type: String
  },
  staff: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;