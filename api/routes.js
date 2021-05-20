const MsAuthController = require('./controller/MsAuthController')

module.exports = (app) => {
    app.post('/authenticate', MsAuthController.authenticateAccount)

    app.get('/*', (req, res) => {
        res.status(404).send({
            error: 'NOT_FOUND',
            message: 'Endpoint not found'
        })
    });

    app.post('/*', (req, res) => {
        res.status(404).send({
            error: 'NOT_FOUND',
            message: 'Endpoint not found'
        })
    });
}