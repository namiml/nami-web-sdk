import { merge } from 'webpack-merge';
import commonConfig from './webpack.common.js';
import path from 'path';

const __dirname = path.resolve();

export default merge(commonConfig, {
    mode: 'development',
    devServer: {
        static: [
            { directory: path.join(__dirname, 'dist'), watch: true },
            { directory: __dirname, watch: true },
        ],
        compress: true,
        open: true,
        port: 8000,
    },
});
