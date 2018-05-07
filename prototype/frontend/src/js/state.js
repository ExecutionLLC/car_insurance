const AppState = (() => {
    let currentWallet = null;
    let currentPerson = null;
    let currentNpfs = [];

    return {
        setWallet(wallet) {
            currentWallet = wallet;
        },
        setPerson(person) {
            currentPerson = person;
        },
        setNpfs(npfs){
            currentNpfs = npfs;
        },
        getWallet() {
            return currentWallet;
        },
        getPerson() {
           return currentPerson;
        },
        getNpfs(){
            return currentNpfs;
        },
        addNpf(npf){
            currentNpfs.push(npf);
        }
    }
})();