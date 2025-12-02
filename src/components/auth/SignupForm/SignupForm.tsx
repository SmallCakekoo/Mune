import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { SocialLoginButton } from '../../common/Button/SocialLoginButton';
import { ArrowRight } from 'lucide-react';

const signupSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    terms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data: SignupFormData) => {
        // Simulate API call
        console.log(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate('/home');
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
                    Let's Create Your Vibe
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-neutral-400 text-base sm:text-lg"
                >
                    Your room awaits, where ideas meet the perfect playlist
                </motion.p>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="mt-4 text-sm text-neutral-400"
                >
                    Been here before? Welcome Back.{' '}
                    <Link
                        to="/login"
                        className="text-primary-600 font-semibold hover:text-primary-700 hover:underline underline-offset-2 transition-all duration-200 inline-flex items-center gap-1 group"
                    >
                        Log In
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </motion.p>
            </div>

            <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.25, duration: 0.5 }}
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        placeholder="John"
                        error={errors.firstName?.message}
                        {...register('firstName')}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Doe"
                        error={errors.lastName?.message}
                        {...register('lastName')}
                    />
                </div>

                <Input
                    label="Email"
                    type="email"
                    placeholder="your.email@example.com"
                    error={errors.email?.message}
                    {...register('email')}
                />

                <Input
                    label="Password"
                    type="password"
                    placeholder="Create a strong password"
                    helperText="Must be at least 8 characters"
                    error={errors.password?.message}
                    {...register('password')}
                />

                <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            id="terms"
                            className="mt-0.5 w-4 h-4 rounded-full border-2 border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0 transition-all duration-200 cursor-pointer checked:bg-blue-600 checked:border-blue-600"
                            {...register('terms')}
                        />
                        <span className="text-sm text-neutral-500 group-hover:text-neutral-600 transition-colors leading-relaxed select-none">
                            I agree to the{' '}
                            <Link
                                to="/terms-of-service"
                                className="text-primary-600 font-medium hover:text-primary-700 underline underline-offset-2 cursor-pointer"
                            >
                                Terms & Conditions
                            </Link>
                            {' '}and{' '}
                            <Link
                                to="/privacy-policy"
                                className="text-primary-600 font-medium hover:text-primary-700 underline underline-offset-2 cursor-pointer"
                            >
                                Privacy Policy
                            </Link>
                        </span>
                    </label>
                    {errors.terms && (
                        <p className="mt-2 text-xs text-error-500 font-medium animate-in slide-in-from-top-1 fade-in-0 flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-error-500" />
                            {errors.terms.message}
                        </p>
                    )}
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="mt-6 shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
                >
                    {isSubmitting ? 'Creating Account...' : 'Sign Up'}
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
                        onClick={() => console.log('Github signup')}
                        className="hover:scale-[1.02] transition-transform duration-200"
                    />
                    <SocialLoginButton
                        provider="google"
                        onClick={() => console.log('Google signup')}
                        className="hover:scale-[1.02] transition-transform duration-200"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SignupForm;
