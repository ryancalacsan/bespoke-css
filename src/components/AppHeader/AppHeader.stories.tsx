import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { AppHeader } from './AppHeader';
import { NavLink } from '../NavLink/NavLink';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

const meta = {
  title: 'Chrome/AppHeader',
  component: AppHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A page header shell. When sticky, it condenses to a translucent glass ' +
          'bar with a shadow once the page scrolls. Composed here from NavLink ' +
          'and ThemeToggle.',
      },
    },
  },
  tags: ['autodocs'],
  args: { sticky: true },
  argTypes: {
    sticky: { control: 'boolean' },
    condenseAfter: { control: { type: 'number' } },
  },
} satisfies Meta<typeof AppHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AppHeader {...args}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-lg)',
          padding: 'var(--space-md) var(--space-lg)',
        }}
      >
        <strong style={{ fontFamily: 'var(--font-mono)' }}>CALIPER</strong>
        <nav style={{ display: 'flex', gap: 'var(--space-lg)' }}>
          <NavLink href="#docs" active>
            Docs
          </NavLink>
          <NavLink href="#api">API</NavLink>
        </nav>
        <ThemeToggle />
      </div>
    </AppHeader>
  ),
  play: async ({ canvasElement }) => {
    const header = within(canvasElement).getByRole('banner');
    await expect(header).toHaveClass('app-header--sticky');
  },
};
