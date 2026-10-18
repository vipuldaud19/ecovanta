/** Preflight is off so the ported design-system CSS in src/index.css renders exactly as designed. */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  corePlugins: { preflight: false },
  theme: { extend: {
    colors: { forest: '#0b3d2e', emerald: '#1fa971', ivory: '#faf8f1', charcoal: '#1e2421', lime: '#c9e24b' },
    fontFamily: { sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'] } } },
};
