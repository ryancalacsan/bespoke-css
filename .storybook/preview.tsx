import { useEffect } from 'react'
import type { Preview, Decorator } from '@storybook/react-vite'
import type { ReactNode } from 'react'
// Load the token layer + reset so every story renders on the real foundation.
import '../src/styles/global.scss'

// Named so the hook is valid; sets the theme on the document element (not just
// the story root) so portaled content like Modal and Tooltip is themed too.
function ThemeWrapper({ theme, children }: { theme: string; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])
  return <>{children}</>
}

const withTheme: Decorator = (Story, context) => (
  <ThemeWrapper theme={context.globals.theme ?? 'light'}>
    <Story />
  </ThemeWrapper>
)

const preview: Preview = {
  decorators: [withTheme],
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
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
