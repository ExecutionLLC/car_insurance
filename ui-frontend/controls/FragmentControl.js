sap.ui.define([
    "sap/ui/core/Control",
    "sap/ui/core/Fragment"
], function (Control, Fragment) {
    "use strict";

    /**
     * https://blogs.sap.com/2017/07/18/create-custom-controls-using-fragments-in-sapui5/
     */

    /**
     * Base class for controls which use XML fragments for rendering
     *
     * @param {string} [width] - optional width of the control, defaults `100%`
     * @param {object} [height] - optional height of the control, defaults to `auto`
     *
     * @public
     * @extends sap.ui.core.Control
     */
    var FragmentControl = Control.extend("sap.ui.FragmentControl", {

        metadata: {

            properties: {

                /**
                 * Fragment controls
                 * @private
                 */
                _aFragmentControls: {
                    type: "sap.ui.core.Control[]",
                    defaultValue: null
                }

            }
        },

        /**
         * Initiate the control
         *
         * @public
         */
        init: function () {
            // load fragment controls
            this._aFragmentControls = this._loadFragmentControls();

            // connect models / enable data binding for fragment controls
            this._aFragmentControls.forEach(function (oFragmentControl) {
                this.addDependent(oFragmentControl);
            }, this);
        },

        /**
         * Load fragment controls
         * @private
         * @returns {sap.ui.core.Control[]} fragment controls
         */
        _loadFragmentControls: function () {
            var vFragment = null;

            var sFragmentContent = this.getFragmentContent();
            if (sFragmentContent) {

                // load fragment content
                var oFragmentConfig = {
                    sId: this.getId(),
                    fragmentContent: sFragmentContent
                };
                vFragment = sap.ui.xmlfragment(oFragmentConfig, this);

            } else {

                // load fragment by name
                vFragment = sap.ui.xmlfragment(this.getId(), this.getFragmentName(), this);
            }

            // ensure array
            var aFragmentControls = Array.isArray(vFragment) ? vFragment : [vFragment];

            return aFragmentControls;
        },

        /**
         * Get fragment name for this control.
         * The fragment name must correspond to an XML Fragment which can be loaded via the module system (fragmentName + ".fragment.xml") and which defines the Fragment.
         * To provide the fragment content directly please override `getFragmentContent`.
         *
         * @public
         * @abstract
         *
         * @returns {string} the fragment name, e.g. some.namespace.MyControl
         */
        getFragmentName: function () {
            // default: fragment for control, e.g. some/namespace/MyControl.js -> some/namespace/MyControl.fragment.xml
            return this.getMetadata().getName();
        },

        /**
         * Get the fragment content for this control as an XML string.
         * Implementing this method eliminates the need to create a `MyControl.fragment.xml` file,
         * so e.g. `return <core:FragmentDefinition xmlns="sap.m" xmlns:core="sap.ui.core"><Input/></core:FragmentDefinition>`
         *
         * If this method returns any non falsey value `getFragmentName` will be ignored.
         *
         * @public
         * @abstract
         *
         * @returns {string} XML fragment
         */
        getFragmentContent: function () {
            // default: undefined
            return;
        },

        /**
         * Get a fragment control by its id
         *
         * @public
         * @param {string} sControlId - the controls id
         *
         * @return {sap.ui.core.Control} - the found control (or a falsey value if not found)
         */
        byId: function (sControlId) {
            return Fragment.byId(this.getId(), sControlId);
        },

        renderer: function (oRenderManager, oControl) {

            if (oControl.beforeRenderer) {
                oControl.beforeRenderer();
            }

            // return immediately if control is invisible, do not render any HTML
            if (!oControl.getVisible()) {
                return;
            }

            // start opening tag
            oRenderManager.write("<div");

            // write control data
            oRenderManager.writeControlData(oControl);

            // write classes
            oRenderManager.writeClasses();

            // end opening tag
            oRenderManager.write(">");

            // render fragment controls (@see sap.ui.fragment.FragmentControl.metadata.properties._aFragmentControls)
            if (Array.isArray(oControl._aFragmentControls)) {
                oControl._aFragmentControls.forEach(function (oFragmentControl) {
                    oRenderManager.renderControl(oFragmentControl);
                });
            }

            // write closing tag
            oRenderManager.write("</div>");
        }

    });

    return FragmentControl;
});
