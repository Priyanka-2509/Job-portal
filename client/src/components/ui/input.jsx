import React from 'react';

const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            ref={ref}
            className={`
                w-full pl-12 pr-4 py-3 bg-card/70 border border-white/10 rounded-xl 
                text-base text-foreground placeholder:text-foreground/50 
                focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
                transition-all duration-300
                ${className}
            `}
            {...props}
        />
    );
});

Input.displayName = 'Input';

export { Input };
