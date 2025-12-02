import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { SocialLoginButton } from '../../common/Button/SocialLoginButton';
import { ArrowRight } from 'lucide-react';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
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

    const onSubmit = async (data: LoginFormData) => {
        // Simulate API call
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/home'); // Navigate to home/dashboard after login
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full"
        >
            <div className="mb-8 sm:mb-10">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold text-neutral-600 mb-3 font-display"
                >
                    What's the Vibe Today?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-neutral-400 text-base sm:text-lg"
                >
                    Log in and put music to your ideas.
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-4 text-sm text-neutral-400"
                >
                    First time here? Join the vibe,{' '}
                    <Link
                        to="/signup"
                        className="text-primary-600 font-semibold hover:text-primary-700 hover:underline underline-offset-2 transition-all duration-200 inline-flex items-center gap-1 group"
                    >
                        Sign Up
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.p>
            </div>

            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <Input
                    label="Email"
                    type="email"
                    placeholder="your.email@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <div className="space-y-3">
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                id="remember"
                                className="w-4 h-4 rounded-full border-2 border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 transition-all duration-200 cursor-pointer checked:bg-blue-600 checked:border-blue-600"
                            />
                            <span className="text-sm text-neutral-500 group-hover:text-neutral-600 transition-colors select-none">
                                Remember me for 30 days
                            </span>
                        </label>
                        <Link
                            to="/forgot-password"
                            className="text-sm text-primary-600 hover:text-primary-700 font-medium hover:underline underline-offset-2 transition-all duration-200"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="mt-8 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                >
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>
            </motion.form>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
            >
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-neutral-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-4 text-neutral-400 font-medium tracking-wider">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                    <SocialLoginButton
                        provider="github"
                        onClick={() => console.log('Github login')}
                        className="hover:scale-[1.02] transition-transform duration-200"
                    />
                    <SocialLoginButton
                        provider="google"
                        onClick={() => console.log('Google login')}
                        className="hover:scale-[1.02] transition-transform duration-200"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default LoginForm;
