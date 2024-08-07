import request from 'supertest';
import app from '../../src/app';
import path from 'path';
import ejs from 'ejs';
const { JSDOM } = require('jsdom');
import { getByText, fireEvent } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// https://stackoverflow.com/questions/63426871/how-to-unit-test-ejs-files-that-produced-by-express-server

const indexFile = path.resolve(__dirname, '../../src/views/index.ejs');

import stripe from '../../__mocks__/stripe';
import createCheckoutSession from '../../src/lib/stripeCheckout';

jest.mock('../../__mocks__/stripe');

describe.skip('Home page', () => {
  let container: HTMLElement;

  beforeAll((done) => {
    ejs.renderFile(indexFile, (err, htmlString) => {
      if (err) {
        done(err);
        return;
      }
      const dom = new JSDOM(htmlString, { runScripts: 'dangerously' });
      container = dom.window.document.body;
      done();
    });
  });

  test('should load header section', () => {
    expect(getByText(container, /Shopping Cart/i)).toBeInTheDocument();
    expect(getByText(container, /Big bad loaf/i)).toBeInTheDocument();
  });

  test('should have a checkout button and handle click', async () => {
    const button = getByText(container, /Proceed to Checkout/i);
    expect(button).toBeInTheDocument();

    // fireEvent.click(button);
    // const total = await screen.getByTestId('product-summary-total-amount');

    // expect(total.innerText).toBe('£60.00');

    // client side handling not possible
  });
});

describe.skip('createCheckoutSession', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a checkout session with the correct parameters', async () => {
    // Arrange - already set up in mock
    // const mockSession = { url: 'https://www.google.co.uk' };
    // stripe.checkout.sessions.create.mockResolvedValue(mockSession);

    // // Act
    // const session = await createCheckoutSession();

    // // Assert
    expect(stripe.checkout.sessions.create).toHaveBeenCalledTimes(1);
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
      line_items: [
        {
          price: 'price_1Piygk07nWBNQfFLjJ25rQyF',
          quantity: 2,
        },
      ],
      mode: 'payment',
      success_url: 'https://localhost:3002/success',
      cancel_url: 'https://localhost:3002/cancel',
    });
    // expect(session).toEqual(mockSession);
  });
});

// describe('Home page', () => {
//
//   it('should render the heading', async () => {
//     const response = await request(app).get('/');
//     console.log(response.text);
//     const dom = new jsdom.JSDOM(response.text);
//     dom.window.document.querySelector('p').textContent; // 'Hello world'

//     expect(dom.window.document.querySelector('p').textContent).toBe(
//       'Price: £20'
//     );
//   });
// });

// describe('GET /payment', () => {
//   test('should return 200 and payment link', async () => {
//     const priceId = 'snosno0s0son';

//     const mockPaymentLink = {
//       url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
//       object: 'payment_link',
//     };

//     nock('https://api.stripe.com')
//       .post(`/v1/payment_links`)
//       .reply(200, mockPaymentLink);

//     const response = await request(app).get(`/payment/${priceId}`);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ paymentLink: mockPaymentLink });
//   });
// });
