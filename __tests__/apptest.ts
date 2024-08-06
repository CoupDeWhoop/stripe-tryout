import nock from 'nock';
import request from 'supertest';
import app from '../src/app';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
import { getByText, fireEvent } from '@testing-library/dom';
import path from 'path';
import ejs from 'ejs';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeAll(() => {
  nock.disableNetConnect(); // Disable all real network connections
  nock.enableNetConnect('127.0.0.1');
});
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

const targetFile = path.resolve(__dirname, '../src/views/index.ejs');

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

describe('Home page', () => {
  let container: HTMLElement;

  beforeAll((done) => {
    ejs.renderFile(targetFile, (err, htmlString) => {
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

  test.skip('should have a checkout button and handle click', async () => {
    const button = getByText(container, /Proceed to Checkout/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    const total = await screen.getByTestId('product-summary-total-amount');

    expect(total.innerText).toBe('£60.00');

    // Since there's no client-side JS handling, you can't test redirection here.
    // You'd need an E2E test framework like Cypress for full flow testing.
  });
});

describe('GET /payment', () => {
  test('should return 200 and payment link', async () => {
    const priceId = 'snosno0s0son';

    const mockPaymentLink = {
      url: 'https://buy.stripe.com/test_eVa5mb3n821W9tC4gr',
      object: 'payment_link',
    };

    nock('https://api.stripe.com')
      .post(`/v1/payment_links`)
      .reply(200, mockPaymentLink);

    const response = await request(app).get(`/payment/${priceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ paymentLink: mockPaymentLink });
  });
});
