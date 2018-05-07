const CONTRACT = {
    ID: "0x56e9b276c356a7fa6b2bd3d7a64b719ce60fd0ba",
    ABI: [{
        "constant": false,
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_snils", "type": "string"}, {
            "name": "_npf",
            "type": "address"
        }, {"name": "_tariff", "type": "uint16"}, {"name": "_balance", "type": "int64"}],
        "name": "createPerson",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_snils", "type": "string"}, {"name": "_timestamp", "type": "uint256"}, {
            "name": "_amount",
            "type": "int64"
        }, {"name": "_contractor", "type": "string"}, {"name": "_operationComment", "type": "string"}],
        "name": "addOperationHistory",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_address", "type": "address"}],
        "name": "personSnilsByAddress",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_snils", "type": "string"}],
        "name": "isRegisteredSnils",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_npf", "type": "address"}],
        "name": "isRegisteredNpf",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_npf", "type": "address"}, {"name": "_isActive", "type": "bool"}],
        "name": "changeNpfState",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_newNpf", "type": "address"}, {"name": "_timestamp", "type": "uint256"}],
        "name": "changeNpf",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_person", "type": "address"}],
        "name": "isRegisteredPerson",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_npf", "type": "address"}],
        "name": "isActiveNpf",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_npf", "type": "address"}],
        "name": "npfName",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_tariff", "type": "uint16"}],
        "name": "isValidTariff",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_name", "type": "string"}, {
            "name": "_isActive",
            "type": "bool"
        }],
        "name": "createNpf",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_address", "type": "address"}],
        "name": "personInfoByAddress",
        "outputs": [{"name": "npf", "type": "address"}, {"name": "tariff", "type": "uint16"}, {
            "name": "balance",
            "type": "int64"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_name", "type": "string"}, {
            "name": "_isActive",
            "type": "bool"
        }],
        "name": "createBank",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_newTariff", "type": "uint16"}, {"name": "_timestamp", "type": "uint256"}],
        "name": "changeTariff",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_bank", "type": "address"}, {"name": "_isActive", "type": "bool"}],
        "name": "changeBankState",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_account", "type": "address"}],
        "name": "accountType",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_snils", "type": "string"}],
        "name": "personInfoBySnils",
        "outputs": [{"name": "npf", "type": "address"}, {"name": "tariff", "type": "uint16"}, {
            "name": "balance",
            "type": "int64"
        }],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_bank", "type": "address"}],
        "name": "isActiveBank",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_bank", "type": "address"}],
        "name": "bankName",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_bank", "type": "address"}],
        "name": "isRegisteredBank",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_snils", "type": "string"}],
        "name": "personAddressBySnils",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"name": "_owner", "type": "address"}],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {"payable": false, "stateMutability": "nonpayable", "type": "fallback"}, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_snils",
            "type": "string"
        }],
        "name": "EventNewPerson",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_name",
            "type": "string"
        }, {"indexed": false, "name": "_isActive", "type": "bool"}],
        "name": "EventNewNpf",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_name",
            "type": "string"
        }, {"indexed": false, "name": "_isActive", "type": "bool"}],
        "name": "EventNewBank",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_isActive",
            "type": "bool"
        }],
        "name": "EventNpfStateChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_isActive",
            "type": "bool"
        }],
        "name": "EventBankStateChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_oldNpf",
            "type": "address"
        }, {"indexed": false, "name": "_newNpf", "type": "address"}, {
            "indexed": false,
            "name": "_timestamp",
            "type": "uint256"
        }],
        "name": "EventNpfChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "name": "_owner", "type": "address"}, {
            "indexed": false,
            "name": "_oldTariff",
            "type": "uint16"
        }, {"indexed": false, "name": "_newTariff", "type": "uint16"}, {
            "indexed": false,
            "name": "_timestamp",
            "type": "uint256"
        }],
        "name": "EventTariffChanged",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": true,
            "name": "_npf",
            "type": "address"
        }, {"indexed": false, "name": "_tariff", "type": "uint16"}, {
            "indexed": false,
            "name": "_timestamp",
            "type": "uint256"
        }, {"indexed": false, "name": "_amount", "type": "int64"}, {
            "indexed": false,
            "name": "_contractor",
            "type": "string"
        }, {"indexed": false, "name": "_comment", "type": "string"}],
        "name": "EventOperation",
        "type": "event"
    }]
};

module.exports = CONTRACT;
