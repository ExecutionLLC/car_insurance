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
            var isPerson = /\/person1\//.test(opts.url);
            console.log('Component ajax', opts, isPerson);

            if (!isPerson) {
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
                oMainModel.setData(person1InfoResult);
                oTechModel.setProperty("/tech/changeTariffTab/selectedTariff", oMainModel.getData().tariff);
                Utils.saveLastUserId(userId);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, "error = ", errorThrown);
                MessageBox.error(sErrorText);
            });
        },
        updateModels: function () {
            var oPersonModel = this.getModel("personModel");
            var userId = oPersonModel.getProperty("/id");
            jQuery.when(
                API.getPerson(userId),
                this.receiveOperations.bind(this)()
            ).then(function(personInfoResult) {
                oPersonModel.setData(personInfoResult[0]);
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.error("Cannot update model data: textStatus = ", textStatus, ", error = ", errorThrown);
                MessageBox.error(sErrorText);
            }).always(this.scheduleNextModelsUpdate.bind(this));
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