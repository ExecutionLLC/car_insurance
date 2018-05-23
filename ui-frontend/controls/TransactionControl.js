sap.ui.define([
    "personal/account/controller/FragmentControl"
], function(FragmentControl) {
    "use strict";

    /**
     * My class
     *
     * @public
     * @extends sap.ui.FragmentControl
     */
    var TransactionControl = FragmentControl.extend("sap.ui.TransactionControl", {

        /**
         * @override
         */
        getFragmentName: function() {
            return "personal.account.fragments.TransactionControl";
        },

        /**
         * Handle the change event
         * @param {sap.ui.base.Event} oEvent - the change event
         */
        onChange: function(oEvent) {
            var sValue = oEvent.getParameter("value");
            var oText = this.byId("myText");
            oText.setText(sValue);
        },

        renderer: {}
    });

    return TransactionControl;
});