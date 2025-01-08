<h1>Accessible <code style="white-space:nowrap;">&lt;image-compare&gt;</code> <span>Web Component</span> <small>(no Shadow DOM)</small></h1>
<ul>
    <li>Using <strong>Light DOM</strong> allows you to style everything with regular CSS</li>
    <li>Horizontally scrollable container used as fallback if JS doesn't load (this also helps reduce CLS by stabilizing the overall height)</li>
    <li>No dependencies</li>
</ul>

<h2>Demo</h2>

[https://codepen.io/nonsalant/pen/gbYRJKd](https://codepen.io/nonsalant/pen/gbYRJKd)

<h2>Usage</h2>

Load the style and the script:
```html
<link rel="stylesheet" href="../src/image-compare.css">
<script src="../src/image-compare.js" defer></script>
```

Use it like this:
```html
<image-compare>
    <img src="before.jpg" alt="">
    <img src="after.jpg" alt="">
</image-compare>
```

<h2>Options</h2>

Control how much of the first image is shown initially by adding an `exposure` attribute (0-100). <br><i>E.g:</i> 
* <code style="font-size:1.2em;">&lt;image-compare <b>exposure="0"</b>&gt;</code> will hide the first image,
* a value of 100 will hide the second image,
* and a value of 50 (default) will show half of each.

<h2>Credits</h2>

<ul>
    <li>Forked from: <a target="_blank" href="https://cloudfour.com/thinks/building-an-accessible-image-comparison-web-component/">image-compare</a> by Paul Hebert for Cloud Four, which <a href="https://github.com/cloudfour/image-compare/blob/main/src/index.js" target="_blank">uses the Shadow DOM</a>.
    </li>
    <li>Inspired by this article: <a target="_blank" href="https://frontendmasters.com/blog/light-dom-only/#you-can-augment-or-replace-the-html-with-whatever">Light-DOM-Only Web Components are Sweet</a> by Chris Coyier.</li>
</ul>
