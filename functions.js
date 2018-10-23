const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.createCharge = (event, context, callback) => {
  const { token, amount, currency } = JSON.parse(event.body);

  return stripe.charges
    .create({
      // Create Stripe charge with token
      amount,
      currency,
      description: "Bridge School Donation",
      source: token.id
    })
    .then(charge => {
      // Success response
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          message: `Charge processed succesfully!`,
          charge
        })
      };
    })
    .catch(err => {
      // Error response
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
          error: err.message
        })
      };
    });
};
