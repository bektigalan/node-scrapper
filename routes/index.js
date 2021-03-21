const homeRouter = require('./home');
const plRouter = require('./pl');
const detikRouter = require('./detik');

module.exports = (app) => {
    app.use(plRouter);
    app.use(detikRouter);
    homeRouter(app);
}