window.TableEffects = class TableEffects {
    constructor(tableEl, options) {
        // If a string is passed, try to find the element in the DOM
        if (typeof tableEl === 'string') {
            this.tableEl = document.querySelector(tableEl) || document.getElementById(tableEl);
        } else {
            this.tableEl = tableEl;
        }

        // Safety check to prevent errors if the element wasn't found
        if (!this.tableEl) {
            console.error("TableEffects Error: Element not found for", tableEl);
            return;
        }

        this.options = options || {};
        this.init();
    }

    init() {
        this.containerEl = this.tableEl.closest(".dt-container");

        this.tableEl.classList.add("tsb-table-effects");

        if (this.containerEl) {
            this.containerEl.classList.add("tsb-table-effects");
        }

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
            this.tableEl.style.setProperty(name, value);

            if (this.containerEl) {
                this.containerEl.style.setProperty(name, value);
            }
        }
    }
}
