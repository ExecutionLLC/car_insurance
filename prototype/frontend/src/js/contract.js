const CONTRACT = {
    ID: '0xf21d90e56665654dd1d811930f304f9fedc97e2e',
    ABI: [{
        "constant": true,
        "inputs": [{"name": "_address", "type": "address"}],
        "name": "personSnilsByAddress",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_owner", "type": "address"}, {"name": "_snils", "type": "string"}, {
            "name": "_npf",
            "type": "address"
        }, {"name": "_tariff", "type": "uint16"}],
        "name": "createPerson",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_snils", "type": "string"}],
        "name": "isRegisteredSnils",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_npf", "type": "address"}],
        "name": "isRegisteredNpf",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_npf", "type": "address"}, {"name": "_isActive", "type": "bool"}],
        "name": "changeNpfState",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_person", "type": "address"}],
        "name": "isRegisteredPerson",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_npf", "type": "address"}],
        "name": "isActiveNpf",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_npf", "type": "address"}],
        "name": "npfName",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_tariff", "type": "uint16"}],
        "name": "isValidTariff",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
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
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_address", "type": "address"}],
        "name": "personInfoByAddress",
        "outputs": [{"name": "npf", "type": "address"}, {"name": "tariff", "type": "uint16"}],
        "payable": false,
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
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_bank", "type": "address"}, {"name": "_isActive", "type": "bool"}],
        "name": "changeBankState",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_snils", "type": "string"}, {
            "name": "_amount",
            "type": "uint256"
        }, {"name": "_operationComment", "type": "string"}],
        "name": "addOperationHistory",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_account", "type": "address"}],
        "name": "accountType",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_newTariff", "type": "uint16"}],
        "name": "changeTariff",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_snils", "type": "string"}],
        "name": "personInfo",
        "outputs": [{"name": "npf", "type": "address"}, {"name": "tariff", "type": "uint16"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{"name": "_newNpf", "type": "address"}],
        "name": "changeNpf",
        "outputs": [],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_bank", "type": "address"}],
        "name": "isActiveBank",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_bank", "type": "address"}],
        "name": "bankName",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_bank", "type": "address"}],
        "name": "isRegisteredBank",
        "outputs": [{"name": "", "type": "bool"}],
        "payable": false,
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{"name": "_snils", "type": "string"}],
        "name": "personAddressBySnils",
        "outputs": [{"name": "", "type": "address"}],
        "payable": false,
        "type": "function"
    }, {"inputs": [{"name": "_owner", "type": "address"}], "payable": false, "type": "constructor"}, {
        "payable": false,
        "type": "fallback"
    }, {
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
        "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
            "indexed": true,
            "name": "_npf",
            "type": "address"
        }, {"indexed": false, "name": "_timestamp", "type": "uint256"}, {
            "indexed": false,
            "name": "_amount",
            "type": "uint256"
        }, {"indexed": false, "name": "_comment", "type": "string"}],
        "name": "EventOperation",
        "type": "event"
    }]
};
