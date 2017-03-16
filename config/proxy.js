const querystring = require('querystring');
var url = require('url');
var microsite = require('../microsite.config');
var previewUrl = url.parse(querystring.unescape(microsite.PreviewUrl));
var proxyTarget = `${previewUrl.protocol}//${previewUrl.host}`;

var proxyConfig = {
    '*': {
        target: proxyTarget,
        changeOrigin: true,
        secure: false,
        onProxyRes: function(proxyRes, req, res) {
            Object.keys(proxyRes.headers).forEach(function(key) {
                res.append(key, proxyRes.headers[key]);
            });
        },
        onProxyReq: function(proxyReq, req, res, options) {
            var cookie = req.headers.cookie;
            if (cookie){
                proxyReq.setHeader('cookie', cookie);
            }
        }
    }
}

module.exports = proxyConfig;