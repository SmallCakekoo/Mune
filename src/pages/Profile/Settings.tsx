import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    IconArrowLeft,
    IconLogout,
    IconTrash,
    IconAlertTriangle
} from '@tabler/icons-react';
import Sidebar from '../../components/layout/Sidebar/Sidebar';
import ProfileSettings from '../../components/profile/ProfileSettings/ProfileSettings';
import ThemeSettings from '../../components/profile/ThemeSettings/ThemeSettings';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button/Button';
import ConfirmationDialog from '../../components/common/ConfirmationDialog/ConfirmationDialog';
import { Loader } from '../../components/common/Loader/Loader';
import toast from 'react-hot-toast';

const Settings: React.FC = () => {
    const { user, updateUser, logout, deleteAccount, isLoading } = useAuth();
    const navigate = useNavigate();

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            await deleteAccount();
            toast.success('Account deleted successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to delete account');
        }
    };

    if (isLoading || !user) {
        return (
            <div className="min-h-screen bg-background-500 flex items-center justify-center">
                <Loader size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background-500 text-white">
            {/* Background Elements */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/10 via-background-500 to-background-500 z-0" />
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 z-0 mix-blend-overlay" />

            <Sidebar userAvatar={user.avatar} />

            <main className="ml-0 md:ml-[80px] lg:ml-[280px] min-h-screen relative z-10 transition-all duration-300">
                <div className="container mx-auto px-6 py-8 pt-24 md:pt-12 max-w-4xl">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-12">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-neutral-5 hover:text-white hover:bg-white/10 transition-all"
                        >
                            <IconArrowLeft size={24} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-bold text-white">Settings</h1>
                            <p className="text-neutral-5">Manage your account preferences and appearance</p>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {/* Profile Section */}
                        <section>
                            <ProfileSettings user={user} onUpdate={updateUser} />
                        </section>

                        {/* Theme Section */}
                        <section>
                            <ThemeSettings />
                        </section>

                        {/* Danger Zone */}
                        <section className="bg-error-500/5 backdrop-blur-xl rounded-2xl border border-error-500/20 p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-error-400 mb-6 flex items-center gap-2">
                                <IconAlertTriangle size={24} />
                                Danger Zone
                            </h3>

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-white font-medium mb-1">Logout</p>
                                    <p className="text-sm text-neutral-5">Sign out of your account on this device.</p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsLogoutDialogOpen(true)}
                                    className="w-full sm:w-auto border-white/10 text-white hover:bg-white/10"
                                >
                                    <IconLogout size={20} />
                                    Log out
                                </Button>
                            </div>

                            <div className="h-px bg-white/10 my-6" />

                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="flex-1">
                                    <p className="text-error-400 font-medium mb-1">Delete Account</p>
                                    <p className="text-sm text-neutral-5">Permanently delete your account and all associated data. This action is irreversible.</p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                    className="w-full sm:w-auto border-error-500/30 text-error-400 hover:bg-error-500/10 hover:border-error-500"
                                >
                                    <IconTrash size={20} />
                                    Delete Account
                                </Button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Confirmation Dialogs */}
            <ConfirmationDialog
                isOpen={isLogoutDialogOpen}
                onClose={() => setIsLogoutDialogOpen(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                message="Are you sure you want to log out? You will need to sign in again to access your rooms."
                confirmText="Log out"
                variant="warning"
            />

            <ConfirmationDialog
                isOpen={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
                onConfirm={handleDeleteAccount}
                title="Permanently Delete Account"
                message="This action cannot be undone. All your rooms, playlists, and profile data will be permanently erased. Are you absolutely sure?"
                confirmText="Yes, delete everything"
                variant="danger"
            />
        </div>
    );
};

export default Settings;
