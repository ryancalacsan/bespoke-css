import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Icon } from './Icon';

// A plain inline SVG - the library depends on no icon set; you bring your own.
function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const meta = {
  title: 'Content/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sizing/color wrapper for any SVG, so the library depends on no icon ' +
          'set. The SVG is sized to the current font-size and inherits ' +
          '`currentColor`. Give meaningful icons a `label`; decorative ones are ' +
          'hidden from assistive tech.',
      },
    },
  },
  tags: ['autodocs'],
  args: { size: 'md', children: <Arrow /> },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    label: { control: 'text' },
    children: { control: false },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Decorative: Story = {};

export const Labeled: Story = {
  args: { label: 'Next', size: 'lg' },
  play: async ({ canvasElement }) => {
    const icon = within(canvasElement).getByRole('img', { name: 'Next' });
    await expect(icon).toBeInTheDocument();
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Icon key={s} size={s}>
          <Arrow />
        </Icon>
      ))}
    </div>
  ),
};
