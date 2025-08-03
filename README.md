<h1>Accessible <code style="white-space:nowrap;">&lt;image-compare&gt;</code> <span>Web Component</span> <small>(no Shadow DOM)</small></h1>
<ul>
    <li>Using <strong>Light DOM</strong> allows you to style everything with regular CSS</li>
    <li>Horizontally scrollable container used as fallback if JS doesn't load (this also helps reduce CLS by stabilizing the overall height)</li>
    <li>No dependencies</li>
</ul>

<h2>Demo</h2>

[https://codepen.io/nonsalant/pen/gbYRJKd](https://codepen.io/nonsalant/pen/gbYRJKd)

<h2>Importing the component files</h2>

### Importing from a CDN
````html
<link rel="stylesheet" href="https://unpkg.com/image-compare-light-dom/image-compare.css">
<script type="module" src="https://unpkg.com/image-compare-light-dom/image-compare.js"></script>
````

### Importing from a local copy

1. Grab the files from the <code>src</code> folder.

2. Load the style and the main script (adjust the paths as needed):
```html
<link rel="stylesheet" href="../src/image-compare.css">
<script src="../src/image-compare.js" type="module"></script>
```

<h2>Usage</h2>

```html
<image-compare>
    <img src="before.jpg" alt="" width="" height="">
    <img src="after.jpg" alt="" width="" height="">
</image-compare>
```

<h2>Options</h2>

Control how much of the first image is shown initially by adding an `exposure` attribute with a value between 0 and 100.

* 0 means the first image is completely hidden.
* 100 means the first image is fully visible.
* 50 means both images are half-shown, half-hidden.

<i>E.g:</i> <code>&lt;image-compare <b>exposure="0"</b>&gt;</code>

<h2>Credits</h2>

<ul>
    <li>Forked from: <a target="_blank" href="https://cloudfour.com/thinks/building-an-accessible-image-comparison-web-component/">image-compare</a> by Paul Hebert for Cloud Four, which <a href="https://github.com/cloudfour/image-compare/blob/main/src/index.js" target="_blank">uses the Shadow DOM</a>.
    </li>
    <li>Inspired by this article: <a target="_blank" href="https://frontendmasters.com/blog/light-dom-only/#you-can-augment-or-replace-the-html-with-whatever">Light-DOM-Only Web Components are Sweet</a> by Chris Coyier.</li>
</ul>
