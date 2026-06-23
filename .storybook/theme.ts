import { create } from 'storybook/theming';

// Brands the Storybook chrome itself in the noir aesthetic, so the docs read as
// part of the system rather than default Storybook. Values mirror the dark
// theme tokens in src/tokens/_colors.scss.
export default create({
  base: 'dark',

  brandTitle: 'Bespoke — design system',
  brandTarget: '_self',

  // Iris accent
  colorPrimary: '#8f7af4',
  colorSecondary: '#8f7af4',

  // Ink surfaces
  appBg: '#0a0d14',
  appContentBg: '#0f1320',
  appPreviewBg: '#0a0d14',
  appBorderColor: '#2c3344',
  appBorderRadius: 8,

  // Text
  textColor: '#f4f1ea',
  textInverseColor: '#0a0d14',
  textMutedColor: '#a8b0c2',

  // Toolbar
  barBg: '#0a0d14',
  barTextColor: '#a8b0c2',
  barSelectedColor: '#ab9bf8',
  barHoverColor: '#ab9bf8',

  // Inputs
  inputBg: '#161b29',
  inputBorder: '#2c3344',
  inputTextColor: '#f4f1ea',
  inputBorderRadius: 6,

  // Type — falls back to system if the variable fonts are not loaded in the
  // manager iframe, which is fine; the brand and color carry the identity.
  fontBase:
    '"Hanken Grotesk Variable", system-ui, -apple-system, sans-serif',
  fontCode: '"Geist Mono Variable", ui-monospace, monospace',
});
