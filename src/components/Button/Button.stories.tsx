import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A real `<button>` element with token-driven variants and sizes. ' +
          'Loading state is announced to assistive tech via `aria-busy` and a ' +
          'visually hidden live label, not just a spinner.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'ghost', 'danger'],
      description: 'Visual weight and intent.',
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    onClick: { action: 'clicked' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Save changes' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Cancel' },
};

export const Ghost: Story = {
  args: { variant: 'ghost', children: 'Learn more' },
};

export const Danger: Story = {
  args: { variant: 'danger', children: 'Delete account' },
};

export const Loading: Story = {
  args: { isLoading: true, children: 'Save changes', loadingLabel: 'Saving' },
  parameters: {
    docs: {
      description: {
        story:
          'While loading the button is disabled, shows a spinner, sets ' +
          '`aria-busy`, and exposes the `loadingLabel` to screen readers.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Unavailable' },
};

/** Every variant at every size, plus the loading and disabled states. */
export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      {(['primary', 'secondary', 'ghost', 'danger'] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}
        >
          <Button variant={variant} size="sm">
            Small
          </Button>
          <Button variant={variant} size="md">
            Medium
          </Button>
          <Button variant={variant} size="lg">
            Large
          </Button>
          <Button variant={variant} isLoading>
            Loading
          </Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};
