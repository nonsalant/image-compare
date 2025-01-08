class ImageCompare extends HTMLElement {

    defaultExposure = 50;

    #exposure = this.getAttribute("exposure") || this.defaultExposure;
    #inputSelector = 'input[type=range]';
    #secondImg = this.querySelectorAll("img")[1];

    /**
    * Generates an HTML string for a `<label>` containing a visually hidden
    * description for screen readers and an `<input type="range">` slider 
    * for setting the exposure value.
    */
    ui(exposure) {
        return `
		<label>
			<span class="visually-hidden">
				Control how much of each overlapping image is shown.
				0 means the first image is completely hidden.
				100 means the first image is fully visible.
				50 means both images are half-shown, half-hidden.
			</span>
			<input type="range" value="${exposure}" min="0" max="100" />
		</label>`;
    }

    constructor() {
        super();
        this.#setCustomPropPercentage("--exposure");
    }

    connectedCallback() {
        setTimeout(() => {
            this.#wrapSecondImg("span", "image-2-wrapper");
            this.#appendHtml(this.ui(this.#exposure));
            this.#setupInputListener(this.#inputSelector);
            // Add CSS (limit to dynamically appended UI to avoid layout shift)
            this.updateCss(this.svgCss(), 'image-compare-thumb-svg-style');
            this.updateCss(this.sliderCss(), 'image-compare-slider-style');
        });
    }

    static get observedAttributes() { return ["exposure"]; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "exposure") {
            const rangeInput = this.querySelector(this.#inputSelector);
            if (rangeInput) {
                rangeInput.value = newValue;
                this.style.setProperty("--exposure", newValue + "%");
            }
        }
    }

    #setupInputListener(el) {
        const rangeInput = this.querySelector(el);
        const handleInputChange = () => {
            this.setAttribute("exposure", rangeInput.value);
        };
        rangeInput.addEventListener("input", handleInputChange);
        rangeInput.addEventListener("change", handleInputChange);
    }

    #appendHtml(rawHtml) {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = rawHtml;
        while (tempDiv.firstChild) {
            this.appendChild(tempDiv.firstChild);
        }
    }

    #wrapSecondImg(tag, className) {
        this.wrap(this.#secondImg, tag, className);
    }

    #setCustomPropPercentage(prop) {
        this.style.setProperty(prop, this.#exposure + "%");
    }

    wrap(el, tag, className) {
        const wrapper = Object.assign(
            document.createElement(tag), {
            className: className
        }
        );
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
    }

    updateCss(css, id = 'js-added-style') {
        if (document.getElementById(id)) return;
        const styleTag = document.createElement('style');
        styleTag.id = id;
        document.head.appendChild(styleTag);
        styleTag.textContent = css;
    }

    /**
    * Generates a CSS string that defines a `data:image/svg+xml` URL
    * for use as a background image in a custom CSS property.
    */
    svgCss(
        strokeWidth = '4',
        color = 'hsla(0, 0%, 0%, 1)' // any format except hex
    ) {
        const commonAtts = 'stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"';
        const arrowLeftStroke = `"${strokeWidth}" style="stroke: ${color};" ${commonAtts}`;
        const arrowRightStroke = `"${strokeWidth}" style="stroke: ${color};" ${commonAtts}`;
        const dataUrl = `data:image/svg+xml;utf8,`
            + `<svg viewbox="0 0 60 60" width="60" height="60" xmlns="http://www.w3.org/2000/svg">`
            + `<path stroke-width=${arrowLeftStroke}  fill="none" d="M20 20 L10 30 L20 40"/>`
            + `<path stroke-width=${arrowRightStroke} fill="none" d="M40 20 L50 30 L40 40"/>`
            + `</svg>`;
        return `image-compare { --thumb-background-image: url('${dataUrl}'); }`;
    }

    /**
    * Generates a CSS string for styling the thumbs and tracks of `<input type="range">` sliders.
    *
    * This method defines CSS rules tailored for different browser engines (`-moz` and `-webkit`) 
    * to ensure compatibility. The CSS properties for the slider thumbs and tracks are stored 
    * as variables for easier maintenance and reusability.
    */
    sliderCss() {
        const trackStyles = 'height: unset; background: transparent;';
        const thumbStyles = `
			background-color: var(--thumb-background-color);
			background-image: var(--thumb-background-image);
			background-size: 90%;
			background-position: center center;
			background-repeat: no-repeat;
			border-radius: var(--thumb-radius);
			border: var(--thumb-border-size) var(--thumb-border-color) solid;
			color: var(--thumb-border-color);
			width: var(--thumb-size);
			height: var(--thumb-size);
		`;
        const thumbFocusStyles = 'box-shadow: 0px 0px 0px var(--focus-width) var(--focus-color);';
        return `
			/* Styling range inputs requires separately defining the CSS rules for -moz and -webkit. */
			/* ! bug in Safari when trying to nest -moz and -webkit together under the same [type=range] */

			image-compare [type=range] {
				&::-moz-range-track { ${trackStyles} }
				&::-moz-range-thumb { ${thumbStyles} }
				&:focus::-moz-range-thumb { ${thumbFocusStyles} }
			}
			image-compare [type=range] {
				&::-webkit-slider-runnable-track { ${trackStyles} }
				&::-webkit-slider-thumb { ${thumbStyles} -webkit-appearance: none; }
				&:focus::-webkit-slider-thumb { ${thumbFocusStyles} }
			}
		`;

    }

}

customElements.define("image-compare", ImageCompare);
