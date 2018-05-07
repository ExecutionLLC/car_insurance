const bodyParser = require('body-parser')
const express = require('express');
const HttpStatus = require('http-status-codes');
const morgan = require('morgan');

const BlockchainApi = require('./blockchain/api');
const blockchainApiInstance = new BlockchainApi();

const config = require('./utils/config');
const logger = require('./utils/log')('app');

const app = express();

app.use(morgan('dev'));

// parse application/json
app.use(bodyParser.json());

app.get('/person/:address', function (req, res, next) {
    const address = req.params.address;
    blockchainApiInstance.getPersonInfoByAddress(address).then((result) => {
        result.operationsHistory = blockchainApiInstance.getOperationsHistory(address);
        result.pendedOperations = blockchainApiInstance.getPendedOperations(address);
        result.tariffHistory = blockchainApiInstance.getTariffHistory(address);
        result.pendedTariffChanges = blockchainApiInstance.getPendedTariffChanges(address);
        result.npfHistory = blockchainApiInstance.getNpfHistory(address);
        result.pendedNpfChanges = blockchainApiInstance.getPendedNpfChanges(address);
        res.json(result);
    }).catch(next);
});

app.get('/person/:address/operationsHistory', function (req, res, next) {
    const address = req.params.address;
    res.json(blockchainApiInstance.getOperationsHistory(address));
});

app.get('/person/:address/pendedOperations', function (req, res, next) {
    const address = req.params.address;
    res.json(blockchainApiInstance.getPendedOperations(address));
});

app.get('/person/:address/tariffHistory', function (req, res, next) {
    const address = req.params.address;
    res.json(blockchainApiInstance.getTariffHistory(address));
});

app.get('/person/:address/pendedTariffChanges', function (req, res, next) {
    const address = req.params.address;
    res.json(blockchainApiInstance.getPendedTariffChanges(address));
});

app.get('/person/:address/npfHistory', function (req, res, next) {
    const address = req.params.address;
    res.json(blockchainApiInstance.getNpfHistory(address));
});

app.get('/person/:address/pendedNpfChanges', function (req, res, next) {
    const address = req.params.address;
    res.json(blockchainApiInstance.getPendedNpfChanges(address));
});

app.get('/person/:address/npf', function (req, res, next) {
    const address = req.params.address;
    blockchainApiInstance.getPersonInfoByAddress(address).then((result) => {
        res.json({
            npf: result.npf
        });
    }).catch(next);
});

app.put('/person/:address/npf', function (req, res, next) {
    const address = req.params.address;
    const { privateKey, npf, timestamp, force } = req.body;

    if (!force) {
        const pended = blockchainApiInstance.getPendedNpfChanges(address);
        if (pended.length > 0) {
            res.json({ error: 'queue is not empty' });
            res.status(HttpStatus.CONFLICT);
            return;
        }
    }

    blockchainApiInstance.changeNpf(address, privateKey, npf, timestamp).then((result) => {
        res.json(result);
        res.status(HttpStatus.ACCEPTED);
    }).catch(next);
});

app.get('/person/:address/tariff', function (req, res, next) {
    const address = req.params.address;
    blockchainApiInstance.getPersonInfoByAddress(address).then((result) => {
        res.json({
            tariff: result.tariff
        });
    }).catch(next);
});

app.put('/person/:address/tariff', function (req, res, next) {
    const address = req.params.address;
    const { privateKey, tariff, timestamp, force } = req.body;

    if (!force) {
        const pended = blockchainApiInstance.getPendedTariffChanges(address);
        if (pended.length > 0) {
            res.json({ error: 'queue is not empty' });
            res.status(HttpStatus.CONFLICT);
            return;
        }
    }

    blockchainApiInstance.changeTariff(address, privateKey, tariff, timestamp).then((result) => {
        res.json(result);
        res.status(HttpStatus.ACCEPTED);
    }).catch(next);
});

app.get('/person/:address/balance', function (req, res, next) {
    const address = req.params.address;
    blockchainApiInstance.getPersonInfoByAddress(address).then((result) => {
        res.json({ balance: result.balance });
    }).catch(next);
});

app.put('/person/:address/operation', function (req, res, next) {
    const address = req.params.address;

    const {
        privateKey,
        amount,
        contractor,
        comment,
        timestamp,
        force
    } = req.body;

    if (!force) {
        const pended = blockchainApiInstance.getPendedOperations(address);
        if (pended.length > 0) {
            res.json({ error: 'queue is not empty' });
            res.status(HttpStatus.CONFLICT);
            return;
        }
    }

    blockchainApiInstance.addOperation(address, privateKey, amount, contractor, comment, timestamp).then((result) => {
        res.json(result);
        res.status(HttpStatus.ACCEPTED);
    }).catch(next);
});

app.get('/transaction/:transactionhash', function (req, res, next) {
    const transactionHash = req.params.transactionhash;
    blockchainApiInstance.getTransaction(transactionHash).then((result) => {
        res.json(result);
    }).catch(next);
});

// catch 404 and forward to error handler
app.use(function(req, res, next){
    res.status(404);
    logger.debug('%s %d %s', req.method, res.statusCode, req.url);
    res.json({
        error: 'Not found'
    });
});

// error handlers
app.use(function(err, req, res, next){
    res.status(err.status || HttpStatus.INTERNAL_SERVER_ERROR);
    logger.error('%s %d %s', req.method, res.statusCode, err.message);
    res.json({
        error: err.message
    });
});

blockchainApiInstance.init().then(() => {
    const appPort = config.get('webServerPort') || 3000;
    app.listen(appPort, function () {
        logger.info('Server listening on port ' + appPort);
    });
}).catch(logger.error);
