interface WarningModalProps {
  open: boolean;
  onCancel: () => void;
  onContinue: () => void;
}

const WarningModal = ({ open, onCancel, onContinue }: WarningModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-6">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 animate-modal-in">
        <p className="text-center text-sm leading-relaxed text-foreground/90">
          Please avoid unnecessary calls or messages.
          <br />
          Misuse, spam, or harassment may lead to legal action.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border border-border py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
