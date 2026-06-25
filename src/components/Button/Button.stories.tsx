import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
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
    shape: {
      control: 'inline-radio',
      options: ['rounded', 'pill'],
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

/** The pill shape, the editorial marketing-CTA treatment. */
export const Pill: Story = {
  args: { shape: 'pill', children: 'Get started' },
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

/**
 * `asChild` renders the button styling onto a single child element - here a real
 * link. The classes and props merge onto the `<a>`, so it looks like a button
 * but navigates like a link (and works with framework `<Link>`s).
 */
export const AsLink: Story = {
  args: { variant: 'secondary' },
  render: (args) => (
    <Button {...args} asChild>
      <a href="#docs">Read the docs</a>
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', {
      name: 'Read the docs',
    });
    await expect(link.tagName).toBe('A');
    await expect(link).toHaveClass('button');
    await expect(link).toHaveAttribute('href', '#docs');
  },
};

/** Icon-only buttons are square and take their accessible name from `aria-label`. */
export const IconOnly: Story = {
  args: { iconOnly: true, 'aria-label': 'Close', children: '✕' },
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Close' });
    await expect(button).toHaveClass('button--icon-only');
  },
};

/**
 * A disabled `asChild` link can't take a native `disabled` attribute, so it is
 * made non-interactive by hand: `aria-disabled`, removed from the tab order, and
 * pointer-events dropped (and activation swallowed).
 */
export const DisabledLink: Story = {
  args: { disabled: true },
  render: (args) => (
    <Button {...args} asChild>
      <a href="#nope">Unavailable</a>
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByText('Unavailable').closest('a');
    await expect(link).toHaveAttribute('aria-disabled', 'true');
    await expect(link).toHaveAttribute('tabindex', '-1');
  },
};
