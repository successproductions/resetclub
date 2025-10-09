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
    overflow-visible
  `;

  const variantClasses = {
    primary: `
      text-white bg-transparent border-0 relative
      hover:text-[#2b8a7c]
      focus:ring-amber-500 focus:ring-opacity-50
      svg-border-button group
    `,
    secondary: `
      text-gray-900 border border-gray-300 bg-white
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500
      group
    `,
    outline: `
      text-white border border-white bg-transparent
      hover:bg-white hover:text-gray-900
      focus:ring-white focus:ring-opacity-50
      group
    `,
  };

  const sizeClasses = {
    sm: 'px-10 py-3 text-sm font-semibold',
    md: 'px-12 py-4 text-base font-semibold',
    lg: 'px-16 py-5 text-lg font-semibold',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  const content = variant === 'primary' ? (
    <span className="relative z-10">{children}</span>
  ) : (
    <>
      <span className="relative z-10">{children}</span>
      {/* Left angled edge */}
      <span className="absolute top-0 left-[-12px] h-full w-6 border-t border-b border-l border-white transform -skew-x-12 group-hover:bg-white"></span>
      {/* Right angled edge */}
      <span className="absolute top-0 right-[-12px] h-full w-6 border-t border-b border-r border-white transform skew-x-12 group-hover:bg-white"></span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default Button;
