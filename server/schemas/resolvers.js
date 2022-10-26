const { User, Recipe, Product } = require('../models');
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
        user: async () => {
            return User.findOne()
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
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { products } = await order.populate('products');

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,

                });

                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        },

        donate: async (parent, args, context) => {
            console.log(`args: `,args);
            const url = new URL(context.headers.referer).origin;
      
            const product = await stripe.products.create({
              name: 'donation',
              description: 'donation value'
            });
            const price = await stripe.prices.create({
              product: product.id,
              unit_amount: args.donation*100,
              currency: 'usd'
            });
            const line_items = [{
              price: price.id,
              quantity: 1
            }];
      
            const session = await stripe.checkout.sessions.create({
              payment_method_types: ['card'],
              line_items,
              mode: 'payment',
              success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
              cancel_url: `${url}/`
            });
      
            console.log(`session: `,session);
            return {session: session.id};
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
        // updateUser: async (parent, args, context) => {
        //     if (context.user) {
        //       return await User.findByIdAndUpdate(context.user._id, args, { new: true });
        //     }
      
        //     throw new AuthenticationError('Not logged in');
        //   },
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
        }
    }
};

module.exports = resolvers;