import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { buttonVariants } from './buttonVariants';

export interface ButtonProps
    extends HTMLMotionProps<"button">,
    VariantProps<typeof buttonVariants> {
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, fullWidth, isLoading, children, ...props }, ref) => {
        return (
            <motion.button
                className={cn(buttonVariants({ variant, size, fullWidth, className }))}
                ref={ref}
                disabled={isLoading || props.disabled}
                whileTap={{ scale: 0.98 }}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children as React.ReactNode}
            </motion.button>
        );
    }
);
Button.displayName = 'Button';

export { Button };
