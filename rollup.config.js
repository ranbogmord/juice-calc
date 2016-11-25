import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import nodeGlobals from 'rollup-plugin-node-globals'
import alias from 'rollup-plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const plugins = [
    alias({
        vue: 'node_modules/vue/dist/vue.common.js'
    }),
    resolve({
        jsnext: true,
        main: true,
        browser: true
    }),
    commonjs(),
    babel({
        presets: ['es2015-rollup'],
        exclude: ['node_modules/**']
    }),
    nodeGlobals()
];

const config = {
    entry: 'src/main.js',
    format: 'iife',
    dest: 'public/bundle.js'
};

if (process.env.NODE_ENV == 'production') {
    config.sourceMap = false;
} else {
    // plugins.push(livereload());
    plugins.push(serve({
        contentBase: './',
        port: 3000,
        open: false
    }));
}

config.plugins = plugins;

export default config;
