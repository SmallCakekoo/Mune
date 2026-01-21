import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { SocialLoginButton } from '../../common/Button/SocialLoginButton';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const { signInWithEmail, signInWithGoogle, signInWithGithub } = useAuth();

    const onSubmit = async (data: LoginFormData) => {
        try {
            await signInWithEmail(data.email, data.password);
            navigate('/home');
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

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
                    className="text-3xl sm:text-4xl font-bold text-white mb-2 font-display"
                >
                    Welcome Back
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-neutral-5 text-base"
                >
                    Sign in to continue to your workspace
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

                <div className="space-y-1">
                    <label className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">
                        Password
                    </label>
                    <Input
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register('password')}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <Checkbox
                        label="Remember me"
                        {...register('remember')}
                    />
                    <Link
                        to="/forgot-password"
                        className="text-sm text-neutral-5 hover:text-primary-400 font-medium transition-colors uppercase tracking-wider"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="mt-6 bg-white text-background-500 hover:bg-neutral-5 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-semibold"
                >
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>
            </motion.form>

            {/* Sign up link */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-center"
            >
                <p className="text-sm text-neutral-5">
                    Don't have an account?{' '}
                    <Link
                        to="/signup"
                        className="text-primary-400 hover:text-primary-300 font-semibold transition-colors inline-flex items-center gap-1.5 group"
                    >
                        Sign Up
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </p>
            </motion.div>

            {/* Social Login */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
            >
                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-background-400/50 px-4 text-neutral-5 font-medium uppercase tracking-wider">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <SocialLoginButton
                        provider="github"
                        onClick={signInWithGithub}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    />
                    <SocialLoginButton
                        provider="google"
                        onClick={signInWithGoogle}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LoginForm;
