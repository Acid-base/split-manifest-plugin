# NOT READY!

# Split Manifest Plugin

Webpack plugin for split json files.

## Install

```bash
npm install --save-dev split-manifest-plugin
```

## Usage

In your `webpack.config.js`

```javascript
const SplitManifestPlugin = require('split-manifest-plugin');

module.exports = {
    // ...
    plugins: [
        new SplitManifestPlugin({
            input: './manifest.json',
            output: './assets.json',
            keys: ['key.js', 'key.css']
        })
    ]
};
```
