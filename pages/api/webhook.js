import { buffer } from "micro";
import * as admin from "firebase-admin";
import serviceAccount from "../../permission.json";
import Stripe from "stripe";

//Secure a connection to firebase from backend
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

//Establish connection to Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNIN_SECRET;

//Pushing user information and products in DB
const fulfillOrder = async (session) => {
  console.log("FulFilling Order: ", session);
  return app.firestore().collection('users').doc(session.metadata.email).collection('orders').doc(session.id).set({
    amount:session.amount_total/100,
    timestamp:admin.firestore.FieldValue.serverTimestamp()
  }).then(() => console.log(`Successfully Added to DB`))
};

export default async (req, res) => {
  if (req.method == "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    //Verify that event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR!!!!", err.message);
      return res.status(400).send(`WebHook Error ${err.message}`);
    }

    //Checkout session completed event
    if (event.type == "checkout.session.completed") {
      const session = event.data.object;
      return fulfillOrder(session)
        .then(() => {
          res.status(200);
        })
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
