/**
 * @see https://github.com/isaacs/rimraf
 */

const path = require('path');
const rimraf = require('rimraf');

rimraf(path.resolve(process.cwd(), 'build'))
    .then(() => {
        console.log(' ');
        console.log('\x1b[32m%s\x1b[0m', 'Build folder was removed.');
    })
    .catch((error) => {
        console.log(' ');
        console.log('\x1b[31m%s\x1b[0m', `Removing error: ${error}`);
    });
