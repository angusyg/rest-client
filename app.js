// includes
var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    sassMiddleware = require('node-sass-middleware'),
    bodyParser = require('body-parser'),
    helmet = require('helmet'),
    // custom middlewares
    appMiddleware = require('./server/middlewares'),
    // modules routes
    clientRoute = require('./server/routes/client'),
    loggerRoute = require('./server/routes/logger'),
    config = require('./config').load();

var app = express();

// configuration
app.set('config', config);

// view configuration
app.set('views', path.join(__dirname, 'client', 'views', 'pug'));
app.set('view engine', 'pug');

// middlewares
app.use(favicon(path.join(__dirname, 'client', 'public', 'favicon.ico')));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(sassMiddleware({
    src: path.join(__dirname, 'client', 'views', 'stylesheets'),
    dest: path.join(__dirname, 'client', 'public', 'stylesheets'),
    indentedSyntax: true,
    sourceMap: true,
    prefix: '/stylesheets'
}));
app.use(express.static(path.join(__dirname, 'client', 'public')));

// map modules routes
app.use('/', clientRoute);
app.use('/logger', loggerRoute);

app.use(appMiddleware.errorMapper);
app.use(appMiddleware.errorHandler);

module.exports = app;