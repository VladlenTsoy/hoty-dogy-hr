/**
 * @see https://github.com/maugenst/zip-a-folder
 */

const path = require('path');
const { zip } = require('zip-a-folder');

const cwd = process.cwd();
const args = process.argv;
const ext = 'zip';

let name = 'build';

args.forEach((arg) => {
    if (arg.indexOf('name=') >= 0) {
        name = arg.split('=')[1] || name;
    } else if (arg.indexOf('v=') >= 0 && name === 'build') {
        name += `-v${arg.split('=')[1] || 0}`;
    }
});

(async () => {
    await zip(path.resolve(cwd, 'build'), `${path.resolve(cwd)}/${name}.${ext}`);

    console.log(' ');
    console.log('\x1b[32m%s\x1b[0m', `Archive ${name}.${ext} was created.`);
})();
