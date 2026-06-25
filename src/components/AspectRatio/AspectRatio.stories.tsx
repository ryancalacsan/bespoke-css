import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import { AspectRatio } from './AspectRatio';

const fill = {
  display: 'grid',
  placeItems: 'center',
  background: 'var(--color-primary-bg)',
  border: '1px dashed var(--color-border-strong)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--text-sm)',
  color: 'var(--color-text-muted)',
};

const meta = {
  title: 'Content/AspectRatio',
  component: AspectRatio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Reserves a fixed width-to-height ratio for its content, so images and ' +
          'embeds never cause layout shift. The single child fills the box.',
      },
    },
  },
  tags: ['autodocs'],
  args: { ratio: 16 / 9 },
  argTypes: {
    ratio: { control: { type: 'number', step: 0.1 } },
  },
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Widescreen: Story = {
  render: (args) => (
    <div style={{ maxWidth: '28rem' }}>
      <AspectRatio {...args}>
        <div style={fill}>16 / 9</div>
      </AspectRatio>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const box = canvasElement.querySelector('.aspect-ratio');
    await expect(box).toHaveStyle({ '--aspect-ratio': String(16 / 9) });
  },
};

export const Square: Story = {
  args: { ratio: 1 },
  render: (args) => (
    <div style={{ maxWidth: '18rem' }}>
      <AspectRatio {...args}>
        <div style={fill}>1 / 1</div>
      </AspectRatio>
    </div>
  ),
};
