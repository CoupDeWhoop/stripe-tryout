import { Request, Response } from "express";
import Stripe from "stripe";
import env from "../lib/env";

interface Product {
    name: string;
    productId: number;
    quantity: number;
}

export default function addItemToBasket(product: Product) {
    // Extract item details from request body

    const basket = JSON.parse(localStorage.getItem("basket") || "[]");

    const existingItem = basket.find(
        (item: Product) => item.productId === product.productId
    );

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        basket.push(product);
    }

    localStorage.setItem("basket", JSON.stringify(basket));
}
