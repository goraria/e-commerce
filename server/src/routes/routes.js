const AuthenticationRoute = require('./AuthenticationRoute')
const ProductRouter = require('./ProductRouter')
const AddressRoute = require('./AddressRoute')
function routes(app) {
    app.use('/authentication', AuthenticationRoute);
    app.use('/products', ProductRouter);
    app.use('/address', AddressRoute);
}

module.exports = routes;