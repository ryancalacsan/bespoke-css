import type { Meta, StoryObj } from '@storybook/react-vite';

// A live swatch board for the semantic color roles. It renders real
// var(--color-*) values, so it reflects whichever theme is active in the
// toolbar and proves the tokens resolve. Built as a canvas story (not MDX) so
// the fonts and colors render reliably.

interface Role {
  name: string;
  note?: string;
}

function Swatch({ name, note }: Role) {
  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--color-surface)',
      }}
    >
      <div
        style={{
          height: '72px',
          background: `var(--color-${name})`,
          borderBottom: '1px solid var(--color-border)',
        }}
      />
      <div style={{ padding: 'var(--space-sm)' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text)',
          }}
        >
          --color-{name}
        </div>
        {note && (
          <div
            style={{
              marginTop: '2px',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-subtle)',
            }}
          >
            {note}
          </div>
        )}
      </div>
    </div>
  );
}

function Group({ title, roles }: { title: string; roles: Role[] }) {
  return (
    <section style={{ marginBottom: 'var(--space-2xl)' }}>
      <h3
        style={{
          margin: '0 0 var(--space-md)',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          color: 'var(--color-accent-text)',
        }}
      >
        {title}
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: 'var(--space-md)',
        }}
      >
        {roles.map((r) => (
          <Swatch key={r.name} {...r} />
        ))}
      </div>
    </section>
  );
}

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'The semantic color roles, rendered live from var(--color-*). Use the ' +
          'theme switcher in the toolbar to see them repoint between the light ' +
          '(Daylight) and dark (Noir) themes. Components only ever read these ' +
          'roles, never the raw ramps.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Roles: Story = {
  render: () => (
    <div
      style={{
        padding: 'var(--space-2xl)',
        background: 'var(--color-bg)',
        minHeight: '100vh',
        fontFamily: 'var(--font-sans)',
      }}
    >
      <Group
        title="Surfaces"
        roles={[
          { name: 'bg', note: 'App canvas' },
          { name: 'surface', note: 'Cards, fields, modals' },
          { name: 'surface-raised', note: 'Raised surfaces' },
        ]}
      />
      <Group
        title="Text"
        roles={[
          { name: 'text', note: 'Primary' },
          { name: 'text-muted', note: 'Help text' },
          { name: 'text-subtle', note: 'Placeholders' },
          { name: 'accent-text', note: 'Links, accents' },
        ]}
      />
      <Group
        title="Primary action"
        roles={[
          { name: 'primary', note: 'Fill' },
          { name: 'primary-hover' },
          { name: 'primary-active' },
          { name: 'primary-bg', note: 'Tint' },
        ]}
      />
      <Group
        title="Borders"
        roles={[
          { name: 'border', note: 'Hairline' },
          { name: 'border-strong', note: 'Field outline' },
          { name: 'border-focus', note: 'Focus' },
        ]}
      />
      <Group
        title="Feedback"
        roles={[
          { name: 'danger', note: 'Error text' },
          { name: 'danger-solid', note: 'Danger button' },
          { name: 'danger-bg', note: 'Error tint' },
          { name: 'success', note: 'Success text' },
        ]}
      />
    </div>
  ),
};
