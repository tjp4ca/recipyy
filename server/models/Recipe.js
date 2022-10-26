const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema(
    {
        name: {
            type: String,
            required: 'Must provide recipe name',
            minlength: 1
        },

        description: {
            type: String,
            required: 'Must provide recipe description',
            minlength: 1
        },

        instructions: {
            type: String,
            required: 'Must provide recipe instructions',
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
        },

        comments: [commentSchema]
    },

    {
        toJSON: {
            getters: true
        }
    }
);

recipeSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;