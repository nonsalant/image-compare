/**
* Generates an HTML string for a `<label>` containing a visually hidden
* description for screen readers and an `<input type="range">` slider 
* for setting the exposure value.
*/
export function uiHtml(exposure) {
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