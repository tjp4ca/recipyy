// require('dotenv').config()
// const stripe = require('stripe')('sk_test_51LwUjsKzkAHe1megvrsztdqumBgXXSA2GaSJxJxnFPjkqOtXLIkMt0z8RfAi7FMPckFtIMrOSu1ZpWVZngkt2Smj00k5LCx2p6');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');

const {typeDefs, resolvers} = require('./schemas');
const {authMiddleware} = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.session.create({
    line_items: [
      {
        // Provide the exact price ID (for example, pr_1234) of the amount you want to donate.
        price: '{{PRICE_ID}}',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${server}?success=true`,
    cancel_url: `${server}?canceled=true`,
  });
  res.redirect(303, session.url);
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port 📺 ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath} 🌍`);
    })
  })
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);
