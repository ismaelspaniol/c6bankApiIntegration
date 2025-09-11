import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export function getApiUrl(production: boolean): string {
  const sandboxUrl = process.env.SANDBOX_API_URL;
  const productionUrl = process.env.PRODUCTION_API_URL;

  let url = '';
  if (production) {
    if (!productionUrl) {
      throw new Error(
        'Environment variables PRODUCTION_API_URL are not defined.',
      );
    }
    url = productionUrl;
  } else {
    if (!sandboxUrl) {
      throw new Error('Environment variables SANDBOX_API_URL are not defined.');
    }
    url = sandboxUrl;
  }

  return url;
}
