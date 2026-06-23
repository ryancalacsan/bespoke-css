import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Components/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A labelled input that wires up its own accessibility: htmlFor/id, ' +
          'aria-describedby for help and error text, aria-invalid in the error ' +
          'state, and a role="alert" region so the error is announced.',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    type: 'email',
  },
  argTypes: {
    label: { control: 'text' },
    helpText: { control: 'text' },
    error: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'url', 'search'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHelpText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helpText: 'Use at least 12 characters, including a number and a symbol.',
  },
};

export const Required: Story = {
  args: {
    label: 'Full name',
    type: 'text',
    required: true,
    helpText: 'As it appears on your ID.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email address',
    type: 'email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address, for example name@example.com.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The error switches on aria-invalid, thickens the border (a ' +
          'non-color cue), and renders the message in a live alert region.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Account ID',
    type: 'text',
    defaultValue: 'acct_4815162342',
    disabled: true,
  },
};
