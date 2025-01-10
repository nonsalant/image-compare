import { uiHtml } from './ui-html.js';
import { svgDataProp } from './svg-data-prop.js';
import { sliderCss } from './slider-css.js';
import { appendHtml, wrap, updateCss } from './utils.js';

class ImageCompare extends HTMLElement {
    defaultExposure = 50;
    exposure = this.getAttribute('exposure') || this.defaultExposure;
    inputSelector = 'input[type=range]';
    secondImg = this.querySelectorAll('img')[1];

    constructor() { super(); }
    
    connectedCallback() {
        this.#setPropPercentage('--exposure', this.exposure);
        this.#wrapSecondImg('span', 'image-2-wrapper');
        this.#appendUi();
        this.#inputListeners('exposure');
        // Add CSS (limit to dynamically appended UI to avoid layout shift)
        updateCss(svgDataProp(), 'image-compare-thumb-svg-style');
        updateCss(sliderCss(), 'image-compare-slider-style');
    }

    static get observedAttributes() { return ['exposure']; }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'exposure') {
            const rangeInput = this.querySelector(this.inputSelector);
            if (rangeInput) {
                rangeInput.value = newValue;
                this.#setPropPercentage('--exposure', newValue);
            }
        }
    }

    #setPropPercentage(prop, value) {
        this.style.setProperty(prop, value + '%');
    }
    #appendUi() {
        const rawHtml = uiHtml(this.exposure);
        appendHtml(rawHtml, this);
    }
    #wrapSecondImg(tag, className) {
        wrap(this.secondImg, tag, className);
    }
    #inputListeners(attName) {
        const rangeInput = this.querySelector(this.inputSelector);
        const handleInputChange = () => {
            this.setAttribute(attName, rangeInput.value);
        };
        rangeInput.addEventListener('input', handleInputChange);
        rangeInput.addEventListener('change', handleInputChange);
    }
    
}

customElements.define('image-compare', ImageCompare);
