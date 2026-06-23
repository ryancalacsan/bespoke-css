import { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Modal,
  Checkbox,
  RadioGroup,
  Select,
  Tabs,
  Tooltip,
} from './components';
import './App.scss';

type Theme = 'light' | 'dark';

/**
 * A small demo surface. The real documentation lives in Storybook; this page is
 * a quick visual sanity check that the components compose on the shared token
 * foundation, in both themes.
 */
export function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return (
    <main className="demo">
      <header className="demo__intro">
        <div className="demo__bar">
          <p className="demo__eyebrow">Bespoke CSS</p>
          <Button
            variant="secondary"
            size="sm"
            aria-pressed={theme === 'dark'}
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          >
            {theme === 'light' ? 'Dark theme' : 'Light theme'}
          </Button>
        </div>
        <h1 className="demo__title">An accessible component foundation</h1>
        <p className="demo__lead">
          Eight components built on a single token source, hand-written SCSS
          with BEM, and accessibility wired in from the start. The theme toggle
          repoints the semantic color roles. No component code changes. Full
          docs live in Storybook.
        </p>
      </header>

      <section className="demo__section" aria-labelledby="buttons-heading">
        <h2 id="buttons-heading" className="demo__heading">
          Buttons
        </h2>
        <div className="demo__row">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button isLoading loadingLabel="Saving">
            Loading
          </Button>
          <Tooltip content="Saves without leaving the page">
            <Button variant="ghost">Hover or focus me</Button>
          </Tooltip>
        </div>
      </section>

      <section className="demo__section" aria-labelledby="fields-heading">
        <h2 id="fields-heading" className="demo__heading">
          Form controls
        </h2>
        <div className="demo__fields">
          <TextField
            label="Email address"
            type="email"
            placeholder="you@example.com"
            helpText="We only use this to send build notifications."
          />
          <TextField
            label="Password"
            type="password"
            error="Enter at least 12 characters."
            required
          />
          <Select
            label="Country"
            placeholder="Select a country"
            options={[
              { label: 'Australia', value: 'au' },
              { label: 'Canada', value: 'ca' },
              { label: 'Germany', value: 'de' },
              { label: 'Japan', value: 'jp' },
            ]}
          />
          <RadioGroup
            legend="Notifications"
            defaultValue="daily"
            options={[
              { label: 'Real time', value: 'realtime' },
              { label: 'Daily digest', value: 'daily' },
              { label: 'Weekly summary', value: 'weekly' },
            ]}
          />
          <div className="demo__stack">
            <Checkbox label="Email me about product updates" defaultChecked />
            <Checkbox label="Make profile public" />
          </div>
        </div>
      </section>

      <section className="demo__section" aria-labelledby="tabs-heading">
        <h2 id="tabs-heading" className="demo__heading">
          Tabs
        </h2>
        <Tabs
          label="Account settings"
          tabs={[
            {
              id: 'profile',
              label: 'Profile',
              content: 'Your name, photo, and public details live here.',
            },
            {
              id: 'billing',
              label: 'Billing',
              content: 'Manage your plan, payment method, and invoices.',
            },
            {
              id: 'notifications',
              label: 'Notifications',
              content: 'Choose what we email you about and how often.',
            },
          ]}
        />
      </section>

      <section className="demo__section" aria-labelledby="modal-heading">
        <h2 id="modal-heading" className="demo__heading">
          Modal
        </h2>
        <Button onClick={() => setModalOpen(true)}>Open dialog</Button>
        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Publish release"
          footer={
            <>
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Publish</Button>
            </>
          }
        >
          <p>
            Focus is trapped in here, Escape closes it, the page behind cannot
            scroll, and focus returns to the button when it closes.
          </p>
        </Modal>
      </section>
    </main>
  );
}
