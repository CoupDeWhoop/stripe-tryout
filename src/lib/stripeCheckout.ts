import stripe from "./stripeModule";

export default async function createCheckoutSession() {
    const session = await stripe.checkout.sessions.create({
        cancel_url: `https://localhost:3002/cancel`,
        line_items: [
            {
                price: "price_1Piygk07nWBNQfFLjJ25rQyF",
                quantity: 2,
            },
        ],
        mode: "payment",

        success_url: `https://localhost:3002/success`,
    });

    return session;
}
