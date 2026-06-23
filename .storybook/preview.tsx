import type { Preview } from '@storybook/react-vite'
// Load the token layer + reset so every story renders on the real foundation.
import '../src/styles/global.scss'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo'  - surface a11y violations in the addon panel (visible, not gated)
      // 'error' - fail the test run on violations
      // 'off'   - skip checks
      test: 'todo',
    },
  },
}

export default preview
