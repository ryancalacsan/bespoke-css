import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent } from 'storybook/test';
import { ThemeToggle } from './ThemeToggle';

const meta = {
  title: 'Chrome/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggles `data-theme` on the document between light and dark and ' +
          'persists it. It reads the real theme only after mount, so server and ' +
          'first client render match (no hydration mismatch). Pair it with an ' +
          'inline script that sets `data-theme` before paint to avoid a flash.',
      },
    },
  },
  tags: ['autodocs'],
  args: {},
  argTypes: {
    lightLabel: { control: 'text' },
    darkLabel: { control: 'text' },
  },
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const btn = within(canvasElement).getByRole('button', {
      name: 'Dark theme',
    });
    await userEvent.click(btn);
    // Clicking writes a concrete theme onto the document.
    await expect(['light', 'dark']).toContain(
      document.documentElement.dataset.theme,
    );
  },
};
