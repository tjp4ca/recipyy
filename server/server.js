// require('dotenv').config()

// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// const stripe = require('stripe')('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

// const session = await stripe.checkout.sessions.create({
//   success_url: 'https://example.com/success',
//   cancel_url: 'https://example.com/cancel',
//   line_items: [
//     {price: 'price_H5ggYwtDq4fbrJ', quantity: 2},
//   ],
//   mode: 'payment',
// });




// stripe.customers.create({
//   email: 'customer@example.com',
// })
//   .then(customer => console.log(customer.id))
//   .catch(error => console.error(error));


// const express = require('express');
// const app = express();
// app.use(express.static('public'));


// const YOUR_DOMAIN = 'http://localhost:4242';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}?success=true`,
//     cancel_url: `${YOUR_DOMAIN}?canceled=true`,
//   });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));







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

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.post("/stripe/charge", cors(), async (req, res) => {
  console.log("stripe-routes.js 9 | route reached", req.body);
  let { amount, id } = req.body;
  console.log("stripe-routes.js 10 | amount and id", amount, id);
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      description: "Your Company Description",
      payment_method: id,
      confirm: true,
    });
    console.log("stripe-routes.js 19 | payment", payment);
    res.json({
      message: "Payment Successful",
      success: true,
    });
  } catch (error) {
    console.log("stripe-routes.js 17 | error", error);
    res.json({
      message: "Payment Failed",
      success: false,
    });
  }
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





// const express = require("express");
// const app = express();
// const stripe = require("stripe")(sk_test_4eC39HqLyjWDarjtT1zdp7dc);
// const bodyParser = require("body-parser");
// const cors = require("cors");

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cors());

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

// app.listen(process.env.PORT || 8080, () => {
//   console.log("Server started...");
// });