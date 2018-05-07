const Web3_require = ((require) => {
    return (moduleName) => {
        const moduleKey = {
            'solidity': 7
        }[moduleName];
        return require(moduleKey == null ? moduleName : moduleKey);
    }
})(require);

const Web3 = Web3_require('web3');
const web3 = new Web3();

const Api = {
    init(node) {
        try {
            web3.setProvider(new web3.providers.HttpProvider(node.url));
            web3.eth.defaultAccount = web3.eth.coinbase;
        }
        catch (e) {
            console.error(e);
        }
    },
    createWalletByPrivateKey(privateKey0x, url, chainId){
        const provider = new ethers.providers.JsonRpcProvider(url, false, chainId);
        return new ethers.Wallet(privateKey0x, provider);
    },
    createWalletByFilePassword(file, password, url, chainId){
        return readFileContentAsync(file)
            .then((content) => {
                return ethers.Wallet.fromEncryptedWallet(content, password);
            })
            .then((wallet) => {
                wallet.provider = new ethers.providers.JsonRpcProvider(url, false, chainId);
                return wallet;
            });
    },
    setWeb3Provider(url){
        web3.setProvider(new web3.providers.HttpProvider(url));
    },
    getWalletType(wallet) {
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.accountType(wallet.address)
            .then((accountTypes) => {
                return accountTypes[0];
            })
    },
    getNpfs(blockNumber) {
        return new Promise((resolve, reject) => {
            const web3contract = web3.eth
                .contract(CONTRACT.ABI)
                .at(CONTRACT.ID);
            const npfEvent = web3contract.EventNewNpf({}, {
                fromBlock: blockNumber,
                toBlock: 'latest'
            });
            npfEvent.get((error, logs) => {
                if (error) {
                    reject(error);
                } else {
                    const npfArray = logs.map(log => {
                        const {_name: name, _owner: owner} = log.args;
                        return {
                            name,
                            owner
                        }
                    });
                    resolve(npfArray)
                }
            });
        });
    },
    getBanks() {
        return new Promise((resolve, reject) => {
            const web3contract = web3.eth
                .contract(CONTRACT.ABI)
                .at(CONTRACT.ID);
            const npfEvent = web3contract.EventNewBank({}, {
                fromBlock: 0,
                toBlock: 'latest'
            });
            npfEvent.get((error, logs) => {
                if (error) {
                    reject(error);
                } else {
                    const npfArray = logs.map(log => {
                        const {_name: name, _owner: owner} = log.args;
                        return {
                            name,
                            owner
                        }
                    });
                    resolve(npfArray)
                }
            });
        });
    },
    createPerson(wallet, address, npf, snils, tariff, onTransaction){
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.createPerson(address, snils, npf, tariff)
            .then((buyTransaction) => {
                const {hash} = buyTransaction;
                onTransaction(hash);
                return new Promise((resolve) => {
                    wallet.provider.once(hash, (transaction) => {
                        console.log(transaction);
                        resolve();
                    });
                });
            });
    },
    personInfo(wallet, snils){
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.personInfo(snils);
    },
    personInfoByAddress(wallet, address){
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.personInfoByAddress(address);
    },
    createNpf(wallet, address, name, onTransaction) {
        const isActive = true;
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.createNpf(address, name, isActive)
            .then((buyTransaction) => {
                const {hash} = buyTransaction;
                onTransaction(hash);
                return new Promise((resolve) => {
                    wallet.provider.once(hash, (transaction) => {
                        console.log(transaction);
                        resolve(transaction.blockNumber);
                    });
                });
            })
            .then((blockNumber) => {
                return Api.getNpfs(blockNumber);
            })
    },
    createBank(wallet, address, name, onTransaction) {
        const isActive = true;
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.createBank(address, name, isActive)
            .then((buyTransaction) => {
                const {hash} = buyTransaction;
                onTransaction(hash);
                return new Promise((resolve) => {
                    wallet.provider.once(hash, (transaction) => {
                        console.log(transaction);
                        resolve();
                    });
                });
            });
    },
    addOperationHistory(wallet, snils, count, comment, onTransaction){
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.addOperationHistory(snils, count, comment)
            .then((buyTransaction) => {
                const {hash} = buyTransaction;
                onTransaction(hash);
                return new Promise((resolve) => {
                    wallet.provider.once(hash, (transaction) => {
                        console.log(transaction);
                        resolve();
                    });
                });
            })
    },
    changeTariff(wallet, tariff, onTransaction){
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        const convert_tariff = tariff * 100;
        return contract.changeTariff(convert_tariff)
            .then((buyTransaction) => {
                const {hash} = buyTransaction;
                onTransaction(hash);
                return new Promise((resolve) => {
                    wallet.provider.once(hash, (transaction) => {
                        console.log(transaction);
                        resolve();
                    });
                });
            })
    },
    changeNpf(wallet, npf, onTransaction){
        const contract = new ethers.Contract(CONTRACT.ID, CONTRACT.ABI, wallet);
        return contract.changeNpf(npf)
            .then((buyTransaction) => {
                const {hash} = buyTransaction;
                onTransaction(hash);
                return new Promise((resolve) => {
                    wallet.provider.once(hash, (transaction) => {
                        console.log(transaction);
                        resolve();
                    });
                });
            })
    },
    getWorkerHistory(wallet) {
        return new Promise((resolve, reject) => {
            const web3contract = web3.eth
                .contract(CONTRACT.ABI)
                .at(CONTRACT.ID);
            const opHistoryEvent = web3contract.EventOperation({_owner: wallet.address}, {
                fromBlock: 0,
                toBlock: 'latest'
            });
            opHistoryEvent.get((error, logs) => {
                if (error) {
                    reject(error);
                } else {
                    const historyArray = logs.map(log => {
                        const {_owner: owner, _npf: npf, _timestamp: timestamp, _amount: amount, _comment: comment} = log.args;
                        return {
                            owner,
                            npf,
                            timestamp,
                            amount,
                            comment
                        }
                    });
                    resolve(historyArray)
                }
            });
        });
    }
};
