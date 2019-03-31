import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import { uglify } from 'rollup-plugin-uglify'

export default {
  input: "./src/slide-calculator/index.js",
  output: {
    name: "canvas-slide-calculator",
    file: pkg.main,
    format: "umd",
  },
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ '@babel/env', { modules: false } ]],
    }),
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    uglify()
  ],
};
