[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/bsunderhus/html-module-loader/badge.svg?branch=master)](https://coveralls.io/github/bsunderhus/html-module-loader?branch=master)
[![Build Status](https://travis-ci.com/bsunderhus/html-module-loader.svg?branch=master)](https://travis-ci.com/bsunderhus/html-module-loader)
[![NPM Link](https://badgen.net/npm/v/html-module-loader)](https://www.npmjs.com/package/html-module-loader)

<div align="center">
  <img width="200" height="200" src="https://worldvectorlogo.com/logos/html5.svg">
  <img width="200" height="200" vspace="" hspace="25"
    src="https://seeklogo.com/images/J/javascript-js-logo-2949701702-seeklogo.com.png">
  <h1>
  <a rel="noopener" target="_blank" href="https://github.com/w3c/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md">HTML Module</a> Loader
  </h1>
  <p>Exports HTML files as in <a rel="noopener" target="_blank" href="https://github.com/w3c/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md">HTML Module</a> proposal<p>
  <p>
    This module is just to put in practice a concept, <strong>DO NOT</strong> use it in production.
  </p>
</div>

# Install

```bash
# npm
npm i -D html-module-loader
# yarn
yarn add --dev html-module-loader
```

# Usage

```js
{
  test: /\.html$/,
  use: {
    loader: 'html-module-loader',
    options: {
      minify: true
    }
  }
}
```

# Options

```ts
// src/index.ts
import { OptionObject } from 'loader-utils'
import { Options as HTMLMinifierOptions } from 'html-minifier'

export interface Options extends OptionObject {
  minify?: boolean | HTMLMinifierOptions
}
```

## minify

By default `true` in production and `false` in development.

It also accepts an object equivalent to the options passed to the [html-minifier](html-minifier-options) package

# [HTML Module](html-module-explainer)

HTML modules is a proposal to add html files as part of the [ES Modules](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/).

The idea is to enable developers to incorporate code that depends on markup (very common with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)) easily into the JS flow. For example:

```html
<!-- ./HTML5-Element.html -->
<template id="html5ElementTemplate">
  <style>
      .outerDiv {
          border:0.1em solid blue;
          display:inline-block;
          padding: 0.4em;
      }
      .devText {
          font-weight: bold;
          font-size: 1.4em;
          text-align: center;
          margin-top: 0.3em;
      }
      .mainImage {
          height:254px;
      }
  </style>
  <div class="outerDiv">
      <img class="mainImage" src="https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png" />
      <div class="devText">HTML Modules Are Great!</div>
  </div>
</template>
<script type="module">
  const template = import.meta.document.getElementById("html5ElementTemplate")
  export default class HTML5Element extends HTMLElement {
      constructor() {
          super()
          this.attachShadow({ mode: 'open' })
          .appendChild(template.content.cloneNode(true))
      }
  }
</script>
```

```js
// ./main.js
import HTML5Element from './HTML5-Element.html'

customElements.define("html5-element", HTML5Element)
```

The ```import.meta.document``` refers to the document that represents the HTML file itself, it is not equivalent to ```document```, as stated in the [HTML Module explainer](html-moduler-explainer).

This loader uses [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) to parse the file as whole into a [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)

[html-module-explainer]: https://github.com/w3c/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md
[html-minifier-options]: https://github.com/kangax/html-minifier#options-quick-reference
