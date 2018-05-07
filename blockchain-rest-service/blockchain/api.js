const ethers = require('ethers');
const Web3 = require('web3');

const CONTRACT = require('./contract');
const config = require('../utils/config');
const logger = require('../utils/log')('blockchain api');
const utils = require('../utils/utils');

// check and remove failed transaction every 5 minutes
TRANSACTION_CLEANUP_INTERVAL = 5*60*1000;

class BlockchainApi {
    constructor() {
        const provider = new Web3.providers.WebsocketProvider(config.get('ethNodeWsUrl'));
        this._web3 =  new Web3(provider);
        this._contract = new this._web3.eth.Contract(CONTRACT.ABI, CONTRACT.ID);

        this._npfCache = [];
        this._operationsHistoryCache = [];
        this._tariffHistoryCache = [];
        this._npfHistoryCache = [];

        this._pendedOperations = [];
        this._pendedTariffChanges = [];
        this._pendedNpfChanges = [];
    }

    _initNpfCache() {
        const logObjToNpfObj = (logObj) => {
            const transactionHash = logObj.transactionHash;
            const { _name: name, _owner: owner } = logObj.returnValues;

            return { name, owner, transactionHash };
        };

        this._contract.events.EventNewNpf({
            fromBlock: 0
        }).on('data', (event) => {
            const npfObject = logObjToNpfObj(event);
            this._npfCache.push(npfObject);
            logger.info('got new npf object: ' + JSON.stringify(npfObject));
        }).on('change', (event) => {
            const removedTransactionHash = event.transactionHash;
            this._npfCache = this._npfCache.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            logger.warn('removed npf object (transaction hash = ' + removedTransactionHash + ')');
        }).on('error', logger.error);

        const options = {
            fromBlock: 0,
            toBlock: 'latest'
        };
        return this._contract.getPastEvents('EventNewNpf', options).then((logs) => {
            const npfs = logs.map(logObj => logObjToNpfObj(logObj));
            this._npfCache = npfs.concat(this._npfCache);
            logger.info('npf cache filled (length = ' + this._npfCache.length + ')');
        });
    }

    _initOperationsHistoryCache() {
        const logObjToHistoryObj = (logObj) => {
            const { transactionHash, returnValues }= logObj;
            const { _owner: owner, _npf: npf, _contractor: contractor, _comment: comment } = returnValues;

            return {
                owner,
                npf,
                tariff: parseInt(returnValues._tariff, 10),
                timestamp: parseInt(returnValues._timestamp, 10),
                amount: parseInt(returnValues._amount, 10),
                contractor,
                comment,
                transactionHash
            };
        };

        this._contract.events.EventOperation({
            fromBlock: 0
        }).on('data', (event) => {
            const historyObject = logObjToHistoryObj(event);
            this._pendedOperations = this._pendedOperations.filter(
                value => value.transactionHash !== historyObject.transactionHash
            );
            this._operationsHistoryCache.push(historyObject);
            logger.info('got new operation history object: ' + JSON.stringify(historyObject));
        }).on('change', (event) => {
            const removedTransactionHash = event.transactionHash;
            this._pendedOperations = this._pendedOperations.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            this._operationsHistoryCache = this._operationsHistoryCache.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            logger.warn('removed operation history object (transaction hash = ' + removedTransactionHash + ')');
        }).on('error', logger.error);

        const options = {
            fromBlock: 0,
            toBlock: 'latest'
        };
        return this._contract.getPastEvents('EventOperation', options).then((logs) => {
            const history = logs.map(logObj => logObjToHistoryObj(logObj));
            this._operationsHistoryCache = history.concat(this._operationsHistoryCache);
            logger.info('operations history cache filled (length = ' + this._operationsHistoryCache.length + ')');
        });
    }

    _initTariffHistoryCache() {
        const logObjToHistoryObj = (logObj) => {
            const { transactionHash, returnValues }= logObj;
            const { _owner: owner, _oldTariff: oldTariff, _newTariff: newTariff } = returnValues;

            return {
                owner,
                oldTariff,
                newTariff,
                timestamp: parseInt(returnValues._timestamp),
                transactionHash
            };
        };

        this._contract.events.EventTariffChanged({
            fromBlock: 0
        }).on('data', (event) => {
            const historyObject = logObjToHistoryObj(event);
            this._pendedTariffChanges = this._pendedTariffChanges.filter(
                value => value.transactionHash !== historyObject.transactionHash
            );
            this._tariffHistoryCache.push(historyObject);
            logger.info('got new tariff history object: ' + JSON.stringify(historyObject));
        }).on('change', (event) => {
            const removedTransactionHash = event.transactionHash;
            this._pendedTariffChanges = this._pendedTariffChanges.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            this._tariffHistoryCache = this._tariffHistoryCache.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            logger.warn('removed tariff history object (transaction hash = ' + removedTransactionHash + ')');
        }).on('error', logger.error);

        const options = {
            fromBlock: 0,
            toBlock: 'latest'
        };
        return this._contract.getPastEvents('EventTariffChanged', options).then((logs) => {
            const history = logs.map(logObj => logObjToHistoryObj(logObj));
            this._tariffHistoryCache = history.concat(this._tariffHistoryCache);
            logger.info('tariff history cache filled (length = ' + this._tariffHistoryCache.length + ')');
        });
    }

