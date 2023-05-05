const fruitsRoutes = require('./fruits');

const constructorMethod = (app) => {
    app.use('/', fruitsRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Not found' });
    });
};

module.exports = constructorMethod;