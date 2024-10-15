/**
 * @see https://webpack.js.org/plugins/define-plugin/
 */

import { DefinePlugin } from 'webpack';

import { config } from '../../config';

export const Define = new DefinePlugin({
    GLOBAL_DOMAIN: JSON.stringify(config.html.domain),
    GLOBAL_PATH: JSON.stringify(config.html.isProd() ? config.html.publicPath : config.html.publicPathDev),
	IS_PROD: config.html.isProd() ? true : false,
});
