import { isDev, paths } from '../store';
import { config } from '../../config';

/**
 * Плагин webpack экспортирует HTML как строку
 *
 * @see https://webpack.js.org/loaders/html-loader/
 * @see https://github.com/webdiscus/pug-loader
 */

export const pug = {
    test: /\.pug$/,
    use: [
        {
            loader: '@webdiscus/pug-loader',
            options: {
                compileDebug: true,
                esModule: true,
                basedir: paths.src.base,
                data: {
                    isDev: isDev(),
                    prefix: config.html.publicPath,
                    publicPath: config.html.isProd() ? config.html.publicPath : config.html.publicPathDev,
                },
            },
        },
    ],
};
