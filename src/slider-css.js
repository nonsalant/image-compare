/**
* Generates a CSS string for styling the thumbs and tracks of `<input type="range">` sliders.
*
* This method defines CSS rules tailored for different browser engines (`-moz` and `-webkit`) 
* to ensure compatibility. The CSS properties for the slider thumbs and tracks are stored 
* as variables for easier maintenance and reusability.
*/
export function sliderCss() {
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