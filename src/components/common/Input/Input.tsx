import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../../utils/cn';

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, label, error, helperText, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);
        const isPassword = type === 'password';

        const togglePasswordVisibility = () => {
            setShowPassword(!showPassword);
        };

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label
                        className={cn(
                            "text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors duration-200",
                            error ? "text-error-400" : isFocused ? "text-primary-400" : "text-neutral-5"
                        )}
                    >
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        className={cn(
                            "flex h-12 w-full rounded-xl border-2 px-4 py-3 text-base",
                            "ring-offset-background-500 file:border-0 file:bg-transparent file:text-base file:font-medium",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "transition-all duration-300 ease-out",
                            error
                                ? "border-error-400 bg-error-500/10 focus-visible:border-error-500 focus-visible:ring-error-500/20 text-neutral-5 placeholder:text-neutral-5/50"
                                : "border-neutral-5/20 bg-neutral-5/5 text-neutral-5 placeholder:text-neutral-5/50 focus-visible:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-500/20 hover:border-neutral-5/30 hover:bg-neutral-5/10",
                            "focus-visible:outline-none",
                            className
                        )}
                        ref={ref}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        {...props}
                    />
                    {isPassword && (
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={cn(
                                "absolute right-3 top-1/2 -translate-y-1/2",
                                "text-neutral-5 hover:text-primary-400",
                                "focus:outline-none focus:text-primary-400",
                                "transition-all duration-200",
                                "p-1.5 rounded-lg hover:bg-neutral-5/10",
                                "active:scale-95"
                            )}
                            tabIndex={-1}
                        >
                            {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                            ) : (
                                <Eye className="h-4 w-4" />
                            )}
                        </button>
                    )}
                </div>
                {error && (
                    <p className="text-xs text-error-400 font-medium animate-in slide-in-from-top-1 fade-in-0 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-error-400" />
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-neutral-5/70 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-5/50" />
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
