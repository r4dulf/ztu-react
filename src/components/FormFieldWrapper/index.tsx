export const FormFieldWrapper = ({
  children,
  label,
  error,
  className,
  isRequired,

  onReset,
}: {
  children: React.ReactNode;
  label: string;
  error?: string;
  className?: string;
  isRequired?: boolean;
  hasValue?: boolean;

  onReset?: () => void;
}) => {
  const hasError = Boolean(error);

  return (
    <div className={`form-island ${className ?? ''} ${hasError ? 'error' : ''}`}>
      <div className='form-label'>
        <span>{label}</span> {isRequired && <span className='required'>*</span>}
      </div>

      <div className='form-field'>{children}</div>

      {error && <span className='error-message'>{error}</span>}

      {!isRequired && onReset && (
        <div className='reset-button-wrapper'>
          <div className='reset-button' onClick={onReset}>
            Reset {label.toLowerCase()}
          </div>
        </div>
      )}
    </div>
  );
};
