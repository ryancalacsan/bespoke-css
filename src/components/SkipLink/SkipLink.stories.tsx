import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect, userEvent } from 'storybook/test';
import { SkipLink } from './SkipLink';

const meta = {
  title: 'Chrome/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A skip-to-content link: hidden until focused, then it appears at the ' +
          'top-left. Put it first in the document and point it at your main ' +
          'landmark. Tab into the canvas to reveal it.',
      },
    },
  },
  tags: ['autodocs'],
  args: { href: '#main' },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ padding: 'var(--space-3xl)' }}>
      <SkipLink {...args} />
      <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
        Press Tab to reveal the skip link in the top-left.
      </p>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', {
      name: 'Skip to content',
    });
    await expect(link).toHaveAttribute('href', '#main');
    await userEvent.tab();
    await expect(link).toHaveFocus();
  },
};
