sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "personal/account/model/Model",
    "sap/m/MessageBox",
    "personal/account/util/Const",
    "personal/account/util/Utils",
    "personal/account/util/API",
], function (UIComponent, JSONModel, Model, MessageBox, Const, Utils, API) {
    "use strict";

    var $ = {
        ajax: function(opts) {
            var isNPFs = /\/npfs/.test(opts.url);
            var isPerson = /\/person1\//.test(opts.url);
            console.log('Component ajax', opts, isNPFs, isPerson);

            if (!isPerson && !isNPFs) {
                return jQuery.ajax(opts);
            }

            var doneF = function() {};
            var failF = function() {};
            var alwaysF = function() {};
            var res = {
                done: function(f) {
                    doneF = f;
                    return res;
                },
                fail: function(f) {
                    failF = f;
                    return res;
                },
                always: function(f) {
                    alwaysF = f;
                    return res;
                }
            };

            setTimeout(
                function() {
                    if (isPerson) {
                        doneF({
                            "npf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd",
                            "ic": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A",
                            "tariff": 6,
                            "balance": 78650,
                            "operationsHistory": [
                                {
                                    "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705",
                                    "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A",
                                    "tariff": 4,
                                    "timestamp": 1483203600000,
                                    "amount": 5400,
                                    "contractor": "ЗАО Бульдозер",
                                    "comment": "Поступление пенсионных взносов",
                                    "transactionHash": "0x3e1da2282d7cb42a6d1591d4adef62111dc8edc5ba44777bc1367ddd6f25ce5b"
                                },
                                { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 4, "timestamp": 1485882000000, "amount": 5400, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0xe7359238cb9e0527d3e78a6d8ab84ccc3c3625b1ca78e39a178128719b74f5d4" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 4, "timestamp": 1488301200000, "amount": 5400, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0x6c55e0e66843cddadebc3ce5b8c8ea2b9f9f3c10eeec9bf8b5c5d4876ec8d292" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 4, "timestamp": 1490979600000, "amount": 5400, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0xb9ceb81ab5de1b298a3fffe6f9e8c4a31c6b3760918d064fa9688f468ef8334f" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 4, "timestamp": 1493571600000, "amount": 5400, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0xfa5e08aa8263e8a7505ee5f9d544e7c4a9a5cab6547b5a7116192e22c2abd33b" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 4, "timestamp": 1496250000000, "amount": 5400, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0xc2afffef52ad80ee8e55c5d567d9f1968adf3dec43a3809c33d1c0899c512f25" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 5, "timestamp": 1498842000000, "amount": 6750, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0x0525361af574c5848347a9a60c3d931f6a5045ae6bfd6158c0ca617effa43b6b" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 6, "timestamp": 1501520400000, "amount": 8100, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0x213044b4dcb968f896ec9c5c9d73b69b21bd16295e28d64c1100d4a9b53ed257" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "tariff": 6, "timestamp": 1504198800000, "amount": 8100, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0xd9033b92730af6ee7f6cd36cacf50e880b1d467265e81ff182e8add1f1a372aa" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "tariff": 6, "timestamp": 1506790800000, "amount": 8100, "contractor": "ЗАО Бульдозер", "comment": "Поступление пенсионных взносов", "transactionHash": "0x49f43c99423fe4dbc7c0ac05ff8cb0d586a2386cebff6ca38a5256d0d6e1eba1" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "tariff": 5, "timestamp": 1506790800000, "amount": 2250, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0xd45acbfc8f22ae042ff752e852853f250c24aeb0303929bd6958778aeea2b904" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "tariff": 4, "timestamp": 1509469200000, "amount": 1800, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0x225597ef192eca92bfea9726059c762aa2dfb923fbcc6101715d355c42ed0193" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "tariff": 3, "timestamp": 1512061200000, "amount": 1350, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0x5092ed3b2b676fb78c658c54e776c5efe75911a81b4d93f4ce28b5aaeba72a0f" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "tariff": 4, "timestamp": 1514739600000, "amount": 1800, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0x10fde5259421a9e348c7d1da4772d2adbba9aac4206f150583c1460d9cd66154" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "tariff": 4, "timestamp": 1517418000000, "amount": 2000, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0x6bab213159534e05e1efaa0641ca1250082c3102e6d59d73a3bce184eba7d73a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "tariff": 6, "timestamp": 1519837200000, "amount": 3000, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0x16960b0537fdf39ef62eb92c1fec47574a43f58cfe36db280389924af8acf19a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "npf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "tariff": 6, "timestamp": 1522515600000, "amount": 3000, "contractor": "ПАО Металург", "comment": "Поступление пенсионных взносов", "transactionHash": "0x4cb31ee1b75b497916642484a7a9433203c04f777ab6042c2a95afda5a0a68e7" }
                            ],
                            "pendedOperations": [],
                            "tariffHistory": [
                                {
                                    "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705",
                                    "oldTariff": "4",
                                    "newTariff": "5",
                                    "timestamp": 1497373200000,
                                    "transactionHash": "0x4decfd4368f8db071b99dc4831957385d50f4a0f44e6e247823eff51ce1995ec"
                                },
                                { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "6", "timestamp": 1499792400000, "transactionHash": "0x05796adfb30710c8ce9449011f4b30278f76850ae49e031e4a32cec61e5ab31d" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "5", "timestamp": 1507045280144, "transactionHash": "0xb04a986cc5022d2d0c7d210699080f249b77540baccda4b75fabcc023d129c36" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "5", "timestamp": 1507045831681, "transactionHash": "0x3ad61d2cd5e87337d49b23753f0478c851e94a540d529a84d39e3e28def6dbab" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507045854807, "transactionHash": "0x0fc3a0dfdbd444b48cba0c34128fd2f07341e05dea76d0d85c5b482f43a91bb9" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "4", "timestamp": 1507045942290, "transactionHash": "0x339b08853ffd625b98db754495212d342b1d95791768c2ac17bf441bb4e6c12c" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507046064954, "transactionHash": "0x1f43b2622b14743542dc141a65b8dd7585d7ec9204511a46a192e6daa1fcd2df" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507046159297, "transactionHash": "0x93b190314a7e7ec1050022c5940fb14aecaed3730f5f0193b27072beab412bd5" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "6", "timestamp": 1507103492917, "transactionHash": "0xaedd92292c0dc2a50da277c983cafed0fd5440d186846361125e896b51607067" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "1", "timestamp": 1507113235608, "transactionHash": "0x414c8e66ee9a5a4efbdb449f86d298290428a84877c8afcb8c96ae9d90f11d9e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "1", "newTariff": "6", "timestamp": 1507121159949, "transactionHash": "0xccb061e85642216ff592bdd9dcc73643565d2243d846439ab50f6aa93f5f2d17" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "5", "timestamp": 1507121419666, "transactionHash": "0x85bad8f4eeaa61e1e074b26f030e3e0673b7ae1661005dcd2c1324ccc75d7df9" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507121862359, "transactionHash": "0xb57b56e177ffc36efc46af70ebb8a76b6e05fea1e928f79fec586fa317690bda" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "6", "timestamp": 1507121933003, "transactionHash": "0xc8484e0624b6cf3a553e6f0e0d45cf1ca0726566052a391d1e61b162ca06e87f" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "3", "timestamp": 1507123055599, "transactionHash": "0xf518a107e3ba5ee1d21df8421b559c4723c752e1dc376fdae8acde42c3245bfe" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "4", "timestamp": 1507123200908, "transactionHash": "0x3502bdf6c82902dc48ef7b042bda1bbbe20434d1f50fcfd8d6ae5f139f5b75f3" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "4", "timestamp": 1507123212997, "transactionHash": "0xcc6457881323b0386b0399d6e6c2433f8fa003265d678a54280084772862afbf" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507123505204, "transactionHash": "0xaf0d80864ae196c7d9460310b28a35a35a710d68214e3a3041c2fe4bef2cb521" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507128306157, "transactionHash": "0x7ef124f548a6ff90422731a1f0eeea9ba18d452fd25b34140f1cf434f228888b" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "6", "timestamp": 1507150929015, "transactionHash": "0x924527b1eb5bba84f69a6dee7e276c1a3c90c53502dc55951e0fa99b7687ebdd" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "3", "timestamp": 1507195542636, "transactionHash": "0x6045a9bcc3cc336c8163cd7b72a76fa197e7fd248e0475d9573b059be119ea08" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "4", "timestamp": 1507198256746, "transactionHash": "0x81a8a4c4fddf654092ddcf7fed52c2cffb7a0f1ab0386c0cd8b2da2deedcc493" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507206638088, "transactionHash": "0xe8c07840c3d6e3f26f6f51118da3fbac141b921cd46d9f92e5aa02d3b92d7a3a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507210816754, "transactionHash": "0x618d1493f53f608a75704d6f81b52d8e02769c425454496e688adb9f5a75c2f8" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "3", "timestamp": 1507214204439, "transactionHash": "0xbb2b7771520d3bbf503f0836906ba5c94f8800261d45fcf539475b7433cc48db" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "5", "timestamp": 1507228853177, "transactionHash": "0xaf0e64fee6c23fdabc600521a9b12e627f7ce4433a99b576bd7e708c3204408c" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507229112687, "transactionHash": "0x5e93d8e7c73493f522604021ba0eb7457f4371d870098b7dcd31a07ed816231c" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "3", "timestamp": 1507229245580, "transactionHash": "0x31f5357733eb762d8ca5c389f6043bdecb541df5d6f3b0dccc996b62ca845c33" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "6", "timestamp": 1507234201847, "transactionHash": "0x52db2af8207630735169c899bb11b162f6dff6d26d253172563ef72a4619e633" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "3", "timestamp": 1507274375431, "transactionHash": "0x86699f58288cc623722854d538877e935ab7d2ae35708addb87e63559707b2f0" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "4", "timestamp": 1507281504916, "transactionHash": "0xc5c107561cbfc4c78983acf71f11fdb31d613a375c776913936d99e895cdce9a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507282818658, "transactionHash": "0xdf3056125fd169b6be68111e9313d2bab4ecea6a504cfa7b0ba7ac5858ce7d40" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507286755917, "transactionHash": "0x7c1bf3f5e7475e7707da4d6a7e7ba90a5a3df0bfb8c4db5d36500e6696073827" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507286837377, "transactionHash": "0x6ecdb02f087fcbc9d14f3bfced16ab7500014eb4dab8e381f7f898a4a4d1cf77" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507286963466, "transactionHash": "0xae72014ecca31b273756f7a41eeb16deebb500265e98a400ddf713aaa74403a4" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "6", "timestamp": 1507297565924, "transactionHash": "0xe159d9181cd67816c696d0f9a1b3d45a82df043e44fb32e27fe10be7e15e3dfd" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "5", "timestamp": 1507304493323, "transactionHash": "0xc77957301b009e538997126ac779801f22ca44bc21967375bf5d0e2f500b8999" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507462634050, "transactionHash": "0x3ceb8b2483027196ae9a11642b06891000b2e946b42789e2159c7b9ddf1cf904" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507462743430, "transactionHash": "0x775322ad9f72fd3a1b44bc13bd300f9df0e82d7e3578d72f3ceff06858cb21af" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1507541543298, "transactionHash": "0x62282ef1c85b207b673b6ee59dbfe708b1d94a25829d98d2d828d5df16d3cf5d" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1507574822005, "transactionHash": "0x3f5bbfdf4db8de31e106800e48222d57b6094fe9285d85eaa983a6abb22ae2f7" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "6", "timestamp": 1507636792814, "transactionHash": "0x0fccf5badadea5ce1ec54a2be28827d87662750b171134d6b8decdba99fffc4e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "5", "timestamp": 1509516366844, "transactionHash": "0x85e36086f171e11f116dd1b80fbcec568c680d8be94e20837f098a0ae6cbcfa7" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1509517409124, "transactionHash": "0x2690ee3f682d3454c4a924590ddbeabf5806bec50605831afbc7931981e36f85" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1509517437860, "transactionHash": "0x38733ddb579dd6ed6ce5c7ce4c2e812b2197a602f9a60143781076a387da3c34" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1509517791972, "transactionHash": "0x1a49e6955ff0f03e174568d62b1d4f4dd0f5a439f31c91c0e366c04af03d8c1a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1509517848630, "transactionHash": "0x4ddea96676ebae6126feaf846fdcbdeb04d34019259aa196f912c6aaa7d8edc1" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "6", "timestamp": 1509613537145, "transactionHash": "0x2d0dcc24b63869cb459b4c0db0ae63da18df935ec7edb17cdec4b1c426894359" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "5", "timestamp": 1509613617490, "transactionHash": "0x19b4854f93625004d875cd8fde2760dec3e14a2e9b927ed618bd62cca708e082" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1509613758347, "transactionHash": "0x806285449f93945cd6d5a152405565ed4bb13aac003d351ecb27afdd25557107" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "5", "timestamp": 1509626437851, "transactionHash": "0xb480e8be059dc5f42b130f54ba2cebc4cf4601b8875641e91eed4fb3213d3565" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1510031170018, "transactionHash": "0x923033538cc5850a05c637fa8c4b2562699d992d1a6af892edf7817e32c98a12" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "3", "timestamp": 1510031382102, "transactionHash": "0xe751290353bdbc2763d2643cbe069744420886a4ea93bcc78849ef70fe17fce4" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "6", "timestamp": 1510031699344, "transactionHash": "0xad646018c0725e94d51e14c1b98f940d9ddef6fecd253780d897f02a841e939a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "6", "newTariff": "3", "timestamp": 1510032958523, "transactionHash": "0x22877d803c874ecb4795b3a01d6634ce10fe89685ba3d53c5692ca88e2643272" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "5", "timestamp": 1505840400000, "transactionHash": "0x805cf720bf16b8389ed59da5c7620d61956f4122eb853139bcc17f19032c27a8" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "5", "newTariff": "4", "timestamp": 1508432400000, "transactionHash": "0x2f3ec4c46af7386f807062c4fc0f3bbb28701cc61753d991db5ff45f147d48f5" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "3", "timestamp": 1511110800000, "transactionHash": "0x9c351ac2f794e4e6d97106d9e3b60da9f6e802be466f0e1399a8df92a3b7554d" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "3", "newTariff": "4", "timestamp": 1513702800000, "transactionHash": "0xbae91a119f3c5814557d0b8368ae84910d47ec2f92790eab90696c073c70f9d3" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldTariff": "4", "newTariff": "6", "timestamp": 1519059600000, "transactionHash": "0xf42b0eb7659b7361aa1e3146d31e51275bfc55c836ec354f4c7bd3b60e00f904" }
                            ],
                            "pendedTariffChanges": [],
                            "npfHistory": [
                                {
                                    "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705",
                                    "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A",
                                    "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86",
                                    "timestamp": 1503075600000,
                                    "transactionHash": "0x852a86b547d92c021608c9199f8c89b78e153af4154cb55cdd748ce238513dc0"
                                },
                                { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507157587838, "transactionHash": "0xfb2cf6032c13c62e3bd384b9a598df991152456c11d57f6b47fffb156c60f085" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507157869159, "transactionHash": "0x15ab714572158dcf86d74ad005e0da69bc101ff249136a081212162cd1cadca5" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507158603519, "transactionHash": "0x59bf6a768d1725f2c97bbdcdb50f03b7632f0db4ded99350446c2b0ed312421d" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507158829893, "transactionHash": "0x6907cc38be2e14fe59322126f6271a229e5d3fb67153081293f372426093f4ce" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507159052914, "transactionHash": "0xa77d9ead67c60e062ca5396b999c51961b5e44a7a05e607ac1f83e511eb7f0df" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507160663274, "transactionHash": "0xd6072a8a51dcffbb8acfa9daf8eca553402015a9ccf8dc558f209b8e1e46ec04" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507160762934, "transactionHash": "0x70cd1274d4dd8283a78e538f530879e38ed08c193a7457fa3a0dae6054638faf" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507160846760, "transactionHash": "0xa368b855260ad2f21ff9eb04c115de2198e5888c90513553d18409079853f816" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507160937061, "transactionHash": "0x7047a8347870a21e73642ba8c135cdc6ea8c8774450057cc56705c6b8bf7403a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507161242881, "transactionHash": "0xdefe2cf6381e2a801fc82515ebe0b875b1d3b4485f15545eb931f1dc5e067651" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507162047503, "transactionHash": "0xa62fcf37938ad3fc9f3776c9616caa8335a4cb7feeb8cee12a4a7c4179ed9dba" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507162230881, "transactionHash": "0xff731060e5407952bcc736f0940da40f571778722567f49e82fdc6cc63b82fd2" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507162293525, "transactionHash": "0xb02e0b91964ed2fd01a72a68b6783704dc92a6c0e234592afe1ee25d7204ce70" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507162382802, "transactionHash": "0x4dbeb29e039012d6d03ef4e4debb2590d00aa32e7b514dd72d1d6733fb09e42d" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507162408392, "transactionHash": "0xae2b44c3d850af6b3ec82cc923f25df4597ee7af91b716ce1cd1f98cc43fa0be" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507162555013, "transactionHash": "0xa0564d6a7c359e76fda63d0dcec5f22d1a28386ecd7f1439884e0c2312f9267e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507162656371, "transactionHash": "0xdfd24f36078b8b3ad6e08a3536850599e4820df18f7ae0f419fd20812f978974" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507163961048, "transactionHash": "0x3c8e77ef2a18bdd6599d7ee05b7a38c8a58983a11e421ec05c25f6bf955ae5f3" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507180850995, "transactionHash": "0xbd74c9ed0975db59cd375902990e5864c8eae40f138485bf18c0760a2dcf9164" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507181034903, "transactionHash": "0x82906bd8a40c8095a5f7c07d0480aba4fb170eb46aad7b987a84807435b453bc" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507189663527, "transactionHash": "0x79f2e0983221107a2e0b9004575b2a782812eb426511a129590b0036103457b0" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507189854436, "transactionHash": "0x25a72f81f0e449611ffb08639e432424355cfd6c30fc2960bd96559c5b063800" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507194097655, "transactionHash": "0xd2009eac1449e520d7926650c9848b5d7e1e5cd64f372e068927c935e022ac78" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507195472007, "transactionHash": "0x89754d45dd7aed7779f621bb98bde58205b737b594a9e4a99d8df8fa3d88d7b1" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507198442114, "transactionHash": "0x5335663b0a18ab906032136fa64225a4f1491cc639434bb30d0768dc93e2293e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507205632604, "transactionHash": "0x98e81f14d232fe78e7330053767b47b858b7f65f9e441873a624394de15de8f2" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507210551059, "transactionHash": "0x29eea8bf17078d887d385545a27f2d384e244fe39a8918f2f75c167f63621b17" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507218522769, "transactionHash": "0x89c0df5cfb59b38e9df3ccc12bf1f06938bac8af9ae7739c6f471f2a52d84a0b" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507219209264, "transactionHash": "0xc93fe5bd493d7f343017f627c6c1ddb8df82fbf9fa57f01758f7fb50dc861c87" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507225129305, "transactionHash": "0xfd97c28d7c8ec36d5681f8836649726ce91b25a463f47ccb53026551e3b4900e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507225265104, "transactionHash": "0x064f5956e4be8290513b1e373866dfaa44bb6f03923086cf9f41c31083fcdf94" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507225712209, "transactionHash": "0x02cc67f90b15548b5df377cfd278609c85875b51dfd304bac88d12fb0b7e3844" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507229538522, "transactionHash": "0xb29e7ec78e49b4e646deabf19cc19b88cefa0e61cd5f10b23d9838600a228a2e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507274393897, "transactionHash": "0xfdcdc9512916931c8105b322e7f179b7ac635e62da0ea0c3e64355a55ad92921" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507274604046, "transactionHash": "0x694046c77c24ee61b6b79e598853e96905b992927efc9b006aa807cb9d524000" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507275200375, "transactionHash": "0x6c59f4262b19dc240b6c616500fc5a98c3c61fe75a55e5adb0f4a20d2e54da83" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507280051989, "transactionHash": "0x4954770e32fbb66915ebe2e9f2b502fd17d5f41f75c26333e998b963c22099ba" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507283031990, "transactionHash": "0xd7e87fe7643acf820842a81031262966e8290383f1079b5bdb15766a0f6e121f" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507295992191, "transactionHash": "0x701bd1ee31b77f3f09635c2fd56481b88e47e8f9f60a92a9ab6b4c16eedfdc3a" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1507298262680, "transactionHash": "0x7d0b8ced15d5bee42c301e2805af9d172e3b4fe88fa45e564f0803164f696621" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507299899942, "transactionHash": "0x9199658f24417a989cbbbd4719cd4c93d4297bec74c5045b5d21a3423eaa52c6" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507304558769, "transactionHash": "0x983b353f64e5a5d07ecae524f2f03a430766e4503b747511f529a703b75732d8" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507322523111, "transactionHash": "0xd3dd44b25955fda504384c9bac85ed73dd0aed50ce8bb353cf30d4a399168962" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507541573638, "transactionHash": "0x5ec2ed249f2664520f5358447985a1252c94a05c0130831f84308342bdccb16e" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507550574086, "transactionHash": "0x6d6f7c7fcd3647efd8b55c6f26243d20e051c179600a650132db332eda4feaa2" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1507550708921, "transactionHash": "0xa3ac75d14ae66a8ef74e38666c3e45b7e0ddce60215f75f01ae1566b80344726" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1507550859869, "transactionHash": "0x6da7ecdd029f5b8d19904710caf6a3c625f215f2d91754371fc46a3437315084" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1507574915451, "transactionHash": "0xe80e8737ce84acbe3a03c11e55dd2567c0268dc00c6f58ed9ec69e470db13ea3" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1507575042900, "transactionHash": "0x68f915bcec10ddbede5ed9fcb1250a1614dee96fd5553b716d7ce57b546d5254" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1509516210027, "transactionHash": "0x74e5e6d158bb2990e15dfc4c64effb09713229f48e0ba263214d9f5e5f24cd88" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "timestamp": 1509517612114, "transactionHash": "0x49c03d4cd894d7010e5639b25b6ab56606301262bcbb67493f17d6d33af9b976" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1509517904725, "transactionHash": "0x88991f50b4ffb3083f09b0f9f2b03ecd96fda3da877f0089ddd5fcce2c79bd89" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1509536408598, "transactionHash": "0xe36817d168fb41e794d5b59a0d26f38defaeb6e039e437b970b2c594080a3665" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1509613576847, "transactionHash": "0xfdc1153a05a7a9ca6b9107dea5e264080356e86bdf95eaaf52e2bff424d4c28f" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1509613826959, "transactionHash": "0x9ffa320d7a899e52e0d8adbfe585bfb813070ecaf3f2a0a5732ec080ecaae76b" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1510031269460, "transactionHash": "0x465f439483e9b90f079cb2a5372a3ebc9dcd9fcce069e18edf105f4ed7256bde" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1510031493421, "transactionHash": "0x2b27d75dc59f2baacd5b00dcf4f68ff9c63ab84ab4b459d2bfcb9f7fde823619" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "timestamp": 1510031853855, "transactionHash": "0x58bbc1e606fd40ce3edbf131f3359b7239e2f794557cba19e207f67dd13c1ac2" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xe272DacD9d924dC92153A6784144fC0D67F5e916", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1511453591795, "transactionHash": "0xf9a1f84ea04dd0afa9acfef2521be7a49b357e1fa7a54f1d9a540928fc43a5ec" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1474304400000, "transactionHash": "0xacc4fd0ee953a57f09d1ac970bd0938b5956fa119d2215ade4940152747bf2e4" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "newNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "timestamp": 1474304400000, "transactionHash": "0x2db30246d1ea47ceafefe440dbd7a9abbd271f757f1a7ffd6a63bab007737b2d" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A", "newNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "timestamp": 1474304400000, "transactionHash": "0xc18a2797983f72254fab15317e11fcf5b3f6d6c46c269e8e2333385648a7ea11" }, { "owner": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705", "oldNpf": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6", "newNpf": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd", "timestamp": 1474304400000, "transactionHash": "0x7dc89ded8ed02c74b7570604fa1a033077018f9930dc929001e13b8ac3ed0261" }
                            ],
                            "pendedNpfChanges": [],
                            "metadata": {
                                "firstName": "Иван",
                                "middleName": "Иванович",
                                "lastName": "Иванов",
                                "birthDate": 536544000000,
                                "address": "0x9f9Ab182497dF87086Fef3DfC7c54B66Fa9b6705",
                                "email": "ivan@example.com",
                                "snils": "00000000101"
                            },
                            "pensionForecast": "23270.25"
                        });
                    } else if (isNPFs) {
                        doneF(
                            [
                                {
                                    "id": 1,
                                    "name": "АО НПФ БанкФонд",
                                    "address": "0x2e1FF243484C3b4887b6416cdb29b06cf788065A",
                                    "ratingOfReliability": 22,
                                    "ratingOfIncomeRate": 7
                                },
                                {
                                    "id": 2,
                                    "name": "АО НПФ НефтьФонд",
                                    "address": "0xf7102C7f9AFD041176240dA98072DB49f1398cF6",
                                    "ratingOfReliability": 21,
                                    "ratingOfIncomeRate": 8
                                },
                                {
                                    "id": 3,
                                    "name": "АО НПФ ТяжМашФонд",
                                    "address": "0xfC9e006d9488F15EA251DFBD8522EAd5ad01ADCd",
                                    "ratingOfReliability": 20,
                                    "ratingOfIncomeRate": 9
                                },
                                {
                                    "id": 4,
                                    "name": "АО НПФ Оборона",
                                    "address": "0xe272DacD9d924dC92153A6784144fC0D67F5e916",
                                    "ratingOfReliability": 22,
                                    "ratingOfIncomeRate": 7
                                },
                                {
                                    "id": 5,
                                    "name": "АО НПФ Флокс",
                                    "address": "0xAfc13cF7755B0EC2f190F63845e1A2C2667dbB86",
                                    "ratingOfReliability": 22,
                                    "ratingOfIncomeRate": 9
                                }
                            ]
                        );
                    } else {
                        failF(null, 'textStatus', 'errorThrown');
                    }
                    alwaysF();
                },
                1000
            );

            return res;
        }
    };

    return UIComponent.extend("personal.account.Component", {
        metadata: {
            manifest: "json"
        },
        init: function () {
            this.setModel(new JSONModel(), "personModel");
            this.setModel(new JSONModel(), "mainModel");
            this.setModel(new JSONModel(Model.modelStructure), "techModel");
            this.setModel(new JSONModel(), "npfModel");
            this.setModel(new JSONModel(), "icModel");
            this.setModel(new JSONModel(), "operationsModel");

            this.setLanguages();

            UIComponent.prototype.init.apply(this, arguments);
            this.getRouter().initialize();

            var lastUserId = Utils.getLastUserId();
            if (lastUserId) {
                this.initModels(lastUserId);
            }
        },
        receiveOperations: function() {
            var oPersonModel = this.getModel("personModel");
            var oOperationsModel = this.getModel("operationsModel");
            var userId = oPersonModel.getProperty("/id");
            return API.getPersonOperations(userId)
                .then(function(operations) {
                    oOperationsModel.setData(operations);
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.error("Cannot get operations: textStatus = ", textStatus, ", error = ", errorThrown);
                    MessageBox.error(sErrorText);
                });
        },
        initModels: function (userId) {
            if (this.updateTimeoutId) {
                clearTimeout(this.updateTimeoutId);
                this.updateTimeoutId = null;
            }
            var sErrorText = this.getModel("i18n")
                    .getResourceBundle()
                    .getText("msg.box.error");

            var oPersonModel = this.getModel("personModel");
            var oMainModel = this.getModel("mainModel");
            var oTechModel = this.getModel("techModel");
            var oNpfModel = this.getModel("npfModel");
            var oICModel = this.getModel("icModel");

            var scheduleNextUpdate = this.scheduleNextModelsUpdate.bind(this);

            var self = this;

            jQuery.when(
                API.getPerson(userId),
                API.getInsuranceCompanies()
            ).then(function(personInfoResult, insuranceCompaniesResult) {
                oICModel.setData(insuranceCompaniesResult[0]);
                oPersonModel.setData(personInfoResult[0]);
                self.receiveOperations()
                    .then(function() {
                        scheduleNextUpdate();
                    });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                MessageBox.error(sErrorText);
            });

            $.ajax({
                url: Utils.getPerson1InfoUrl(userId),
                dataType: "json"
            }).done(function (person1InfoResult) {
                $.ajax({
                    url: Utils.getNpfsUrl(),
                    dataType: "json"
                }).done(function (npfsResult) {
                    oNpfModel.setData(npfsResult);
                    oMainModel.setData(person1InfoResult);
                    oTechModel.setProperty("/tech/changeTariffTab/selectedTariff", oMainModel.getData().tariff);

                    Utils.saveLastUserId(userId);
                }).fail(function (jqXHR, textStatus, errorThrown) {
                    console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                    MessageBox.error(sErrorText);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, "error = ", errorThrown);
                MessageBox.error(sErrorText);
            });
        },
        updateModels: function () {
            var oMainModel = this.getModel("mainModel");

            var snils = oMainModel.getProperty("/metadata/snils");

            var onAlways = this.scheduleNextModelsUpdate.bind(this);
            $.ajax({
                url: Utils.getPerson1InfoUrl(snils),
                dataType: "json"
            }).done(function (result) {
                oMainModel.setData(result);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, "error = ", errorThrown);
            }).always(onAlways);
        },
        scheduleNextModelsUpdate: function () {
            this.updateTimeoutId = setTimeout(this.updateModels.bind(this), Const.ASYNC_UPDATE_TIMEOUT);
        },
        setLanguages: function () {
            var lang = Const.LANG;
            if(lang) {
                sap.ui.getCore().getConfiguration().setLanguage(lang);
            }
            var sText = this.getModel("i18n").getResourceBundle().getText("title");
            document.title = sText;
        }
    });
});