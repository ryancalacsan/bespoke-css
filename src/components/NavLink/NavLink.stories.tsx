import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { NavLink } from './NavLink';

const meta = {
  title: 'Chrome/NavLink',
  component: NavLink,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A navigation link in the mono voice. The active state draws a signal ' +
          'underline and sets `aria-current="page"`.',
      },
    },
  },
  tags: ['autodocs'],
  args: { href: '#', children: 'Docs' },
  argTypes: {
    active: { control: 'boolean' },
    children: { control: 'text' },
  },
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Nav: Story = {
  render: () => (
    <nav style={{ display: 'flex', gap: 'var(--space-lg)' }}>
      <NavLink href="#docs" active>
        Docs
      </NavLink>
      <NavLink href="#api">API</NavLink>
      <NavLink href="#changelog">Changelog</NavLink>
    </nav>
  ),
  play: async ({ canvasElement }) => {
    const current = within(canvasElement).getByRole('link', { name: 'Docs' });
    await expect(current).toHaveAttribute('aria-current', 'page');
    await expect(current).toHaveClass('nav-link--active');
    const other = within(canvasElement).getByRole('link', { name: 'API' });
    await expect(other).not.toHaveAttribute('aria-current');
  },
};
