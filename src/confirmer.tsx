import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { ConfirmOptions, ConfirmState, ConfirmerProps } from './types';
import { createFocusTrap } from './focus-trap';

const DEFAULT_OPTIONS: ConfirmOptions = { title: '' };

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

let globalConfirm: ConfirmFn | null = null;

export function confirm(options: ConfirmOptions): Promise<boolean> {
  if (!globalConfirm) {
    throw new Error(
      'affirm: <Confirmer /> is not mounted. Add it to your app root.'
    );
  }
  return globalConfirm(options);
}

export function Confirmer({
  theme = 'system',
  defaultOptions,
  className,
}: ConfirmerProps) {
  const [state, setState] = useState<ConfirmState>({
    isOpen: false,
    options: DEFAULT_OPTIONS,
    resolve: null,
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const trapRef = useRef<ReturnType<typeof createFocusTrap> | null>(null);

  const titleId = useId();
  const descId = useId();

  const mergedOptions = { ...defaultOptions, ...state.options };
  const {
    title,
    description,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
    icon,
    onConfirm,
    onCancel,
    dismissible = true,
    className: dialogClassName,
    overlayClassName,
  } = mergedOptions;

  // Register the global confirm function
  const open = useCallback<ConfirmFn>((options) => {
    return new Promise<boolean>((resolve) => {
      setState({ isOpen: true, options, resolve });
    });
  }, []);

  useEffect(() => {
    globalConfirm = open;
    return () => {
      globalConfirm = null;
    };
  }, [open]);

  // Manage open/close visibility for animations
  useEffect(() => {
    if (state.isOpen) {
      // Mount then trigger enter animation on next frame
      setVisible(true);
    }
  }, [state.isOpen]);

  // Focus trap
  useEffect(() => {
    if (!visible || !overlayRef.current) return;

    const trap = createFocusTrap(overlayRef.current);
    trapRef.current = trap;
    trap.activate(cancelRef.current);

    return () => {
      trap.deactivate();
      trapRef.current = null;
    };
  }, [visible]);

  const close = useCallback(
    (result: boolean) => {
      state.resolve?.(result);

      // Trigger exit animation
      setVisible(false);

      // Wait for animation to finish, then unmount
      const timeout = setTimeout(() => {
        setState({ isOpen: false, options: DEFAULT_OPTIONS, resolve: null });
        setLoading(false);
      }, 150);

      return () => clearTimeout(timeout);
    },
    [state.resolve]
  );

  const handleConfirm = useCallback(async () => {
    if (loading) return;

    if (onConfirm) {
      setLoading(true);
      try {
        await onConfirm();
      } catch {
        setLoading(false);
        return;
      }
    }
    close(true);
  }, [loading, onConfirm, close]);

  const handleCancel = useCallback(() => {
    if (loading) return;
    onCancel?.();
    close(false);
  }, [loading, onCancel, close]);

  // Escape key
  useEffect(() => {
    if (!state.isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && dismissible && !loading) {
        handleCancel();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [state.isOpen, dismissible, loading, handleCancel]);

  // Overlay click
  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current && dismissible && !loading) {
        handleCancel();
      }
    },
    [dismissible, loading, handleCancel]
  );

  if (!state.isOpen && !visible) return null;

  const themeValue =
    theme === 'system'
      ? undefined
      : theme;

  return createPortal(
    <div
      ref={overlayRef}
      className={['affirm-overlay', overlayClassName].filter(Boolean).join(' ')}
      data-state={visible && state.isOpen ? 'open' : 'closed'}
      data-theme={themeValue}
      onClick={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        className={['affirm-dialog', className, dialogClassName]
          .filter(Boolean)
          .join(' ')}
        data-variant={variant}
        data-state={visible && state.isOpen ? 'open' : 'closed'}
      >
        <div className="affirm-header">
          {icon && <span className="affirm-icon">{icon}</span>}
          <h2 id={titleId} className="affirm-title">
            {title}
          </h2>
        </div>

        {description && (
          <p id={descId} className="affirm-description">
            {description}
          </p>
        )}

        <div className="affirm-actions">
          <button
            ref={cancelRef}
            type="button"
            className="affirm-btn affirm-btn-cancel"
            onClick={handleCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="affirm-btn affirm-btn-confirm"
            data-variant={variant}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading && <span className="affirm-spinner" aria-hidden="true" />}
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
