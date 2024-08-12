import { Request, Response } from "express";
import stripe from "../lib/stripeModule";
import getPaymentLink from "./getPaymentLink";

// Mocking the Stripe client
jest.mock("../lib/stripeClient");

describe("Get Payment Link", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let responseObject = {};
    beforeEach(() => {
        mockRequest = {
            params: {
                id: "price_1Piygk07nWBNQfFLjJ25rQyF",
            },
        };
        mockResponse = {
            send: jest.fn().mockImplementation((result) => {
                responseObject = result;
            }),
            status: jest.fn().mockReturnThis(),
            statusCode: 0,
        };
    });

    test("should return 200 and payment link", async () => {
        const mockPaymentLink = {
            object: "payment_link",
            url: "https://buy.stripe.com/test_eVa5mb3n821W9tC4gr",
        };

        // Mocking the paymentLinks.create method to return the mockPaymentLink
        (stripe.paymentLinks.create as jest.Mock).mockResolvedValue(
            mockPaymentLink
        );

        await getPaymentLink(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(responseObject).toEqual({ paymentLink: mockPaymentLink });
    });

    test("should handle errors gracefully", async () => {
        const errorMessage = "Error creating payment link";
        (stripe.paymentLinks.create as jest.Mock).mockRejectedValue(
            new Error(errorMessage)
        );

        await getPaymentLink(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.send).toHaveBeenCalledWith("Internal Server Error");
    });
});
