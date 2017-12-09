// Hold application secrets and config
module.exports = {
    api_server: {
        protocol: process.env.MYBOOKER_API_PROTOCOL || 'https',
        api_version: process.env.MYBOOKER_API_VERSION || 'v1',
        host: process.env.MYBOOKER_API_HOST || 'api.your-host.net',
        port: parseInt(process.env.MYBOOKER_API_PORT, 10) || 3090
    },

    secret: 'your-secret-here'
};