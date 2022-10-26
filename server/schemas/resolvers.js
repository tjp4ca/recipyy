const { User, Recipe }        = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken }           = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
                                   .select('-__v -password')
                                   .populate('recipes')
                                   .populate('friends');

        return userData;
      }
      
      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
                 .select('-__v -password')
                 .populate('recipes')
                 .populate('friends');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username })
                 .select('-__v -password')
                 .populate('recipes')
                 .populate('friends');
    },

    recipes: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Recipe.find(params).sort({ createdAt: -1 });
    },

    recipe: async (parent, { _id }) => {
      return Recipe.findOne({ _id });
    }
  },

  Mutation: {
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

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addRecipe: async (parent, args, context) => {
      if (context.user) {
        const recipe = await Recipe.create({ ...args, createdAt: Date.now(), createdBy: context.user.username });
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { recipes: recipe._id } },
          { new: true }
        );
    
        return recipe;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    addComment: async (parent, { recipeId, body }, context) => {
      if (context.user) {
        const updatedRecipe = await Recipe.findOneAndUpdate(
          { _id: recipeId },
          { $push: { comments: { body, createdAt: Date.now(), createdBy: context.user.username } } },
          { new: true, runValidators: true }
        );
    
        return updatedRecipe;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');
    
        return updatedUser;
      }
    
      throw new AuthenticationError('Not logged in');
    },

    updateRecipe: async (parent, { id, description, instructions }) => {
      // Find and update the matching class using the destructured args
      return await Recipe.findOneAndUpdate(
        { _id: id }, 
        { description },
        { instructions },
        // Return the newly updated object instead of the original
        { new: true }
      );
    },

    removeRecipe: async (parent, { recipeId }) => {
      return Recipe.findOneAndDelete({ _id: recipeId })
    }
  }
};

module.exports = resolvers;