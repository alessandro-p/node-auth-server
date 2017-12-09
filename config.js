// Hold application secrets and config
module.exports = {
    api_server: {
        protocol: process.env.API_PROTOCOL || 'https',
        api_version: process.env.API_VERSION || 'v1',
        host: process.env.API_HOST || 'api.your-host.net',
        port: parseInt(process.env.API_PORT, 10) || 3090
    },
    secret: 'your-secret-here'
};