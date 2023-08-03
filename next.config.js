const { withPlugins } = require('next-compose-plugins');
const withImages = require('next-images');
const withSvgr = require('@newhighsco/next-plugin-svgr')

const withSvgrConfig = {
    svgrOptions: {
        typescript: true
    }
}

const withImageConfig = {
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
        REDUX_DEBUG: process.env.REDUX_DEBUG,
        RE_CAPTCHA_KEY: process.env.RE_CAPTCHA_KEY,
        LANDING_URL: process.env.LANDING_URL,
        CABINET_URL: process.env.CABINET_URL,
        SENTRY_DSN: process.env.SENTRY_DSN,
        ENVIRONMENT: process.env.ENVIRONMENT,
        GOOGLE_TAG_ID: process.env.GOOGLE_TAG_ID,
        GOOGLE_TAG_MANAGER_CONTAINER_ID: process.env.GOOGLE_TAG_MANAGER_CONTAINER_ID
    },
    trailingSlash: true,
    poweredByHeader: false
}

module.exports = withPlugins([
        [withImages, withImageConfig],
        [withSvgr, withSvgrConfig]
]);
