const homeRouter = require('./home');
const plRouter = require('./pl');
const detikRouter = require('./detik');
const kompasRoouter = require('./kompas');

module.exports = (app) => {
    app.use(plRouter);
    app.use(detikRouter);
    app.use(kompasRoouter);
    homeRouter(app);
}