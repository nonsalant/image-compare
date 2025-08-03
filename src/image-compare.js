import { uiHtml } from './ui-html.js';
import { svgDataProp } from './svg-data-prop.js';
import { sliderCss } from './slider-css.js';
import { appendHtml, wrap, updateCss } from './utils.js';

export default class ImageCompare extends HTMLElement {
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

    // Statically define the element unless ?define=false is set as an URL param
    static tag = "image-compare";
    static define(tag = this.tag) {
        this.tag = tag;
        const name = customElements.getName(this);
        if (name) return console.warn(`${this.name} already defined as <${name}>!`);
        const ce = customElements.get(tag);
        if (Boolean(ce) && ce !== this) return console.warn(`<${tag}> already defined as ${ce.name}!`);
        customElements.define(tag, this);
    }
    static {
        const tag = new URL(import.meta.url).searchParams.get("define") || this.tag;
        if (tag !== "false") this.define(tag);
    }
}
