const { Schema, model } = require('mongoose');
const ingredientSchema = require('./Ingredients');
const dateFormat = require('../utils/dateFormat');

const recipeSchema = new Schema(
    {
        recipeText: {
            type: String,
            required: 'You need to leave a recipe name!',
            minlength: 1,
            maxlength: 280
        },
        description: {
            type: String,
            required: 'You need to leave a description!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        username: {
            type: String,
            required: true
        },
        directions: {
            type: String,
            required: 'You need to have directions in your recipe!'
        },
        // user: {
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     required: true
        // },
        ingredients: [ingredientSchema]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

recipeSchema.virtual('ingredientCount').get(function () {
    return this.ingredients.length;
});

const Recipe = model('Recipe', recipeSchema);

module.exports = Recipe;
