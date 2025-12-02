import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer',
    {
        variants: {
            variant: {
                primary: 'bg-primary-500 text-white hover:bg-primary-400 shadow-lg shadow-primary-500/25',
                secondary: 'bg-secondary-cyan-500 text-background-500 hover:bg-secondary-cyan-400',
                outline: 'border border-neutral-200 bg-transparent hover:bg-neutral-100/5 text-neutral-5',
                ghost: 'hover:bg-neutral-100/10 text-neutral-5',
                link: 'text-primary-400 underline-offset-4 hover:underline',
                social: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30',
            },
            size: {
                default: 'h-11 px-6 py-2',
                sm: 'h-9 rounded-lg px-3',
                lg: 'h-12 rounded-xl px-8 text-base',
                icon: 'h-10 w-10',
            },
            fullWidth: {
                true: 'w-full',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'default',
            fullWidth: false,
        },
    }
);

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

export { Button, buttonVariants };
