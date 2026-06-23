import { useState } from 'react';
import { Button, TextField, Modal } from './components';
import './App.scss';

/**
 * A small demo surface. The real documentation lives in Storybook; this page is
 * a quick visual sanity check that the three components compose on the shared
 * token foundation.
 */
export function App() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="demo">
      <header className="demo__intro">
        <p className="demo__eyebrow">Bespoke CSS</p>
        <h1 className="demo__title">An accessible component foundation</h1>
        <p className="demo__lead">
          Three components built on a single token source, hand-written SCSS
          with BEM, and accessibility wired in from the start. Full docs live in
          Storybook.
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
        </div>
      </section>

      <section className="demo__section" aria-labelledby="fields-heading">
        <h2 id="fields-heading" className="demo__heading">
          Text fields
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
        </div>
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
