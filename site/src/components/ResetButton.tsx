import { useState } from 'react';

export default function ResetButton() {
  const [isResetting, setIsResetting] = useState(false);

  const handleReset = () => {
    setIsResetting(true);
    window.location.reload();
  };

  return (
    <button
      onClick={handleReset}
      disabled={isResetting}
      className="hover:text-accent transition-colors disabled:opacity-50 border-0"
      aria-label="Reset text"
    >
      {isResetting ? '(×_×)' : '(°o°)'}
    </button>
  );
} 