import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../components/common/Input/Input';
import { Button } from '../../components/common/Button/Button';
import { ArrowLeft } from 'lucide-react';

const forgotPasswordSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const onSubmit = async (data: ForgotPasswordFormData) => {
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Show success message or redirect
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md mx-auto"
        >
            <Link
                to="/login"
                className="inline-flex items-center text-sm text-neutral-200 hover:text-primary-500 mb-8 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
            </Link>

            <div className="mb-8">
                <h2 className="text-3xl font-bold text-neutral-500 mb-2 font-display">Forgot Password?</h2>
                <p className="text-neutral-200">
                    Don't worry! It happens. Please enter the email associated with your account.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                >
                    Send Reset Link
                </Button>
            </form>
        </motion.div>
    );
};

export default ForgotPassword;
