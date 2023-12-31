import express from 'express';
import Stripe from 'stripe';
const app = express();
const PORT = 3000;

const PK_STRIPE =
	'pk_test_51OTKztSAPrDRWCND8zLfk04d1Id2JxcP6eemCs6dQMOaeV2oSz7Ku4MBvf8yplwgc05TA9YO094NdsNMtvTAHAsK00nHLoW2ue';
const SK_STRIPE =
	'sk_test_51OTKztSAPrDRWCNDWRTu6KFRTbF6rnh0EdbnWPSLBumZUdZF42SKtZDkqNwBYuB5BMeps12KCqvjVbmtv7yTdt1f00qGXBO3d9';

const stripe = Stripe(SK_STRIPE, {
	apiVersion: '2023-10-16',
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/payments/create-payment-intent', async (req, res) => {
	try {
		const { paymentMethodType, currency, amount } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types: [paymentMethodType],
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (err) {
		res.status(500).json({ statusCode: 500, message: err.message });
	}
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}!`);
});
