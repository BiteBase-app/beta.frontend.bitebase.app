import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  variant?: 'default' | 'destructive';
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const baseClasses = 'relative w-full rounded-lg border p-4';
  const variantClasses = variant === 'destructive' 
    ? 'border-red-200 bg-red-50 text-red-800' 
    : 'border-gray-200 bg-gray-50 text-gray-800';
  
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`} role="alert">
      {children}
    </div>
  );
};

interface AlertDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertDescription: React.FC<AlertDescriptionProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
};
