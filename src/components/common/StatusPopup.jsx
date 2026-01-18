function StatusPopup({ isOpen, status, title, message, onClose }) {
  if (!isOpen) return null;

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';
  const isError = status === 'error';
  const headerEmoji = isLoading ? '⏳' : isSuccess ? '✅' : isError ? '❌' : '';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={isLoading ? undefined : onClose}
        role="presentation"
      />
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-secondary-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {headerEmoji && <span className="text-lg">{headerEmoji}</span>}
            <h3 className="text-lg font-semibold text-secondary-900 dark:text-secondary-100">{title}</h3>
          </div>
          {isLoading && (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-secondary-600 dark:text-secondary-300">{message}</p>
        {!isLoading && (
          <div className="mt-5 flex justify-end">
            <button type="button" className="btn" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatusPopup;
