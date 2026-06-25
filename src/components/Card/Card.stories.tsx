import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Card } from './Card';
import { AspectRatio } from '../AspectRatio/AspectRatio';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Eyebrow } from '../Eyebrow/Eyebrow';
import { Heading } from '../Heading/Heading';
import { Inline } from '../Inline/Inline';
import { Text } from '../Text/Text';

const meta = {
  title: 'Content/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A bordered surface with optional media, header, body, and footer ' +
          'regions. A neutral container that project cards and case-study blocks ' +
          'compose from - here built entirely out of other Caliper primitives.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composed: Story = {
  render: () => (
    <div style={{ maxWidth: '24rem' }}>
      <Card
        media={
          <AspectRatio ratio={16 / 9}>
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                background: 'var(--color-primary-bg)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-muted)',
              }}
            >
              cover
            </div>
          </AspectRatio>
        }
        header={
          <>
            <Inline justify="between" align="start">
              <Eyebrow>Case study</Eyebrow>
              <Badge tone="accent">New</Badge>
            </Inline>
            <Heading level={3} size="xl">
              Caliper UI
            </Heading>
          </>
        }
        footer={
          <Button asChild size="sm" variant="secondary">
            <a href="#read">Read more</a>
          </Button>
        }
      >
        <Text tone="muted" size="sm">
          A small, accessible component library presented as a technical spec
          sheet. Token-driven, two themes, WCAG 2.2 AA.
        </Text>
      </Card>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('heading', { name: 'Caliper UI' }),
    ).toBeInTheDocument();
    const link = canvas.getByRole('link', { name: 'Read more' });
    await expect(link).toHaveClass('button');
  },
};
