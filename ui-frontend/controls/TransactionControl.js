sap.ui.define([
    "personal/account/controller/FragmentControl",
    "personal/account/util/Utils",
    "personal/account/formatter/formatter"
], function(FragmentControl, Utils, formatter) {
    "use strict";

    /**
     * My class
     *
     * @public
     * @extends sap.ui.FragmentControl
     */
    var TransactionControl = FragmentControl.extend("sap.ui.TransactionControl", {
        formatter: formatter,

        metadata: {
            properties: {
                transactionHash: "sap.ui.model.type.String",
                transactionFrom: "sap.ui.model.type.String",
                pending: "sap.ui.model.type.Boolean",
            }
        },

        /**
         * @override
         */
        getFragmentName: function() {
            return "personal.account.fragments.TransactionControl";
        },

        beforeRenderer: function() {
            this.byId("hash").setText(this.getTransactionHash());
            this.byId("from").setText(this.getTransactionFrom());
            this.byId("pending").setText(this.formatter.formatNumberOfConfirmations(this.getPending()));
        },

        onLinkPress: function (oEvent) {
            var transactionHash = oEvent.getSource().getProperty("text");
            var langModel = this.getModel("i18n");
            Utils.showMessageBoxTransactionInfo(transactionHash, langModel);
        },

        renderer: {}
    });

    return TransactionControl;
});