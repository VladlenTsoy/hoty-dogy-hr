import glob from 'glob';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { isDev, paths, cwd } from '../store';

/**
 * Плагин webpack для упрощения создания HTML
 * файлы для обслуживания пакетов webpack
 *
 * @see https://webpack.js.org/plugins/html-webpack-plugin/
 */

export const HtmlPages = () =>
    glob.sync('{src/pages/*.pug,src/pages/**/index.pug}', { cwd }).map((file) => {
        const name = file.split('pages')[1];
        const dirName = path.dirname(name).substring(1);
        const dir = dirName ? `${dirName}/` : dirName;

        return new HtmlWebpackPlugin({
            template: `${paths.src.pages}${name}`,
            filename: `${dir}${path.basename(name, '.pug')}.html`,
            inject: true,
            minify: {
                collapseWhitespace: !isDev(),
                removeComments: !isDev(),
                removeAttributeQuotes: !isDev(),
            },
        });
    });

// FIX IT!!!
// export const HtmlPages = () =>
// glob.sync(`{${paths.src.pages}/*.pug,${paths.src.pages}/**/index.pug}`, { cwd }).map((file) => {
//     return new HtmlWebpackPlugin({
//         template: file,
//         filename: file.split('pages')[1].substring(1).replace('.pug', '.html'),
//         inject: true,
//         minify: {
//             collapseWhitespace: !isDev(),
//             removeComments: !isDev(),
//             removeAttributeQuotes: !isDev(),
//         },
//     });
// });
