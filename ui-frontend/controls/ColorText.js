sap.ui.define([
    "sap/m/Text"
], function(Text) {
    "use strict";

    return Text.extend("ColoreText", {
        metadata: {
            properties : {
                "color" : "sap.ui.core.CSSColor"
            }
        },
        onAfterRendering: function() {
            var superOnAfterRendering = Text.prototype.onAfterRendering;
            if (superOnAfterRendering) {
                superOnAfterRendering.apply(this, arguments);
            }
            if (this.getColor()) {
                this.$().css("color", this.getColor());
            }
        },
        renderer: {}
    });
});