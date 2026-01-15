import { Button, useToast } from '@/components/ui';
import { DemoSection } from '../../DemoSection';

export function ToastDemo() {
  const { addToast, clearToasts } = useToast();

  const showSuccess = () => {
    addToast({
      intent: 'success',
      title: 'Changes saved',
      message: 'Your preferences have been updated successfully.',
      duration: 4000,
    });
  };

  const showError = () => {
    addToast({
      intent: 'error',
      title: 'Something went wrong',
      message: 'Unable to save changes. Please try again.',
      duration: 5000,
    });
  };

  const showWarning = () => {
    addToast({
      intent: 'warning',
      title: 'Unsaved changes',
      message: 'You have unsaved changes that will be lost.',
      duration: 4000,
    });
  };

  const showInfo = () => {
    addToast({
      intent: 'info',
      title: 'New update available',
      message: 'A new version is ready to install.',
      duration: 4000,
    });
  };

  const showMultiple = () => {
    addToast({ intent: 'info', title: 'Processing...', duration: 3000 });
    setTimeout(() => {
      addToast({ intent: 'success', title: 'Step 1 complete', duration: 3000 });
    }, 800);
    setTimeout(() => {
      addToast({ intent: 'success', title: 'All done!', message: 'Operation completed successfully.', duration: 4000 });
    }, 1600);
  };

  return (
    <DemoSection title="Toast">
      <div className="demo-section__row">
        <Button intent="primary" onClick={showSuccess}>Success</Button>
        <Button intent="danger" onClick={showError}>Error</Button>
        <Button intent="secondary" onClick={showWarning}>Warning</Button>
        <Button onClick={showInfo}>Info</Button>
      </div>
      <div className="demo-section__row">
        <Button variant="ghost" onClick={showMultiple}>Show Multiple</Button>
        <Button variant="ghost" onClick={clearToasts}>Clear All</Button>
      </div>
    </DemoSection>
  );
}
