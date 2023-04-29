import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { items, email } = req.body;
  const transformItems = items.map(item => ({
    price_data:{
      currency:'inr',
      product_data:{
        name:item.title,
      },
      unit_amount:item.price*100,
    },
    quantity:1,
  }))


  const session = await stripe.checkout.sessions.create({
    line_items:transformItems,
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    metadata:[
      email,
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000/checkout`,
  });
  res.status(200).json({ id: session.id });
}
