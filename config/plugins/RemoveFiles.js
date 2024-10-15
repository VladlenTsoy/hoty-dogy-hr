/**
 * @see https://github.com/Amaimersion/remove-files-webpack-plugin
 */

import RemovePlugin from 'remove-files-webpack-plugin';
import { paths } from '../store';
import { config } from '../../config';

export const RemoveFiles = new RemovePlugin({
    after: {
        root: paths.build.base,
        include: config.html.isProd() ? config.build.remove : [],
    },
});
