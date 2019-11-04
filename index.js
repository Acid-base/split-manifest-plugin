const fs = require('fs');

class SplitManifestPlugin {
    constructor(options) {
        this.name = 'SplitManifestPlugin';
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise(this.name, this.handle.bind(this));
    }

    async handle() {
        this.build();
        this.writeFile();
    }

    build() {
        this.output = Object.entries(require(this.options.input)).reduce((acc, [key, val]) => {
            if (!this.options.keys.includes(key)) return acc;

            if (this.options.path) {
                val = val.replace(/(https:\/\/).+\.(?:net|com)(.+)/, `$1${this.options.path}$2`);
            }

            return {
                ...acc,
                [key]: val
            };
        }, {});
    }

    get result() {
        return JSON.stringify(this.output, '', 2);
    }

    writeFile() {
        fs.writeFile(this.options.output, this.result, err => {
            if (err) throw err;
        });
    }
}

module.exports = SplitManifestPlugin;

