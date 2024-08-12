import { Request, Response } from "express";
import createCheckoutSession from "../lib/stripeCheckout";
import stripe from "../lib/stripeModule";

async function renderCheckout(req: Request, res: Response) {
    try {
        const session = await createCheckoutSession();
        // tslint:disable-next-line:no-console
        console.log(session.url);
        if (session.url) {
            res.redirect(303, session.url);
        } else {
            throw new Error("Checkout session ID is missing");
        }
    } catch (error) {
        // tslint:disable-next-line:no-console
        console.error("Error creating checkout session:", error);
        res.status(500).send("Internal Server Error");
    }
}

export { renderCheckout };
