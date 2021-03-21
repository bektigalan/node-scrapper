const homeRouter = require('./home');
const plRouter = require('./pl');

module.exports = (app) => {
    app.use(plRouter);
    homeRouter(app);
}