/*
 * @Description: prod rollup config
 * @Author: chenlong
 * @Date: 2021-03-22 16:56:57
 * @LastEditTime: 2021-03-22 17:04:19
 * @LastEditors: chenlong
 */
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import resolve from 'rollup-plugin-node-resolve'

const license = `/*!
 * Released under the ISC License.
 */`

 export default [{
  input: 'index.js',
  output: [
    {
      format: 'umd',
      name: 'Comet',
      file: 'dist/comet.min.js',
      plugins: [terser()],
      banner: license
    }
  ],
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),
    babel(),
    nodePolyfills()
  ]
}]