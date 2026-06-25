import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Stat } from './Stat';

const meta = {
  title: 'Content/Stat',
  component: Stat,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A spec readout: a mono label over a large display value. Line a few ' +
          'up for the "08 / 02 / AA" strip.',
      },
    },
  },
  tags: ['autodocs'],
  args: { label: 'Components', value: '19' },
  argTypes: {
    accent: { control: 'boolean' },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The readout strip - compose a few with a flex row or `Inline`. */
export const Strip: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '3rem' }}>
      <Stat label="Components" value="19" />
      <Stat label="Themes" value="02" />
      <Stat label="Contrast" value="AA" accent />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Components')).toBeInTheDocument();
    await expect(canvas.getByText('AA')).toHaveClass('stat__value--accent');
  },
};
