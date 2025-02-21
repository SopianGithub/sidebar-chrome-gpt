import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default [
  {
    input: 'src/inject.js',
    output: {
      file: 'out/inject.bundle.js',
      format: 'iife',
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      json()
    ]
  },
  {
    input: 'src/service-worker.js',
    output: {
      file: 'out/service-worker.bundle.js',
      format: 'iife',
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled' }),
      json()
    ]
  }
];