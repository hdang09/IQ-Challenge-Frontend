const publicRuntimeConfig = {
    NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV || 'production',
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    LOCALSTORAGE_TOKEN_NAME: 'token',
    CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
};

export const { NODE_ENV, API_URL, LOCALSTORAGE_TOKEN_NAME, CLIENT_ID } = publicRuntimeConfig;

export default publicRuntimeConfig.NODE_ENV;
