const http = require('http');
const app = require('./app');

const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
    console.log(`server is running on port ${server.address().port}`);
});