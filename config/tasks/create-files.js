const fs = require('fs');
const path = require('path');

const consoleColors = {
    reset: '\x1b[0m',
    greenText: '\x1b[32m',
    greenBg: '\x1b[42m',
    redText: '\x1b[31m',
    redBg: '\x1b[41m',
};
const isPage = process.argv.includes('page');
const isMixin = process.argv.includes('mixin');

const jsBody = (name) => `function init(container) {
	console.log('${name} init');
}

function destroy() {
	console.log('${name} destroy');
}

function resize() {
	console.log('${name} resize');
}

export default {
	init,
	resize,
	destroy,
};
`

function createFiles() {
    if (!process.argv[2]) {
        return console.error(
            `${consoleColors.redBg}Вы должны указать имя ${
                isPage ? 'страницы' : 'компонента'
            } следующим образом:\n\nnpm run create ${isPage ? 'page' : 'component'}Name\n\n${consoleColors.reset}`
        );
    }

    const requestedPage = process.argv[2];
    const requestedPath = path.join(process.cwd(), 'src', isPage ? 'pages' : 'components', requestedPage);
	const scssImport = `@import '@${isPage ? 'pages' : 'components'}/${requestedPage}/${requestedPage}';\n`;
	const mixinImport = `include @${isPage ? 'pages' : 'components'}/${requestedPage}/${requestedPage}\n`;

    if (fs.existsSync(requestedPath)) {
        return console.error(
            `${consoleColors.redBg}Ошибка, ${isPage ? 'страница' : 'компонент'} с таким именем уже существует!${
                consoleColors.reset
            }`
        );
    }

    fs.mkdirSync(path.join(requestedPath));
    fs.mkdirSync(path.join(requestedPath, 'images'));

    fs.writeFile(path.join(requestedPath, '/data.js'), '', () =>
        console.log(`${consoleColors.greenBg}Файл data.js - создан${consoleColors.reset}`)
    );

    fs.writeFile(path.join(requestedPath, `/${requestedPage}.js`), jsBody(requestedPage), () =>
        console.log(`${consoleColors.greenBg}Файл ${requestedPage}.js - создан${consoleColors.reset}`)
    );

    fs.writeFile(path.join(requestedPath, `/${requestedPage}.scss`), '', () =>
        console.log(`${consoleColors.greenBg}Файл ${requestedPage}.scss - создан${consoleColors.reset}`)
    );

    fs.writeFile(path.join(requestedPath, `/${isPage ? 'index' : requestedPage}.pug`), '', () =>
        console.log(`${consoleColors.greenBg}Файл ${isPage ? 'index' : requestedPage}.pug - создан${consoleColors.reset}`)
    );

	// add scss import
	fs.appendFile(`${process.cwd()}/src/styles/main.scss`, scssImport, (err) => {
		if (err) {
			return console.error('Ошибка при добавлении текста в файл:', err);
		}
	});

	// add pug mixin import
	if (isMixin && !isPage) {
		fs.appendFile(`${process.cwd()}/src/pug/mixins.pug`, mixinImport, (err) => {
			if (err) {
				return console.error('Ошибка при добавлении текста в файл:', err);
			}
		});
	}
}

createFiles();
