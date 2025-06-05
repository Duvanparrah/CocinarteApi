const Stripe = require('stripe');
const { STRIPE_PRIVATE_KEY } = require('../config');

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

const createSession = async (req, res) => {
    try {
        const { plan } = req.body;

        if (!plan) {
            return res.status(400).json({ error: 'Se requiere un plan.' });
        }

        let priceId;
        let modeStripe;
        
        if (plan === 'gratuito') {
            priceId = 'price_1RHoTTRqfp8zswlCXRagarBP'; // ID real para Plan Gratuito
            modeStripe = 'payment';
        } else if (plan === 'pro') {
            priceId = 'price_1RHoZgRqfp8zswlCUS4PTJQB'; // ID real para Plan Pro
            modeStripe = 'subscription';
        } else {
            return res.status(400).json({ error: 'Plan no válido' });
        }

        const session = await stripe.checkout.sessions.create({
           payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: modeStripe, 
            success_url: 'http://localhost:5000/success',
            cancel_url: 'http://localhost:5000/cancel',
        });

        return res.json({ url: session.url }); // Mejor devolver la URL de pago
    } catch (error) {
        console.error('Error creando sesión de Stripe:', error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { createSession };
