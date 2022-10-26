// const express = require('express');
// const {ApolloServer} = require('apollo-server-express');
// const path = require('path');
// const stripe = require("stripe")('sk_test_51LwUjsKzkAHe1megvrsztdqumBgXXSA2GaSJxJxnFPjkqOtXLIkMt0z8RfAi7FMPckFtIMrOSu1ZpWVZngkt2Smj00k5LCx2p6');
// const bodyParser = require("body-parser");
// const cors = require("cors");

// const {typeDefs, resolvers} = require('./schemas');
// const {authMiddleware} = require('./utils/auth');
// const db = require('./config/connection');

// const PORT = process.env.PORT || 3001;
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware,
// });

// const app = express();

// // app.use(express.urlencoded({ extended: false }));
// // app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// // Serve up static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.post("/stripe/charge", cors(), async (req, res) => {
//   console.log("stripe-routes.js 9 | route reached", req.body);
//   let { amount, id } = req.body;
//   console.log("stripe-routes.js 10 | amount and id", amount, id);
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "USD",
//       description: "Your Company Description",
//       payment_method: id,
//       confirm: true,
//     });
//     console.log("stripe-routes.js 19 | payment", payment);
//     res.json({
//       message: "Payment Successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("stripe-routes.js 17 | error", error);
//     res.json({
//       message: "Payment Failed",
//       success: false,
//     });
//   }
// });

// // Create a new instance of an Apollo server with the GraphQL schema
// const startApolloServer = async (typeDefs, resolvers) => {
//   await server.start();
//   server.applyMiddleware({ app });

//   db.once('open', () => {
//     app.listen(PORT, () => {
//       console.log(`API server running on port 📺 ${PORT}!`);
//       console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath} 🌍`);
//     })
//   })
//   };
  
//   // Call the async function to start the server
//   startApolloServer(typeDefs, resolvers);











// not working stripe css

const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const path = require('path');
const stripe = require("stripe")('sk_test_51LwUjsKzkAHe1megvrsztdqumBgXXSA2GaSJxJxnFPjkqOtXLIkMt0z8RfAi7FMPckFtIMrOSu1ZpWVZngkt2Smj00k5LCx2p6');
const bodyParser = require("body-parser");
const cors = require("cors");

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

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});


// app.use(express.static("public"));
// app.use(express.json());
const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 2000;
};
app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});



// app.post("/stripe/charge", cors(), async (req, res) => {
//   console.log("stripe-routes.js 9 | route reached", req.body);
//   let { amount, id } = req.body;
//   console.log("stripe-routes.js 10 | amount and id", amount, id);
//   try {
//     const payment = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "USD",
//       description: "Your Company Description",
//       payment_method: id,
//       confirm: true,
//     });
//     console.log("stripe-routes.js 19 | payment", payment);
//     res.json({
//       message: "Payment Successful",
//       success: true,
//     });
//   } catch (error) {
//     console.log("stripe-routes.js 17 | error", error);
//     res.json({
//       message: "Payment Failed",
//       success: false,
//     });
//   }
// });

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
