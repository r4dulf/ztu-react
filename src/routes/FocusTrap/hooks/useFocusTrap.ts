import { useEffect } from 'react';

export const useFocusTrap = (input: HTMLInputElement | HTMLTextAreaElement | null) => {
  useEffect(() => {
    if (!input) return;

    const onBlurListener = () => input.focus();

    onBlurListener();

    input.addEventListener('blur', onBlurListener);

    return () => {
      input.removeEventListener('blur', onBlurListener);
    };
  }, [input]);
};
