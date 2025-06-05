const express = require('express');
const stripeController = require('../controllers/stripe.controller');

const router = express.Router();

router.post("/create-checkout-session", stripeController.createSession);
router.get("/success", (req, res) => res.redirect('/success.html'));
router.get("/cancel", (req, res) => res.redirect('/cancel.html'));

module.exports = router;
