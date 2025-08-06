import { useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const useUnsavedChanges = (hasUnsavedChanges, elements, onSaveDraft) => {
  const navigate = useNavigate();
  const location = useLocation();

  const showUnsavedWarning = useCallback((callback) => {
    if (hasUnsavedChanges && elements.length > 0) {
      const result = window.confirm(
        "You have unsaved changes. Would you like to save as draft before leaving?"
      );
      
      if (result) {
        const title = prompt("Enter a title for your draft:");
        if (title && title.trim()) {
          onSaveDraft(title.trim());
          // Small delay to allow save to complete
          setTimeout(() => callback(), 500);
        }
        return false; // Don't proceed with navigation
      } else {
        const discardResult = window.confirm(
          "Are you sure you want to discard your changes?"
        );
        if (discardResult) {
          localStorage.removeItem("page-elements"); // Clear saved elements
          return true; // Proceed with navigation
        }
        return false; // Don't proceed
      }
    }
    return true; // No unsaved changes, proceed
  }, [hasUnsavedChanges, elements, onSaveDraft]);

  // Handle browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges && elements.length > 0) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, elements]);

  return { showUnsavedWarning };
};

export default useUnsavedChanges;