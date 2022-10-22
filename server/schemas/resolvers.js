const { User, Recipe } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                  .select('-__v -password')
                  .populate('recipes');
            
                return userData;
            }
            
            throw new AuthenticationError('Not logged in');
        },

        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('recipes');
        },

        recipes: async () => {
            return Recipe.find();
        }
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },

        addRecipe: async (parent, args, context) => {
            if (context.user) {
                const recipe = Recipe.create({ recipeText: args.recipeText,
                                               description: args.description,
                                               createdAt: 'just now',
                                               username: context.user.username,
                                               directions: args.directions,
                                               ingredients: args.ingredients });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { recipes: recipe._id } },
                    { new: true }
                );

                return recipe;
            }

            throw new AuthenticationError('Not logged in');
        }
    }
};

module.exports = resolvers;