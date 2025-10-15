import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  type = 'button',
}) => {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium transition-all duration-300 ease-in-out
    cursor-pointer uppercase tracking-wide
    focus:outline-none focus:ring-2 focus:ring-offset-2
    overflow-visible font-graphik
  `;

  const variantClasses = {
    primary: `
      text-white bg-transparent border border-white rounded-full
      hover:bg-white hover:text-gray-700
      focus:ring-amber-500 focus:ring-opacity-50
      group
    `,
    secondary: `
      text-gray-900 border border-gray-300 bg-white rounded-full
      hover:bg-gray-900 hover:border-gray-400
      focus:ring-gray-500
      group
    `,
    outline: `
      text-white border border-white bg-transparent rounded-full
      hover:bg-white hover:text-gray-900
      focus:ring-white focus:ring-opacity-50
      group
    `,
  };

  const sizeClasses = {
    sm: 'px-10 py-3 text-sm font-semibold',
    md: 'px-12 py-4 text-base font-semibold',
    lg: 'px-8 py-4 text-lg font-normal ',
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
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};

export default Button;
