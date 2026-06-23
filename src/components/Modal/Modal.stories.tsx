import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, type ModalProps } from './Modal';
import { Button } from '../Button';
import { TextField } from '../TextField';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible dialog: focus is trapped while open, Escape and the ' +
          'scrim close it, focus returns to the trigger on close, the body ' +
          'scroll is locked, and role="dialog" + aria-modal + aria-labelledby ' +
          'expose it correctly to assistive tech.',
      },
    },
  },
  tags: ['autodocs'],
  // These are driven by component state inside each render(), so they are set
  // here only to satisfy the required-prop types. render() overrides them.
  args: {
    isOpen: false,
    onClose: () => {},
    title: 'Dialog title',
    children: null,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    closeOnOverlayClick: { control: 'boolean' },
    isOpen: { control: false },
    onClose: { control: false },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Render bodies live in named components so the hooks they call satisfy the
// rules-of-hooks lint (Storybook's inline render arrows do not).

function ConfirmDemo(args: ModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete project
      </Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          This permanently removes the project and all of its data. This action
          cannot be undone.
        </p>
      </Modal>
    </>
  );
}

function FormDemo(args: ModalProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Invite teammate</Button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        footer={
          <>
            <Button variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Send invite</Button>
          </>
        }
      >
        <div style={{ display: 'grid', gap: '1rem' }}>
          <TextField
            label="Email address"
            type="email"
            placeholder="teammate@example.com"
            required
          />
          <TextField
            label="Personal note"
            type="text"
            helpText="Optional. Added to the invitation email."
          />
        </div>
      </Modal>
    </>
  );
}

/** The default flow: a trigger opens the dialog, focus moves in and returns. */
export const Default: Story = {
  args: { title: 'Delete project', size: 'md' },
  render: (args) => <ConfirmDemo {...args} />,
};

/** A form inside the dialog shows the focus trap moving across real fields. */
export const WithForm: Story = {
  args: { title: 'Invite a teammate', size: 'md' },
  render: (args) => <FormDemo {...args} />,
};
