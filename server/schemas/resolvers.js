const stripe = require('stripe')('sk_test_51LwUjsKzkAHe1megvrsztdqumBgXXSA2GaSJxJxnFPjkqOtXLIkMt0z8RfAi7FMPckFtIMrOSu1ZpWVZngkt2Smj00k5LCx2p6');
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

        recipes: async () => {
            return Recipe.find();
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
                images: [`${url}/images/${products[i].image}`]
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