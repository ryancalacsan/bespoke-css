import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { BackToTop } from './BackToTop';

const meta = {
  title: 'Chrome/BackToTop',
  component: BackToTop,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A floating button that scrolls back to the top, revealed once the ' +
          'page is scrolled past a threshold. Non-interactive while hidden, and ' +
          'respects reduced motion. Scroll the docs preview to reveal it.',
      },
    },
  },
  tags: ['autodocs'],
  args: { threshold: 400 },
  argTypes: {
    threshold: { control: { type: 'number', step: 50 } },
  },
} satisfies Meta<typeof BackToTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ minHeight: '40vh', padding: 'var(--space-2xl)' }}>
      <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
        The button is fixed to the bottom-right and hidden until you scroll past
        the threshold.
      </p>
      <BackToTop {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    // At scroll 0 (below threshold) it's hidden and out of the tab order.
    const btn = canvasElement.querySelector('.back-to-top');
    await expect(btn).toHaveAttribute('aria-hidden', 'true');
    await expect(btn).toHaveAttribute('tabindex', '-1');
  },
};
