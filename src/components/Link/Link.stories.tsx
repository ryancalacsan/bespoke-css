import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Link } from './Link';

const meta = {
  title: 'Chrome/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A text link in the accent color with a clear focus ring. `asChild` ' +
          'hands the styling to a framework `<Link>` while keeping the look.',
      },
    },
  },
  tags: ['autodocs'],
  args: { href: '#', underline: 'always', children: 'design tokens' },
  argTypes: {
    underline: { control: 'inline-radio', options: ['always', 'hover'] },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <p style={{ margin: 0 }}>
      Built on <Link {...args} />, with two themes.
    </p>
  ),
};

/** `asChild` applies the styling to a custom element (here a plain anchor). */
export const AsChild: Story = {
  render: () => (
    <Link asChild>
      <a href="#docs" data-custom="yes">
        Read the docs
      </a>
    </Link>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole('link', {
      name: 'Read the docs',
    });
    await expect(link).toHaveClass('link');
    await expect(link).toHaveAttribute('data-custom', 'yes');
  },
};
