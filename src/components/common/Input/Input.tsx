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
                            error ? "text-error-500" : isFocused ? "text-primary-600" : "text-neutral-500"
                        )}
                    >
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        type={isPassword ? (showPassword ? 'text' : 'password') : type}
                        className={cn(
                            "flex h-12 w-full rounded-xl border-2 bg-primary-50/30 px-4 py-3 text-sm",
                            "ring-offset-background-500 file:border-0 file:bg-transparent file:text-sm file:font-medium",
                            "placeholder:text-neutral-300 text-neutral-600 font-medium",
                            "focus-visible:outline-none focus-visible:bg-white",
                            "focus-visible:border-primary-500 focus-visible:ring-4 focus-visible:ring-primary-500/10",
                            "disabled:cursor-not-allowed disabled:opacity-50",
                            "transition-all duration-300 ease-out",
                            "hover:border-primary-300 hover:bg-primary-50/50",
                            error
                                ? "border-error-400 bg-error-50/30 focus-visible:border-error-500 focus-visible:ring-error-500/10"
                                : "border-primary-100",
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
                                "text-neutral-400 hover:text-primary-600",
                                "focus:outline-none focus:text-primary-600",
                                "transition-all duration-200",
                                "p-1.5 rounded-lg hover:bg-primary-50",
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
                    {/* Focus ring effect */}
                    {isFocused && !error && (
                        <div className="absolute inset-0 rounded-xl border-2 border-primary-500 pointer-events-none animate-pulse" />
                    )}
                </div>
                {error && (
                    <p className="text-xs text-error-500 font-medium animate-in slide-in-from-top-1 fade-in-0 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-error-500" />
                        {error}
                    </p>
                )}
                {helperText && !error && (
                    <p className="text-xs text-neutral-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-neutral-300" />
                        {helperText}
                    </p>
                )}
            </div>
        );
    }
);
Input.displayName = 'Input';

export { Input };
