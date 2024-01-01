import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
dotenv.config({
	path: '../env',
});

const stripe = Stripe(process.env.SK_STRIPE, {
	apiVersion: '2023-10-16',
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/payments/create-payment-intent', async (req, res) => {
	try {
		const { paymentMethodType, currency, amount, email } = req.body;

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency,
			payment_method_types: [paymentMethodType],
			metadata: {
				email,
			},
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
