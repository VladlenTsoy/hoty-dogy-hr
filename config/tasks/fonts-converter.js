/**
 * @see https://www.npmjs.com/package/@hayes0724/web-font-converter
 */

// TODO:
// флаг - для удаления лишних шрифтов после конвертации
// возможность конвертации из eot

// FIX:
// создание шрифта svg без надобности

const path = require('path');
const glob = require('glob');
const { convertFont } = require('@hayes0724/web-font-converter');

const cwd = process.cwd();
const fontsPath = './src/assets/fonts';
const fontsDone = [];

// console.log(' ');
// console.log('Converting...');
// console.log(' ');

glob.sync(`${fontsPath}/**/*.{ttf,otf,svg}`, { cwd }).forEach((font) => {
    const fontData = path.parse(font);

    if (fontsDone.indexOf(fontData.name) >= 0) {
        return;
    }

    convertFont(font, `${fontData.dir}/${fontData.name}.woff`);
    convertFont(font, `${fontData.dir}/${fontData.name}.woff2`);

    fontsDone.push(fontData.name);

    // console.log('\x1b[32m%s\x1b[0m', `Font ${fontData.name} was converted.`);
});
