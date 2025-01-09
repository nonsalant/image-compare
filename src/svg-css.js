/**
* Generates a CSS string that defines a `data:image/svg+xml` URL
* for use as a background image in a custom CSS property.
*/
export function svgCss(
    strokeWidth = '4',
    color = 'hsla(0, 0%, 0%, 1)' // any format except hex
) {
    const atts = `stroke-width="${strokeWidth}" style="stroke: ${color};" `
        + 'stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="none"';

    // this should be a single line, hence the concatenation
    const dataUrl = 'data:image/svg+xml;utf8,'
        + '<svg viewbox="0 0 60 60" width="60" height="60" xmlns="http://www.w3.org/2000/svg">'
            + `<path ${atts} d="M20 20 L10 30 L20 40"/>`
            + `<path ${atts} d="M40 20 L50 30 L40 40"/>`
        + '</svg>';
    
    return `image-compare { --thumb-background-image: url('${dataUrl}'); }`;
}