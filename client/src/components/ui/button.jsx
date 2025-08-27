import React from 'react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({ className, children, size = 'md', ...props }, ref) => {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    return (
        <motion.button
            ref={ref}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`
                relative inline-flex items-center justify-center font-semibold text-white 
                bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 
                hover:shadow-lg hover:shadow-purple-500/30 
                transition-all duration-300 rounded-xl overflow-hidden group
                ${sizeClasses[size]} ${className}
            `}
            {...props}
        >
            {/* Shiny hover effect */}
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            <span className="relative z-10 flex items-center">
                {children}
            </span>
        </motion.button>
    );
});

Button.displayName = 'Button';

export { Button };

