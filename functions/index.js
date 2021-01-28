const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("stripe_secret_key");

// App config
const app = express();

// Middleware
app.use(cors({origin: true})); // resolving security issues (cross-origin)
app.use(express.json());

// API routes
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment requests received for = ", total);

  // Create the payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  // OK - created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
exports.api = functions.https.onRequest(app);
