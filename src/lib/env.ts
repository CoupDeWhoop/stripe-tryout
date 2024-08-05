import dotenv from 'dotenv';
dotenv.config();

import { cleanEnv, str } from 'envalid';

// helped when I was resuing key in different modules
const env = cleanEnv(process.env, {
  STRIPE_SECRET_KEY: str(),
});

export default env;
