const MCButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  href = null,
  icon: Icon = null,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };
  
  const variants = {
    primary: "bg-[#7c7c7c] text-white hover:bg-[#8e8e8e]",
    success: "bg-[#4da94d] text-white hover:bg-[#5cb85c]",
    danger: "bg-[#be0000] text-white hover:bg-[#d60000]",
    warning: "bg-[#ffaa00] text-black hover:bg-[#ffbb33]",
    diamond: "bg-gradient(135deg, #4db5ff 0%, #0077ff 100%) text-white hover:brightness-110",
    emerald: "bg-gradient(135deg, #4dff4d 0%, #00aa00 100%) text-white hover:brightness-110"
  };

  const baseStyles = `relative font-minecraft-ten ${sizeClasses[size]} border-2 mc-button-bevel transition-all duration-75 active:scale-[0.98] w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 cursor-pointer select-none`;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};

export default MCButton;