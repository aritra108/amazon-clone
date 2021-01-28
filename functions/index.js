const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// eslint-disable-next-line max-len
const stripe = require("stripe")("sk_test_51ICjEmBY2sNTfiHlcs4CVNSZtMnMYmShZu5j3M8CLJAzVuvyLYAzLRKGVDOSInCXs9yY7mTBn05ImycFr4fVKqcY00gOKiv1AL");

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
