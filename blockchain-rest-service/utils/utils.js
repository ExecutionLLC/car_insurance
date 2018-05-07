const web3 = require('web3');

const Utils = {
    isValidAddress(address) {
        return web3.utils.isAddress(address);
    },
    isValidPrivateKey(privateKey) {
        const prefixLength = privateKey.substring(0, 2) === '0x' ? 2 : 0;
        const keyDigits = privateKey.length - prefixLength;
        return keyDigits === 64 || keyDigits === 128 || keyDigits === 132;
    },
    normalizeAddress(address) {
        return web3.utils.toChecksumAddress(address.toUpperCase());
    },
    normalizeHexString(hexString) {
        if (hexString && hexString.substring(0, 2) !== '0x') {
            return `0x${hexString}`;
        }

        return hexString;
    },
    normalizePrivateKey(privateKey) {
        if (!Utils.isValidPrivateKey(privateKey)) {
            throw Error('address is not valid');
        }
        return Utils.normalizeHexString(privateKey);
    },
    compareAddresses(address0, address1) {
        return Utils.normalizeAddress(address0) === Utils.normalizeAddress(address1);
    }
};

module.exports = Utils;
