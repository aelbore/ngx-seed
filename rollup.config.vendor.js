const resolve = require('rollup-plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2');

export default {
 input: [ 'vendor.01.js', 'vendor.02.js' ],
 treeshake: true,
 output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true
 },
 experimentalCodeSplitting: true,
 plugins: [
  typescript({ 
    useTsconfigDeclarationDir: true,
    check: false
  }),
  resolve({ jsnext: true, main: true })
 ]
}