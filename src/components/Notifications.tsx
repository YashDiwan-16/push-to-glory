import { memo } from 'react';
import type { ReactNode } from 'react';
import { AlertTriangle, CheckCircle, Info, X, XCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  persistent?: boolean;
}

interface ToastItemProps {
  toast: Toast;
  onRemove: (id: string) => void;
}

/**
 * Individual toast notification component
 */
export const ToastItem = memo<ToastItemProps>(({ toast, onRemove }) => {
  const { id, type, title, message, action } = toast;

  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      messageColor: 'text-green-700',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700',
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border rounded-lg p-4 shadow-lg max-w-sm w-full`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${style.titleColor}`}>
            {title}
          </h4>
          
          {message && (
            <p className={`text-sm mt-1 ${style.messageColor}`}>
              {message}
            </p>
          )}
          
          {action && (
            <button
              onClick={action.onClick}
              className={`text-sm font-medium mt-2 underline ${style.titleColor} hover:no-underline`}
            >
              {action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={() => onRemove(id)}
          className={`${style.iconColor} hover:opacity-70 transition-opacity`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});

ToastItem.displayName = 'ToastItem';

interface ToastContainerProps {
  toasts: Toast[];
  position?: ToastPosition;
  onRemove: (id: string) => void;
}

/**
 * Toast container component for managing multiple toasts
 */
export const ToastContainer = memo<ToastContainerProps>(({
  toasts,
  position = 'top-right',
  onRemove,
}) => {
  if (toasts.length === 0) return null;

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className={`fixed z-50 ${positionStyles[position]} space-y-2`}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
});

ToastContainer.displayName = 'ToastContainer';

interface AlertProps {
  type: ToastType;
  title: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

/**
 * Static alert component for inline notifications
 */
export const Alert = memo<AlertProps>(({
  type,
  title,
  message,
  action,
  children,
  onClose,
  className = '',
}) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-600',
      titleColor: 'text-green-800',
      messageColor: 'text-green-700',
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-600',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: AlertTriangle,
      iconColor: 'text-yellow-600',
      titleColor: 'text-yellow-800',
      messageColor: 'text-yellow-700',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-600',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700',
    },
  };

  const style = typeStyles[type];
  const Icon = style.icon;

  return (
    <div className={`${style.bg} border rounded-lg p-4 ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`h-5 w-5 ${style.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${style.titleColor}`}>
            {title}
          </h4>
          
          {message && (
            <p className={`text-sm mt-1 ${style.messageColor}`}>
              {message}
            </p>
          )}
          
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
          
          {action && (
            <button
              onClick={action.onClick}
              className={`text-sm font-medium mt-2 underline ${style.titleColor} hover:no-underline`}
            >
              {action.label}
            </button>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={`${style.iconColor} hover:opacity-70 transition-opacity`}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
});

Alert.displayName = 'Alert';

export default ToastContainer;
