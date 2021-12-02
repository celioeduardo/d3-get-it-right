import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'index.js',
	// external: ['d3'],
	output: {
		file: 'bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true,
    globals: {"d3":"d3"}
	},
	plugins: [
		resolve(),
		// commonjs(), // converts date-fns to ES modules
		// production && terser() // minify, but only in production
	]
};
