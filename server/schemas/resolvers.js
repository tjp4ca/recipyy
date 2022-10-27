const { User, Recipe } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

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

    updateRecipe: async (parent, args, context) => {
      console.log(context);
      console.log('Seperate these log');
      console.log(context.user);
      // if (context.user) {
        
        return await Recipe.findByIdAndUpdate( {_id: args.recipeId },
        {
          name: args.name,
          description: args.description,
          instructions: args.instructions,
        }, 
        {
          new: true
        });
      // }

      throw new AuthenticationError("Not logged in");
    },

    deleteRecipe: async (parent, {recipeId}, context) => {
      if(context.user) {
        const removeRecipe = await Recipe.findByIdAndRemove( {_id: args.recipeId });
        return removeRecipe;
      }
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
    }
  }
};

module.exports = resolvers;