    _initNpfHistoryCache() {
        const logObjToHistoryObj = (logObj) => {
            const { transactionHash, returnValues } = logObj;
            const { _owner: owner, _oldNpf: oldNpf, _newNpf: newNpf } = returnValues;

            return {
                owner,
                oldNpf,
                newNpf,
                timestamp: parseInt(returnValues._timestamp, 10),
                transactionHash
            };
        };

        this._contract.events.EventNpfChanged({
            fromBlock: 0
        }).on('data', (event) => {
            const historyObject = logObjToHistoryObj(event);
            this._pendedNpfChanges = this._pendedNpfChanges.filter(
                value => value.transactionHash !== historyObject.transactionHash
            );
            this._npfHistoryCache.push(historyObject);
            logger.info('got new npf history object: ' + JSON.stringify(historyObject));
        }).on('change', (event) => {
            const removedTransactionHash = event.transactionHash;
            this._pendedNpfChanges = this._pendedNpfChanges.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            this._npfHistoryCache = this._npfHistoryCache.filter(
                value => value.transactionHash !== removedTransactionHash
            );
            logger.warn('removed npf history object (transaction hash = ' + removedTransactionHash + ')');
        }).on('error', logger.error);

        const options = {
            fromBlock: 0,
            toBlock: 'latest'
        };
        return this._contract.getPastEvents('EventNpfChanged', options).then((logs) => {
            const history = logs.map(logObj => logObjToHistoryObj(logObj));
            this._npfHistoryCache = history.concat(this._npfHistoryCache);
            logger.info('npf history cache filled (length = ' + this._npfHistoryCache.length + ')');
        });
    }

    init() {
        setInterval(() => { this._removeFailedTransactions(); }, TRANSACTION_CLEANUP_INTERVAL);
        return Promise.all([
            this._initNpfCache(),
            this._initOperationsHistoryCache(),
            this._initTariffHistoryCache(),
            this._initNpfHistoryCache()
        ]);
    }

    _removeFailedTransactions() {
        logger.info('checking transactions state');
        const removeFinishedTransaction = (arrayName, transactionHash) => {
            this._web3.eth.getTransactionReceipt(transactionHash).then((receipt) => {
                if (receipt) {
                    this[arrayName] = this[arrayName].filter(
                        item => item.transactionHash !== transactionHash
                    );
                }
            }).catch(logger.error);
        };
        this._pendedOperations.forEach(
            value => removeFinishedTransaction('_pendedOperations', value.transactionHash)
        );
        this._pendedTariffChanges.forEach(
            value => removeFinishedTransaction('_pendedTariffChanges', value.transactionHash)
        );
        this._pendedNpfChanges.forEach(
            value => removeFinishedTransaction('_pendedNpfChanges', value.transactionHash)
        );
    }

    static _getEthWallet(privateKey, validationAddress) {
        if (!utils.isValidPrivateKey(privateKey)) {
            throw Error('private key is not valid');
        }
        const chainId = config.get('ethNodeChainId') || 1;
        const provider = new ethers.providers.JsonRpcProvider(config.get('ethNodeHttpUrl'), false, chainId);
        const wallet = new ethers.Wallet(privateKey, provider);

        if (validationAddress && !utils.compareAddresses(wallet.address, validationAddress)) {
            throw Error('private key address and validation address must be the same');
        }

        return wallet;
    }

    static _getSignedContract(privateKey, validationAddress) {
        const wallet = BlockchainApi._getEthWallet(privateKey, validationAddress);
        return new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
    }

    // It is mach better way to send signed transaction, but we can
    // not use it now, because of web3 bug (https://github.com/ethereum/web3.js/issues/932)
    //
    // _signAndSendTransaction(transaction, privateKey) {
    //     return new Promise((resolve, reject) => {
    //         const account = this._web3.eth.accounts.privateKeyToAccount(privateKey);
    //         const p0 = this._web3.eth.getTransactionCount(account.address);
    //         const p1 = transaction.estimateGas({ from: account.address });
    //         Promise.all([p0, p1]).then(([nonce, gas]) => {
    //             const rawTransaction = {
    //                 from: account.address,
    //                 to: this._contract.options.address,
    //                 nonce,
    //                 data: transaction.encodeABI(),
    //                 gas
    //             };
    //             return account.signTransaction(rawTransaction);
    //         }).then((signedTransaction) => {
    //             this._web3.eth.sendSignedTransaction(signedTransaction).on('transactionHash', (transactionHash) => {
    //                 resolve(transactionHash);
    //             }).on('receipt', (receipt) => {
    //                 logger.info('receipt');
    //             }).on('confirmation', (confirmationNumber, receipt) => {
    //                 logger.info('confirmation');
    //             }).on('error', (error) => {
    //                 reject(error);
    //             });
    //         }).catch(reject);
    //     });
    // }

