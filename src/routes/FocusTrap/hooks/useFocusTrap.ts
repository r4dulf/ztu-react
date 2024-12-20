import { useEffect, useRef } from 'react';

export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      "input:not([disabled]):not([type='hidden'])",
      'select:not([disabled])',
      'textarea:not([disabled])',
      "[tabindex]:not([tabindex='-1'])",
    ];

    const focusableElements = containerRef.current.querySelectorAll(focusableSelectors.join(','));

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();

          if (isFocusableElement(lastElement)) {
            lastElement.focus();
          }
        }

        return;
      }

      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();

        if (isFocusableElement(firstElement)) {
          firstElement.focus();
        }
      }
    };

    const handleFocus = () => {
      if (!containerRef.current?.contains(document.activeElement) && isFocusableElement(firstElement)) {
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', handleFocus);

    // Початкове встановлення фокусу
    if (isFocusableElement(firstElement)) {
      firstElement.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', handleFocus);
    };
  }, [isActive]);

  return containerRef;
};

const isFocusableElement = (
  element: Element
): element is HTMLAnchorElement | HTMLButtonElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => {
  return ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'DIV'].includes(element.tagName);
};
