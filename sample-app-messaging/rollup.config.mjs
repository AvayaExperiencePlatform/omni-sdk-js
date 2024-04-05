import resolve from '@rollup/plugin-node-resolve';
import { AVAYA_LICENSE_NOTICE } from './avaya-license-banner.mjs';


export default {
  input: './index.js',
  output: [
    {
      file: 'public/app.js',
      format: 'es',
      banner: AVAYA_LICENSE_NOTICE
    }
  ],
  plugins: [resolve()]
};