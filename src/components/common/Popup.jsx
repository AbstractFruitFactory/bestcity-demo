function Popup({ isOpen, title, description, primaryLabel, onPrimary, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        role="presentation"
      />
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-secondary-800">
        <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{title}</h3>
        <p className="mt-2 text-sm text-secondary-600 dark:text-secondary-300">{description}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            onClick={onPrimary}
          >
            {primaryLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Popup;
