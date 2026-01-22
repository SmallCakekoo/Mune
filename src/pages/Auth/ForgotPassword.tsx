import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
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
            await import('../../services/auth.service').then(authService =>
                authService.sendPasswordReset(data.email)
            );
            setIsSubmitted(true);
        } catch (error) {
            console.error('Password reset error:', error);
            // For security, show success even if email doesn't exist
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success-500/20 mb-6 border border-success-500/30"
                >
                    <CheckCircle2 className="w-8 h-8 text-success-400" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-4 font-display"
                >
                    Check Your Email
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-neutral-5 text-base mb-2 leading-relaxed"
                >
                    We've sent a password reset link to:
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-primary-400 font-semibold mb-8 break-all"
                >
                    {getValues('email')}
                </motion.p>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm text-neutral-5/70 mb-8"
                >
                    If you don't receive the email in a few minutes, check your spam folder or try again.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <Link to="/login">
                        <Button
                            fullWidth
                            size="lg"
                            className="bg-white text-background-500 hover:bg-neutral-5 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-semibold"
                        >
                            Back to Login
                        </Button>
                    </Link>
                </motion.div>
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
            {/* Back Button */}
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
            >
                <Link
                    to="/login"
                    className="inline-flex items-center text-xs text-neutral-5 hover:text-primary-400 transition-colors font-medium group uppercase tracking-wider"
                >
                    <ArrowLeft className="mr-2 h-3 w-3 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                </Link>
            </motion.div>

            {/* Header */}
            <div className="mb-8">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-2 font-display"
                >
                    Forgot Password?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.5 }}
                    className="text-neutral-5 text-base leading-relaxed"
                >
                    Don't worry, it happens. Enter your email and we'll send you a reset link.
                </motion.p>
            </div>

            {/* Form */}
            <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
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
                    className="mt-6 bg-white text-background-500 hover:bg-neutral-5 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-semibold"
                >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                </Button>
            </motion.form>

            {/* Help Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10"
            >
                <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="text-sm font-semibold text-white mb-1">Need Help?</p>
                        <p className="text-sm text-neutral-5/70 leading-relaxed">
                            If you continue having trouble accessing your account, please contact our support team.
                        </p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ForgotPassword;
