import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

// A live type specimen: the three families and the full scale, rendered from
// the actual font and size tokens.

function Row({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '7rem 1fr',
        gap: 'var(--space-lg)',
        alignItems: 'baseline',
        padding: 'var(--space-md) 0',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-subtle)',
        }}
      >
        {label}
      </div>
      <div style={{ minWidth: 0, color: 'var(--color-text)' }}>{children}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 'var(--space-2xl)' }}>
      <h3
        style={{
          margin: '0 0 var(--space-sm)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: 'var(--color-accent-text)',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  );
}

const SIZES = [
  '6xl',
  '5xl',
  '4xl',
  '3xl',
  '2xl',
  'xl',
  'lg',
  'md',
  'base',
  'sm',
  'xs',
];

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The typefaces and the type scale, rendered from the font and size ' +
          'tokens. A technical pairing: Hanken Grotesk for display and UI, ' +
          'Geist Mono for labels.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Specimen: Story = {
  render: () => (
    <div
      style={{
        padding: 'var(--space-2xl)',
        background: 'var(--color-bg)',
        minHeight: '100vh',
      }}
    >
      <Section title="Families">
        <Row label="display / sans">
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--text-3xl)',
            }}
          >
            Hanken Grotesk
          </div>
        </Row>
        <Row label="mono">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-3xl)',
            }}
          >
            Geist Mono
          </div>
        </Row>
      </Section>

      <Section title="Display scale (Hanken Grotesk)">
        {SIZES.slice(0, 5).map((size) => (
          <Row key={size} label={`text-${size}`}>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: `var(--text-${size})`,
                lineHeight: 'var(--leading-tight)',
                letterSpacing: 'var(--tracking-tight)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              Composed with intent
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Text scale (Hanken Grotesk)">
        {SIZES.slice(5).map((size) => (
          <Row key={size} label={`text-${size}`}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: `var(--text-${size})`,
              }}
            >
              The quick brown fox jumps over the lazy dog
            </div>
          </Row>
        ))}
      </Section>

      <Section title="Weights (Hanken Grotesk)">
        {[
          ['regular', 400],
          ['medium', 500],
          ['semibold', 600],
          ['bold', 700],
        ].map(([name, weight]) => (
          <Row key={name} label={`weight-${name}`}>
            <div
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'var(--text-xl)',
                fontWeight: weight as number,
              }}
            >
              Design systems, built to last
            </div>
          </Row>
        ))}
      </Section>
    </div>
  ),
};
