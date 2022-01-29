const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const CONFIG = require('./config');

process.on('uncaughtException', function (err) {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

const app = express();                                          // create our app express
app.use(express.static(__dirname + '/dist'));                   // set the static files location
app.enable('trust proxy');
app.set('trust proxy', 'loopback,uniquelocal');
app.use(express.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(express.json());                                        // parse application/json
app.use(express.json({ type: 'application/vnd.api+json' }));    // parse application/vnd.api+json as json
app.disable('x-powered-by');

var proxyReq = (proxyReq, req, res, options) => {
    req.startTimeStemp = Date.now();
    const property = {};
    if (Object.keys(req.headers).length > 0) property.header = { ...req.headers };
    if (Object.keys(req.params).length > 0) property.params = { ...req.params };
    if (Object.keys(req.body).length > 0) property.body = { ...req.body };
    if (req.body) {
        let bodyData = JSON.stringify(req.body);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
    console.log("Req URL: " + req.originalUrl);
}

// ROUTE TO SERVICE RECRUITMENT
app.use('/services',
    createProxyMiddleware('/services',
        {
            target: CONFIG.SERVICE.RECRUITMENT.IP,
            pathRewrite: { "^/services/webasset": "" },
            onProxyReq: proxyReq,
            xfwd: true
        })
);

app.use('/', require('./web.router'));

const listener = app.listen(CONFIG.PORT);
console.log('App Listening on port ' + listener.address().port);