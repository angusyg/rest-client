var uuidv4 = require('uuid/v4'),
    fs = require('fs'),
    tsFormat = function() {
        return (new Date()).toLocaleString();
    },
    logFolder = function() {
        var folder = process.cwd() + '/logs';
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
        }
        return folder;
    },
    httpStatus = {
        serverError: 500,
        unauthorizedAccess: 401,
        unauthorizedOperation: 403,
        notFound: 404,
        ok: 200,
        noContent: 204
    },
    log = {
        server: {
            file: {
                level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
                filename: logFolder() + '/-server.log',
                datePattern: 'dd-MM-yyyy',
                prepend: true,
                handleExceptions: true,
                json: true,
                maxsize: 5242880,
                maxFiles: 5,
                colorize: false,
                maxDays: 7,
                timestamp: tsFormat
            },
            console: {
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true,
                timestamp: tsFormat
            },
            exitOnError: false
        },
        client: {
            file: {
                level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
                filename: logFolder() + '/-client.log',
                datePattern: 'dd-MM-yyyy',
                prepend: true,
                handleExceptions: true,
                json: true,
                maxsize: 5242880,
                maxFiles: 5,
                colorize: false,
                maxDays: 7,
                timestamp: tsFormat
            },
            console: {
                level: 'debug',
                handleExceptions: true,
                json: false,
                colorize: true,
                timestamp: tsFormat
            },
            exitOnError: false
        }
    },
    cfg = {
        development: {
            server: {
                host: '#SERVER_HOST#',
                port: #SERVER_PORT#
            },
            apiServer: {
                host: '#API_SERVER_HOST#',
                port: #API_SERVER_PORT#
            },
            log: log,
            httpStatus: httpStatus
        },
        production: {
            server: {
                host: '#SERVER_HOST#',
                port: #SERVER_PORT#
            },
            apiServer: {
                host: '#API_SERVER_HOST#',
                port: #API_SERVER_PORT#
            },
            log: log,
            httpStatus: httpStatus
        }
    };

module.exports = {
    load: function() {
        var env = process.env.NODE_ENV || 'development';
        var config = cfg[env];
        return config;
    }
};