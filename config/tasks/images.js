/**
 * @see https://sharp.pixelplumbing.com/
 */

// TODO:
// оптимизация svg

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

const cwd = process.cwd();
const args = process.argv;

const imagesAssetsPath = './src/assets/images';
const imagesComponentsPath = './src/components';
const imagesPagesPath = './src/pages';

let imagesCustomPath = null;
let imagesExts = 'png,jpg,jpeg,gif,avif';
let imagesOutputExt = 'webp';
let quality = 90;
let globPattern = '';

const getPattern = (path) => `${path}/**/*.{${imagesExts}}`;

const convert = () => {
    const imagesDone = [];

    glob.sync(globPattern, { cwd }).forEach((image) => {
        const imageData = path.parse(image);

        if (imagesDone.indexOf(`${imageData.dir}/${imageData.name}`) >= 0) {
            return;
        }

        sharp(image)
            [imagesOutputExt]({ quality: Number(quality) }) // eslint-disable-line
            .toFile(`${imageData.dir}/${imageData.name}.${imagesOutputExt}`)
            .then(() => {
                console.log('\x1b[32m%s\x1b[0m', `Image >>> ${image} - was converted.`);
            })
            .catch((error) => {
                console.log('\x1b[31m%s\x1b[0m', `Conversion error: ${error}`);
            });

        imagesDone.push(`${imageData.dir}/${imageData.name}`);
    });
};

const compress = () => {
    if (typeof quality === 'number') {
        quality = 75;
    }

    const compressionParams = {
        jpeg: {
            quality: Number(quality),
            mozjpeg: true,
        },
        png: {
            quality: Number(quality),
        },
        gif: {},
        webp: {
            quality: Number(quality),
        },
        avif: {
            quality: Number(quality),
        },
    };

    glob.sync(globPattern, { cwd }).forEach((image) => {
        const imageData = path.parse(image);
        const imageExt = imageData.ext.substring(1);
        const sharpExtMethod = imageExt === 'jpg' ? 'jpeg' : imageExt;

        sharp(image)
            [sharpExtMethod](compressionParams[sharpExtMethod]) // eslint-disable-line
            .toBuffer()
            .then((data) => {
                fs.writeFile(image, data, () => {
                    console.log('\x1b[32m%s\x1b[0m', `Image >>> ${image} - was compressed.`);
                });
            })
            .catch((error) => {
                console.log('\x1b[31m%s\x1b[0m', `Compression error: ${error}`);
            });
    });
};

args.forEach((arg) => {
    if (arg.indexOf('quality=') >= 0) {
        quality = arg.split('=')[1] || quality;
    } else if (arg === 'avif') {
        imagesExts = imagesExts.replace('avif', 'webp');
        imagesOutputExt = 'avif';
    } else if (arg.indexOf('path=') >= 0) {
        imagesCustomPath = path.resolve(cwd, arg.split('=')[1]);
    } else if (arg === 'compress') {
        imagesExts += ',webp';
    }
});

if (imagesCustomPath === null) {
    args.forEach((arg) => {
        if (arg.indexOf('only=') >= 0) {
            const argValue = arg.split('=')[1];

            if (argValue === 'assets') {
                globPattern = getPattern(imagesAssetsPath);
            } else if (argValue === 'components') {
                globPattern = getPattern(imagesComponentsPath);
            } else if (argValue === 'pages') {
                globPattern = getPattern(imagesPagesPath);
            }
        }
    });

    if (!globPattern) {
        globPattern = `{${getPattern(imagesAssetsPath)},${getPattern(imagesComponentsPath)},${getPattern(
            imagesPagesPath
        )}}`;
    }
} else {
    globPattern = getPattern(imagesCustomPath);
}

console.log(' ');

if (args.includes('convert')) {
    console.log('Converting...');
    console.log(' ');

    convert();
} else if (args.includes('compress')) {
    console.log('Compressing...');
    console.log(' ');

    compress();
}
