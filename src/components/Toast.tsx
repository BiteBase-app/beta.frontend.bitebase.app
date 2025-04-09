import React from "react";
import { toast as sonnerToast } from "sonner";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

/**
 * Toast utility component for showing temporary notifications
 * Uses sonner toast under the hood for display
 */
export const Toast = {
  /**
   * Show a success toast message
   * @param message Message to display
   * @param options Additional options
   */
  success: (message: string, options?: object) => {
    sonnerToast.success(message, {
      icon: <CheckCircle className="text-green-500" />,
      ...options,
    });
  },

  /**
   * Show an error toast message
   * @param message Message to display
   * @param options Additional options
   */
  error: (message: string, options?: object) => {
    sonnerToast.error(message, {
      icon: <XCircle className="text-red-500" />,
      ...options,
    });
  },

  /**
   * Show an info toast message
   * @param message Message to display
   * @param options Additional options
   */
  info: (message: string, options?: object) => {
    sonnerToast.info(message, {
      icon: <Info className="text-blue-500" />,
      ...options,
    });
  },

  /**
   * Show a warning toast message
   * @param message Message to display
   * @param options Additional options
   */
  warning: (message: string, options?: object) => {
    sonnerToast.warning(message, {
      icon: <AlertTriangle className="text-amber-500" />,
      ...options,
    });
  },

  /**
   * Show a custom toast message
   * @param message Message to display
   * @param options Additional options
   */
  custom: (message: string, options?: object) => {
    sonnerToast(message, options);
  },

  /**
   * Dismiss all visible toasts
   */
  dismiss: () => {
    sonnerToast.dismiss();
  },

  /**
   * Create a promise toast that shows loading, success, and error states
   * @param promise Promise to track
   * @param messages Messages to display for different states
   * @param options Additional options
   */
  promise: <T,>(promise: Promise<T>, messages: {
    loading: string;
    success: string;
    error: string;
  }, options?: object) => {
    return sonnerToast.promise(promise, messages, options);
  },
};
