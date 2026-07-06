window.TableEffects = class TableEffects {
    constructor(divEl, options) {
        this.divEl = divEl;
        this.options = options || {};

        this.init();
    }

    init() {
        this.divEl.classList.add("tsb-table-effects");
        this.applyVariables();
    }

    applyVariables() {
        const header = this.options.header || {};
        const rows = this.options.rows || {};
        const hover = this.options.hover || {};

        this.setVar("--tsb-header-bg", header.backgroundColor);
        this.setVar("--tsb-header-color", header.color);

        this.setVar("--tsb-row-bg", rows.backgroundColor);
        this.setVar("--tsb-row-alt-bg", rows.alternateBackgroundColor);

        this.setVar("--tsb-row-hover-bg", hover.backgroundColor);
        this.setVar("--tsb-row-hover-color", hover.color);
    }

    setVar(name, value) {
        if (value) {
            this.divEl.style.setProperty(name, value);
        }
    }
}