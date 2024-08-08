const stripeMock = {
  paymentLinks: {
    create: jest.fn(() =>
      Promise.resolve({
        url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
        object: 'payment_link',
      })
    ),
  },
};

export default stripeMock;
