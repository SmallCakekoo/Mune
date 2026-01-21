import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { motion } from 'framer-motion';

const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-500">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
                />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
