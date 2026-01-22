import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { SocialLoginButton } from '../../common/Button/SocialLoginButton';
import { Checkbox } from '../../common/Checkbox/Checkbox';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../hooks/useAuth';

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
        control,
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const { signUpWithEmail, signInWithGoogle, signInWithGithub } = useAuth();

    const password = useWatch({
        control,
        name: 'password',
    });

    const passwordRequirements = [
        { label: 'At least 8 characters', met: password ? password.length >= 8 : false },
        { label: 'Include numbers', met: password ? /\d/.test(password) : false },
        { label: 'Include letters', met: password ? /[a-zA-Z]/.test(password) : false },
    ];

    const onSubmit = async (data: SignupFormData) => {
        try {
            const displayName = `${data.firstName} ${data.lastName}`;
            await signUpWithEmail(data.email, data.password, displayName);
            navigate('/home');
        } catch (error) {
            console.error('Signup failed:', error);
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
                    className="text-3xl sm:text-4xl font-bold text-neutral-5 mb-2 font-display"
                >
                    Create Account
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.5 }}
                    className="text-neutral-5 text-base"
                >
                    Join the community and start creating
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">
                            First Name
                        </label>
                        <Input
                            placeholder="John"
                            error={errors.firstName?.message}
                            {...register('firstName')}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-neutral-5 uppercase tracking-wider">
                            Last Name
                        </label>
                        <Input
                            placeholder="Doe"
                            error={errors.lastName?.message}
                            {...register('lastName')}
                        />
                    </div>
                </div>

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
                        placeholder="Create a strong password"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    {password && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="space-y-2 p-3 bg-white/5 rounded-lg border border-white/10 mt-2"
                        >
                            {passwordRequirements.map((req, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2"
                                >
                                    <CheckCircle2
                                        className={`w-3.5 h-3.5 ${req.met ? 'text-success-400' : 'text-neutral-5/30'}`}
                                    />
                                    <span
                                        className={`text-sm ${req.met ? 'text-success-400 font-medium' : 'text-neutral-5/60'}`}
                                    >
                                        {req.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>

                <div className="pt-2">
                    <Checkbox
                        {...register('terms')}
                        label={
                            <span className="text-sm text-neutral-5 group-hover:text-white transition-colors leading-relaxed select-none">
                                I agree to the{' '}
                                <Link
                                    to="/terms-of-service"
                                    className="text-primary-400 hover:text-primary-300 font-semibold underline underline-offset-2 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Terms & Conditions
                                </Link>
                                {' '}and{' '}
                                <Link
                                    to="/privacy-policy"
                                    className="text-primary-400 hover:text-primary-300 font-semibold underline underline-offset-2 cursor-pointer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Privacy Policy
                                </Link>
                            </span>
                        }
                    />
                    {errors.terms && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-2 text-xs text-error-400 font-medium flex items-center gap-1.5"
                        >
                            <span className="w-1 h-1 rounded-full bg-error-400" />
                            {errors.terms.message}
                        </motion.p>
                    )}
                </div>

                <Button
                    type="submit"
                    fullWidth
                    size="lg"
                    isLoading={isSubmitting}
                    className="mt-6 bg-primary-500 text-white hover:bg-primary-400 shadow-lg hover:shadow-xl transition-all duration-300 h-12 font-semibold"
                >
                    {isSubmitting ? 'Creating account...' : 'Sign Up'}
                </Button>
            </motion.form>

            {/* Sign in link */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-6 text-center"
            >
                <p className="text-sm text-neutral-5">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-primary-400 hover:text-primary-300 font-semibold transition-colors inline-flex items-center gap-1.5 group"
                    >
                        Log In
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
                        className="bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-5 dark:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    />
                    <SocialLoginButton
                        provider="google"
                        onClick={signInWithGoogle}
                        className="bg-neutral-100 dark:bg-white/5 hover:bg-neutral-200 dark:hover:bg-white/10 border border-neutral-200 dark:border-white/10 text-neutral-5 dark:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default SignupForm;
