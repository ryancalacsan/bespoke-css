import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { VisuallyHidden } from './VisuallyHidden';

const meta = {
  title: 'Chrome/VisuallyHidden',
  component: VisuallyHidden,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Hides content visually while keeping it in the accessibility tree - ' +
          'for labels conveyed some other way visually, or live status text.',
      },
    },
  },
  tags: ['autodocs'],
  args: { children: 'Loading, please wait' },
} satisfies Meta<typeof VisuallyHidden>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <p style={{ margin: 0 }}>
      Save
      <VisuallyHidden {...args} />
    </p>
  ),
  play: async ({ canvasElement }) => {
    // The text is present for assistive tech...
    const hidden = within(canvasElement).getByText('Loading, please wait');
    await expect(hidden).toHaveClass('visually-hidden');
    // ...but clipped to a 1px box visually.
    await expect(hidden).toHaveStyle({ width: '1px', height: '1px' });
  },
};
