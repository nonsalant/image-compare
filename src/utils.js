export function appendHtml(rawHtml, el) {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = rawHtml;
    while (tempDiv.firstChild) {
        el.appendChild(tempDiv.firstChild);
    }
}

export function wrap(el, tag, className) {
    const wrapper = Object.assign(
        document.createElement(tag), {
            className: className
        }
    );
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

export function updateCss(css, id = 'js-added-style') {
    if (document.getElementById(id)) return;
    const styleTag = document.createElement('style');
    styleTag.id = id;
    document.head.appendChild(styleTag);
    styleTag.textContent = css;
}