    getNpfList() {
        return this._npfCache;
    }

    static _getHistory(historyArray, address) {
        return historyArray.filter(
            value => utils.compareAddresses(value.owner, address)
        );
    }

    getOperationsHistory(address) {
        return BlockchainApi._getHistory(this._operationsHistoryCache, address);
    }

    getTariffHistory(address) {
        return BlockchainApi._getHistory(this._tariffHistoryCache, address);
    }

    getNpfHistory(address) {
        return BlockchainApi._getHistory(this._npfHistoryCache, address);
    }

    getPendedOperations(address) {
        return this._pendedOperations.filter(
            value => utils.compareAddresses(value.owner, address)
        );
    }

    getPendedTariffChanges(address) {
        return this._pendedTariffChanges.filter(
            value => utils.compareAddresses(value.owner, address)
        );
    }

    getPendedNpfChanges(address) {
        return this._pendedNpfChanges.filter(
            value => utils.compareAddresses(value.owner, address)
        );
    }

    getPersonInfoByAddress(address) {
        return new Promise((resolve, reject) => {
            address = utils.normalizeAddress(address);
            this._contract.methods.personInfoByAddress(address).call().then((result) => {
                return {
                    npf: result.npf,
                    tariff: parseInt(result.tariff, 10),
                    balance: parseInt(result.balance, 10)
                };
            }).then(resolve, reject);
        });
    }

    getPersonSnils(address) {
        return new Promise((resolve, reject) => {
            address = utils.normalizeAddress(address);
            this._contract.methods.personSnilsByAddress(address).call().then((snils) => {
                if (!snils) {
                    throw new Error('person is not registered');
                }

                return {snils};
            }).then(resolve, reject);
        });
    }

    addOperation(address, npfPrivateKey, amount, contractor, comment, timestamp) {
        return new Promise((resolve, reject) => {
            if (!timestamp) {
                timestamp = Date.now();
            }

            address = utils.normalizeAddress(address);
            npfPrivateKey = utils.normalizePrivateKey(npfPrivateKey);

            if (!contractor) {
                return reject(Error('contractor can not be empty'));
            }
            if (!comment) {
                return reject(Error('comment can not be empty'));
            }

            Promise.all([this.getPersonInfoByAddress(address), this.getPersonSnils(address)]).then(([info, snils_info]) => {
                const contract = BlockchainApi._getSignedContract(npfPrivateKey, info.npf);
                return contract.addOperationHistory(snils_info.snils, timestamp, amount, contractor, comment);
            }).then((transaction) => {
                const transactionHash = transaction.hash;
                this._pendedOperations.push({
                    owner: address,
                    timestamp,
                    amount,
                    contractor,
                    comment,
                    transactionHash
                });
                return { transactionHash };
            }).then(resolve, reject);
        });
    }

    changeTariff(address, privateKey, tariff, timestamp) {
        return new Promise((resolve, reject) => {
            if (!timestamp) {
                timestamp = Date.now();
            }

            address = utils.normalizeAddress(address);
            privateKey = utils.normalizePrivateKey(privateKey);

            const contract = BlockchainApi._getSignedContract(privateKey, address);
            contract.changeTariff(tariff, timestamp).then((transaction) => {
                const transactionHash = transaction.hash;
                this._pendedTariffChanges.push({
                    owner: address,
                    tariff,
                    timestamp,
                    transactionHash
                });
                return { transactionHash };
            }).then(resolve, reject);
        });
    }

    changeNpf(address, privateKey, npfAddress, timestamp) {
        return new Promise((resolve, reject) => {
            if (!timestamp) {
                timestamp = Date.now();
            }

            address = utils.normalizeAddress(address);
            privateKey = utils.normalizePrivateKey(privateKey);
            npfAddress = utils.normalizeAddress(npfAddress);

            const contract = BlockchainApi._getSignedContract(privateKey, address);
            return contract.changeNpf(npfAddress, timestamp).then((transaction) => {
                const transactionHash = transaction.hash;
                this._pendedNpfChanges.push({
                    owner: address,
                    npf: npfAddress,
                    timestamp,
                    transactionHash
                });
                return { transactionHash };
            }).then(resolve, reject);
        });
    }

    getTransaction(transactionHash) {
        transactionHash = utils.normalizeHexString(transactionHash);
        return this._web3.eth.getTransaction(transactionHash);
    }
}

module.exports = BlockchainApi;
