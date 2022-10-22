const { User, Recipe } = require('../models');

const resolvers = {
    Query: {
        users: async () => {
            const users = User.find()
                .select('-__v -password')
                .populate('recipes');
                console.log(users)
                return users
        },

        recipes: async () => {
            return Recipe.find();
        }
    }
};

module.exports = resolvers;