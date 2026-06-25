import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { within, expect, userEvent, waitFor } from 'storybook/test';
import { Drawer, type DrawerProps } from './Drawer';
import { Button } from '../Button/Button';
import { NavLink } from '../NavLink/NavLink';
import { Stack } from '../Stack/Stack';

const meta = {
  title: 'Chrome/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A focus-trapped side drawer for mobile navigation. Tab stays inside ' +
          'the panel, Escape and a scrim press close it, background scroll is ' +
          'locked, and focus returns to the trigger on close. Built on the same ' +
          'hooks as Modal, and respects reduced motion.',
      },
    },
  },
  tags: ['autodocs'],
  args: { side: 'right', isOpen: false, onClose: () => {} },
  argTypes: {
    side: { control: 'inline-radio', options: ['left', 'right'] },
    isOpen: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

function DrawerDemo(args: DrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open menu</Button>
      <Drawer
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Menu"
      >
        <Stack as="nav" gap="md" aria-label="Primary">
          <NavLink href="#docs" active>
            Docs
          </NavLink>
          <NavLink href="#api">API</NavLink>
          <NavLink href="#changelog">Changelog</NavLink>
        </Stack>
      </Drawer>
    </>
  );
}

export const Default: Story = {
  render: (args) => <DrawerDemo {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    // The drawer portals to document.body, so query there.
    const body = within(document.body);

    await step('Open the drawer', async () => {
      await userEvent.click(canvas.getByRole('button', { name: 'Open menu' }));
      const dialog = await body.findByRole('dialog', { name: 'Menu' });
      await expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    await step('Escape closes it', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() =>
        expect(body.queryByRole('dialog')).not.toBeInTheDocument(),
      );
    });
  },
};
