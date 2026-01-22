import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { ArrowLeft, Mail } from 'lucide-react';
import { useState } from 'react';
import * as authService from '../../../services/auth.service';
import toast from 'react-hot-toast';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
    const [emailSent, setEmailSent] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            await authService.sendPasswordReset(data.email);
            setEmailSent(true);
            toast.success('Password reset email sent!');
        } catch (error: any) {
            console.error('Password reset failed:', error);
            // Firebase may not reveal if email exists for security
            // So we show success message anyway
            setEmailSent(true);
            toast.success('If an account exists with this email, a password reset link has been sent.');
        }
    };

    if (emailSent) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="w-full text-center"
            >
                <div className="mb-8">
                    <div className="w-16 h-16 bg-primary-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-primary-400" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-neutral-5 mb-2 font-display">
                        Check Your Email
                    </h2>
                    <p className="text-neutral-5 text-base">
                        We've sent a password reset link to<br />
                        <span className="font-semibold text-primary-400">{getValues('email')}</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <p className="text-sm text-neutral-5">
                        Didn't receive the email? Check your spam folder or try again.
                    </p>
                    <Button
                        onClick={() => setEmailSent(false)}
                        variant="outline"
                        fullWidth
                    >
                        Try Again
                    </Button>
                    <Link
                        to="/login"
                        className="flex items-center justify-center gap-2 text-sm text-neutral-5 hover:text-primary-400 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Login
                    </Link>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
        >
            {/* Header */}
            <div className="mb-8">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold text-neutral-5 mb-2 font-display"
                >
                    Forgot Password?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-neutral-5 text-base"
                >
                    No worries! Enter your email and we'll send you reset instructions.
                </motion.p>
            </div>

            {/* Form */}
            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">
                        Email Address
                    </label>
                    <Input
                        type="email"
                        placeholder="hello@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="mt-6 bg-primary-500 text-white hover:bg-primary-400 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-semibold"
                >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
            </motion.form>

            {/* Back to login */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-center"
            >
                <Link
                    to="/login"
                    className="text-sm text-neutral-5 hover:text-primary-400 font-medium transition-colors inline-flex items-center gap-1.5 group uppercase tracking-wider"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Back to Login
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default ForgotPasswordForm;
