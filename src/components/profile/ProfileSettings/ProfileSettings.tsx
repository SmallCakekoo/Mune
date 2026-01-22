import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    IconDeviceFloppy,
    IconUser,
    IconCamera,
    IconFileText,
    IconBrandDiscord,
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandTwitter,
    IconShare
} from '@tabler/icons-react';
import type { User } from '../../../types/user.types';
import { Button } from '../../common/Button/Button';
import toast from 'react-hot-toast';

interface ProfileSettingsProps {
    user: User;
    onUpdate: (data: Partial<User>) => Promise<void>;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user, onUpdate }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        username: user.username,
        bio: user.bio || '',
        avatar: user.avatar || '',
        socialLinks: {
            discord: user.socialLinks?.discord || '',
            github: user.socialLinks?.github || '',
            linkedin: user.socialLinks?.linkedin || '',
            twitter: user.socialLinks?.twitter || '',
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let updatedFormData = { ...formData };

            // If there's a new avatar file, upload it first
            if (avatarFile) {
                const { uploadProfilePicture } = await import('../../../services/storage/storageService');
                const publicUrl = await uploadProfilePicture(user.id, avatarFile);
                updatedFormData.avatar = publicUrl;
                setFormData(updatedFormData);
                setAvatarFile(null); // Clear file after upload
            }

            await onUpdate(updatedFormData);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSocialChange = (key: keyof typeof formData.socialLinks, value: string) => {
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [key]: value
            }
        });
    };

    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size too large. Maximum size is 5MB.');
                return;
            }

            setAvatarFile(file);
            const previewUrl = URL.createObjectURL(file);
            setFormData({ ...formData, avatar: previewUrl });
            toast.success('Photo preview updated! Save to confirm.');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background-400/50 backdrop-blur-xl rounded-2xl border border-neutral-5/10 p-8 shadow-2xl"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Section */}
                <div>
                    <h3 className="text-xl font-bold text-neutral-5 mb-6 flex items-center gap-2">
                        <IconUser size={24} className="text-primary-500" />
                        Profile Information
                    </h3>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Avatar Preview */}
                        <div className="flex flex-col items-center gap-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            <div className="relative group" onClick={handleAvatarClick}>
                                <img
                                    src={formData.avatar || '/src/assets/images/cats/Cat (9).png'}
                                    alt="Profile Preview"
                                    className="w-32 h-32 rounded-2xl object-cover border-2 border-primary-500/30 group-hover:border-primary-500 transition-all cursor-pointer"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity cursor-pointer">
                                    <IconCamera size={24} className="text-white" />
                                </div>
                            </div>
                            <p className="text-xs text-neutral-5 italic">Click to change photo</p>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1">
                                    Username
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-5">@</span>
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1 flex items-center gap-2">
                            <IconFileText size={18} />
                            Bio
                        </label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full h-24 px-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all resize-none"
                        />
                    </div>
                </div>

                <div className="h-px bg-neutral-5/10" />

                {/* Social Links Section */}
                <div>
                    <h3 className="text-xl font-bold text-neutral-5 mb-6 flex items-center gap-2">
                        <IconShare size={24} className="text-primary-500" />
                        Social Links
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1 flex items-center gap-2">
                                <IconBrandDiscord size={18} />
                                Discord
                            </label>
                            <input
                                type="text"
                                value={formData.socialLinks.discord}
                                onChange={(e) => handleSocialChange('discord', e.target.value)}
                                placeholder="@username"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1 flex items-center gap-2">
                                <IconBrandGithub size={18} />
                                GitHub
                            </label>
                            <input
                                type="text"
                                value={formData.socialLinks.github}
                                onChange={(e) => handleSocialChange('github', e.target.value)}
                                placeholder="@username"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1 flex items-center gap-2">
                                <IconBrandLinkedin size={18} />
                                LinkedIn
                            </label>
                            <input
                                type="text"
                                value={formData.socialLinks.linkedin}
                                onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                                placeholder="/in/username"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-neutral-5 mb-1.5 ml-1 flex items-center gap-2">
                                <IconBrandTwitter size={18} />
                                Twitter
                            </label>
                            <input
                                type="text"
                                value={formData.socialLinks.twitter}
                                onChange={(e) => handleSocialChange('twitter', e.target.value)}
                                placeholder="@username"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-5/5 border border-neutral-5/10 text-neutral-5 focus:outline-none focus:border-primary-500/50 focus:bg-neutral-5/10 transition-all"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" isLoading={isSubmitting} className="w-full sm:w-auto">
                        <IconDeviceFloppy size={20} />
                        Save Changes
                    </Button>
                </div>
            </form>
        </motion.div>
    );
};

export default ProfileSettings;
