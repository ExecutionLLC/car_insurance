function readFileContentAsync(file) {
    if (file.size > 102400) { // 100K JSON wallet will be our limit
        return Promise.reject(`JSON file too big (${file.size} bytes)`);
    } else {
        return new Promise((resolve) => {
            const fr = new FileReader();
            fr.onload = function () {
                resolve(fr.result);
            };
            fr.readAsText(file);
        });
    }
}

function $id(id) {
    return $(`#${id}`);
}


const Validator = {
    walletId(address) {
        if (address.substring(0, 2) !== '0x') {
            return false;
        } else if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
            return false;
        } else {
            return true;
        }
    },
    url(url) {
        return /^https?:\/\/[^/]+/.test(url);
    },
    chainId(chainId) {
        return /^\d+$/.test(chainId);
    },
    privateKey(key) {
        const prefixLength = key.substring(0, 2) === '0x' ? 2 : 0;
        const keyDigits = key.length - prefixLength;
        return keyDigits === 64 || keyDigits === 128 || keyDigits === 132;
    }
};