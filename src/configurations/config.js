const config = {
  baseUrl: 'https://staging.denave.com:8448/GoogleDaas',
  siteKey: String(import.meta.env.VITE_REACAPTCHA_PUBLIC_KEY),
};

export default config;
