var url = require('url');
const querystring = require('querystring');
const micrositeConfig = require('../microsite.config');
const micrositePrefix = querystring.unescape(url.parse(micrositeConfig.PreviewUrl).pathname.substr(1));

module.exports = micrositePrefix;