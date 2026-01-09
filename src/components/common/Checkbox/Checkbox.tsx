import React from 'react';
import { IconCheck } from '@tabler/icons-react';
import { cn } from '../../../utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({ className, label, id, ...props }, ref) => {
        const checkboxId = id || React.useId();

        return (
            <label
                htmlFor={checkboxId}
                className="flex items-center gap-3 cursor-pointer group select-none"
            >
                <div className="relative">
                    <input
                        type="checkbox"
                        id={checkboxId}
                        ref={ref}
                        className="peer sr-only"
                        {...props}
                    />
                    <div className={cn(
                        "w-5 h-5 rounded-lg border-2 border-white/20 bg-white/5 transition-all duration-200",
                        "group-hover:border-primary-500/50 group-hover:bg-white/10",
                        "peer-checked:border-primary-500 peer-checked:bg-primary-500",
                        "peer-checked:[&>div]:opacity-100 peer-checked:[&>div]:scale-100",
                        "peer-focus-visible:ring-2 peer-focus-visible:ring-primary-500/50 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background-500",
                        className
                    )}>
                        <div className={cn(
                            "absolute inset-0 flex items-center justify-center text-white transition-all duration-200",
                            "opacity-0 scale-50"
                        )}>
                            <IconCheck size={16} stroke={3} />
                        </div>
                    </div>
                </div>
                {label && (
                    <span className="text-sm text-neutral-5 group-hover:text-white transition-colors">
                        {label}
                    </span>
                )}
            </label>
        );
    }
);

Checkbox.displayName = 'Checkbox';
