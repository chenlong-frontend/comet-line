/*
 * @Description: dev rollup config
 * @Author: chenlong
 * @Date: 2021-03-22 16:56:57
 * @LastEditTime: 2021-03-22 18:47:17
 * @LastEditors: chenlong
 */
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import resolve from 'rollup-plugin-node-resolve'
import serve from 'rollup-plugin-serve';

const license = `/*!
 * Released under the ISC License.
 */`

export default [
  {
    watch: {
      include: 'index.js',
    },
    input: 'index.js',
    output: [
      {
        format: 'umd',
        name: 'Comet',
        file: 'dist/comet.js',
        plugins: [terser()],
        sourcemap: true
      },
    ],
    plugins: [
      serve({
        contentBase: './',
        historyApiFallback: true,
        host: 'localhost',
        port: 8888,
      }),
      resolve({
        customResolveOptions: {
          moduleDirectory: 'node_modules',
        },
      }),
      babel(),
      nodePolyfills(),
    ],
  },
]
