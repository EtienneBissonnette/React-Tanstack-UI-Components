import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Button, Modal } from '../../../components/ui';
import { DemoSection } from '../DemoSection';

export function ModalDemo() {
  const [localModalOpen, setLocalModalOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');

  const openSizeModal = (size: 'sm' | 'md' | 'lg' | 'xl') => {
    setCurrentSize(size);
    setSizeModalOpen(true);
  };

  return (
    <DemoSection title="Modal">
      {/* Control patterns */}
      <div className="demo__row">
        <Button onClick={() => setLocalModalOpen(true)}>
          Local State Modal
        </Button>
        <Link
          to="/demo"
          search={(prev) => ({ ...prev, modal: 'url-demo' })}
          replace
        >
          <Button intent="primary">URL-Driven Modal</Button>
        </Link>
      </div>

      {/* Sizes */}
      <div className="demo__row">
        <Button intent="secondary" onClick={() => openSizeModal('sm')}>
          Small
        </Button>
        <Button intent="secondary" onClick={() => openSizeModal('md')}>
          Medium
        </Button>
        <Button intent="secondary" onClick={() => openSizeModal('lg')}>
          Large
        </Button>
        <Button intent="secondary" onClick={() => openSizeModal('xl')}>
          Extra Large
        </Button>
      </div>

      {/* Local state modal */}
      <Modal
        open={localModalOpen}
        onOpenChange={setLocalModalOpen}
        size="md"
        aria-labelledby="local-modal-title"
      >
        <Modal.Header>
          <h2 id="local-modal-title">Local State Modal</h2>
        </Modal.Header>
        <Modal.Body>
          <p>
            This modal is controlled via local React state. It's ideal for
            ephemeral interactions like confirmations or quick forms.
          </p>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-fg-muted)' }}>
            Notice the URL doesn't change when this modal opens.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setLocalModalOpen(false)}>Cancel</Button>
          <Button intent="primary" onClick={() => setLocalModalOpen(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* URL-driven modal */}
      <Modal
        searchParamKey="modal"
        searchParamValue="url-demo"
        size="md"
        aria-labelledby="url-modal-title"
      >
        <Modal.Header>
          <h2 id="url-modal-title">URL-Driven Modal</h2>
        </Modal.Header>
        <Modal.Body>
          <p>
            This modal is controlled via URL search params. It's ideal for
            shareable, bookmarkable states.
          </p>
          <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-fg-muted)' }}>
            Check the URL - it now includes <code>?modal=url-demo</code>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Link
            to="/demo"
            search={(prev) => ({ ...prev, modal: undefined })}
            replace
          >
            <Button>Close</Button>
          </Link>
        </Modal.Footer>
      </Modal>

      {/* Size demo modal */}
      <Modal
        open={sizeModalOpen}
        onOpenChange={setSizeModalOpen}
        size={currentSize}
        aria-labelledby="size-modal-title"
      >
        <Modal.Header>
          <h2 id="size-modal-title">Size: {currentSize.toUpperCase()}</h2>
        </Modal.Header>
        <Modal.Body>
          <p>
            This modal demonstrates the <strong>{currentSize}</strong> size variant.
          </p>
          <p style={{ marginTop: 'var(--space-4)' }}>
            Available sizes: <code>sm</code>, <code>md</code>, <code>lg</code>,{' '}
            <code>xl</code>, <code>full</code>, <code>content</code>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setSizeModalOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </DemoSection>
  );
}
