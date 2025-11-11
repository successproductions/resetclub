import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'secondary' | 'primary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
  disabled = false,
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium transition-all duration-300 ease-in-out
    cursor-pointer uppercase tracking-wide
    focus:outline-none focus:ring-2 focus:ring-offset-2
    overflow-visible
  `;

  const variantClasses = {
    primary: `
      text-gray-900 border border-gray-300 bg-white 
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500
      shadow-md
      group
  
    `,
    secondary: `
      text-gray-900 bg-transparent border border-gray-800 
      hover:bg-gray-900 hover:text-white
      focus:ring-gray-500 focus:ring-opacity-50
      shadow-md
      group
    `,
    outline: `
      text-white border border-white bg-transparent 
      hover:bg-white hover:text-gray-900
      focus:ring-white focus:ring-opacity-50
      shadow-md
      group
    `,
  };

  const sizeClasses = {
    sm: 'px-10 py-3 text-sm font-medium',
    md: 'px-12 py-4 text-base font-medium',
    lg: 'px-16 py-5 text-lg font-medium',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
};

export default Button;
