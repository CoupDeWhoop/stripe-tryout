const stripe = {
  checkout: {
    sessions: {
      create: jest.fn(() =>
        Promise.resolve({ url: 'https://www.google.co.uk' })
      ),
    },
  },
};
export default stripe;
