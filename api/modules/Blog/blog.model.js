const { default: mongoose } = require('mongoose');
const { userModel } = require('../Users/user.model');

const Schema = require('mongoose').Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
    default: '',
  },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  ],
  body: { type: String, default: '' },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  createdAt: { type: Date, default: Date.now },
});

const articleModel = mongoose.model('Article', BlogSchema);
module.exports = { articleModel };
