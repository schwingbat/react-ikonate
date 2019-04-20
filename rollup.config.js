import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.browser,
      format: 'umd',
      name: 'ReactIkonate',
    },
    {
      file: pkg.main,
      format: 'cjs',
      name: 'ReactIkonate',
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    typescript()
  ]
}
