const { User, Recipe } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('recipes');
        },

        recipes: async () => {
            return Recipe.find();
        }
    }
};

module.exports = resolvers;