import type { ReactNode } from 'react';

export type Variant = 'default' | 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmOptions {
  /** Dialog title — the primary question or statement */
  title: string;
  /** Supporting description text below the title */
  description?: string;
  /** Text for the confirm button. Default: "Confirm" */
  confirmText?: string;
  /** Text for the cancel button. Default: "Cancel" */
  cancelText?: string;
  /** Visual variant controlling color scheme. Default: "default" */
  variant?: Variant;
  /** Custom icon rendered left of the title */
  icon?: ReactNode;
  /** Async action executed on confirm — shows loading state on the button */
  onConfirm?: () => Promise<void> | void;
  /** Called when the user cancels */
  onCancel?: () => void;
  /** Whether pressing Escape or clicking the overlay dismisses. Default: true */
  dismissible?: boolean;
  /** Custom CSS class applied to the dialog content container */
  className?: string;
  /** Custom CSS class applied to the overlay */
  overlayClassName?: string;
}

export interface ConfirmerProps {
  /** Theme mode. Default: 'system' */
  theme?: 'light' | 'dark' | 'system';
  /** Default options applied to all confirm() calls */
  defaultOptions?: Partial<ConfirmOptions>;
  /** Custom CSS class on the Confirmer wrapper */
  className?: string;
}

export interface ConfirmState {
  isOpen: boolean;
  options: ConfirmOptions;
  resolve: ((value: boolean) => void) | null;
}
