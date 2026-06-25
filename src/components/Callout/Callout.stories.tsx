import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Callout } from './Callout';

const meta = {
  title: 'Content/Callout',
  component: Callout,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A bordered note for a key result or aside, with a colored leading ' +
          'rule. The Spec Sheet margin annotation, scaled up to a block.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    tone: 'note',
    title: 'Measured to the pixel',
    children:
      'Every color pairing is verified against WCAG 2.2 AA by a script.',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['note', 'accent', 'success', 'danger'],
    },
    title: { control: 'text' },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: '1rem',
        maxWidth: '34rem',
      }}
    >
      <Callout tone="note" title="Note">
        A neutral aside.
      </Callout>
      <Callout tone="accent" title="Highlight">
        The headline result, in the signal color.
      </Callout>
      <Callout tone="success" title="Passing">
        All gated contrast pairings clear AA.
      </Callout>
      <Callout tone="danger" title="Heads up">
        This API is deprecated and will be removed.
      </Callout>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const accent = within(canvasElement)
      .getByText('Highlight')
      .closest('.callout');
    await expect(accent).toHaveClass('callout--accent');
  },
};
