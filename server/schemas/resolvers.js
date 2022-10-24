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
            const users = User.find()
                .select('-__v -password')
                // remove later after token
                // .select('+password')
                .populate('recipes');
 

                console.log(users)
                return users
        },

        // recipes: async () => {
        //     return Recipe.find();
        // }

        recipes: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Recipe.find(params);
          },
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
                                               directions: args.directions });

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