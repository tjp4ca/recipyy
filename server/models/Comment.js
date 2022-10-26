const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
  {
    body: {
      type: String,
      required: 'Must provide comment body',
      minlength: 1
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },

    createdBy: {
      type: String,
      required: true
    }
  },

  {
    toJSON: {
      getters: true
    }
  }
);

module.exports = commentSchema;