import typescript from 'rollup-plugin-typescript2'

export default {
  input: './generated/index.ts',
  output: {
    file: './dist/index.js',
    format: 'cjs'
  },
  external: ['react'],
  plugins: [
    typescript()
  ]
}
