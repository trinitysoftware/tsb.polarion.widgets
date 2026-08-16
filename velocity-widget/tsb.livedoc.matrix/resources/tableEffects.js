window.TableEffects = class TableEffects {
    constructor(tableEl, options) {
        // The framework normally passes the generated DataTables container.
        // Accept a selector too, so the effect helper stays reusable in older
        // widget code that still initializes by id.
        if (typeof tableEl === 'string') {
            this.tableEl = document.querySelector(tableEl) || document.getElementById(tableEl);
        } else {
            this.tableEl = tableEl;
        }

        // A missing table should never break the LiveReport page. Log the bad
        // initialization and leave the rest of the widget scripts running.
        if (!this.tableEl) {
            console.error("TableEffects Error: Element not found for", tableEl);
            return;
        }

        this.options = options || {};
        this.init();
    }

    init() {
        this.tableEl.classList.add("tsb-table-effects");

        this.applyVariables();
    }

    applyVariables() {
        const header = this.options.header || {};
        const rows = this.options.rows || {};

        // Widget properties are user-editable strings. Only safe color formats
        // are allowed to become CSS variables; invalid values fall back to the
        // stylesheet defaults already defined for the matrix.
        this.setColorVar("--tsb-header-bg", header.backgroundColor);
        this.setColorVar("--tsb-header-color", header.color);

        this.setColorVar("--tsb-row-bg", rows.backgroundColor);
        this.setColorVar("--tsb-row-alt-bg", rows.alternateBackgroundColor);
    }

    setVar(name, value) {
        if (value) {
            this.tableEl.style.setProperty(name, value);
        }
    }

    isSafeColor(value) {
        const color = String(value || '').trim();
        const hexadecimalColorPattern = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/;
        const rgbColorPattern = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
        const rgbaColorPattern = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0(?:\.\d+)?|1(?:\.0+)?)\s*\)$/;
        const functionalColorMatch = color.match(rgbColorPattern) ||
            color.match(rgbaColorPattern);

        if (hexadecimalColorPattern.test(color)) {
            return true;
        }

        if (!functionalColorMatch) {
            return false;
        }

        // RGB channels are limited to the range accepted by CSS. The alpha
        // pattern above already limits optional RGBA opacity to zero through one.
        return functionalColorMatch.slice(1, 4).every((channel) => {
            return Number(channel) <= 255;
        });
    }

    setColorVar(name, value) {
        if (this.isSafeColor(value)) {
            this.setVar(name, String(value).trim());
        }
    }
};
