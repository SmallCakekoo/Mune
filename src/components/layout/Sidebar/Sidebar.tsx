import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  IconHome,
  IconSearch,
  IconPlus,
  IconUser,
  IconSettings,
  IconMenu2,
  IconX,
} from '@tabler/icons-react';
import { useSidebar } from '../../../context/SidebarContext';
import { cn } from '../../../utils/cn';
// Import SVGs as React components or URLs
// const MuneLogoCollapsed = new URL('../../../assets/images/MuneCollapsed.svg', import.meta.url).href;
const MuneLogoExpanded = new URL('../../../assets/images/MuneExpanded.svg', import.meta.url).href;

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  path?: string;
  onClick?: () => void;
  isActive?: boolean;
}

interface SidebarProps {
  onCreateRoom?: () => void;
  userAvatar?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateRoom, userAvatar }) => {
  const { isCollapsed, setIsCollapsed, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    {
      id: 'home',
      icon: <IconHome size={24} />,
      label: 'Home',
      path: '/home',
      isActive: location.pathname === '/home',
    },
    {
      id: 'search',
      icon: <IconSearch size={24} />,
      label: 'Search',
      path: '/search',
      isActive: location.pathname === '/search',
    },
    {
      id: 'create',
      icon: <IconPlus size={24} />,
      label: 'Create Room',
      onClick: onCreateRoom,
    },
    {
      id: 'profile',
      icon: <IconUser size={24} />,
      label: 'Profile',
      path: '/profile',
      isActive: location.pathname.startsWith('/profile'),
    },
    {
      id: 'settings',
      icon: <IconSettings size={24} />,
      label: 'Settings',
      path: '/settings',
      isActive: location.pathname === '/settings',
    },
  ];

  const handleItemClick = (item: SidebarItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  // Default avatar path - Snow Cat uses Cat (9).png
  const defaultAvatar = userAvatar || '/src/assets/images/cats/Cat (9).png';

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCollapsed(true)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed left-0 top-0 h-screen bg-background-400/80 backdrop-blur-xl',
          'border-r border-white/10 z-40',
          'flex flex-col',
          // Mobile: hide when collapsed, Desktop: always visible
          isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="w-10 h-10 flex items-center justify-center"
              >

              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="h-8 flex items-center"
              >
                <img
                  src={MuneLogoExpanded}
                  alt="Mune"
                  className="h-8"
                  onError={(e) => {
                    // Fallback if image doesn't load
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-neutral-5 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <IconMenu2 size={20} /> : <IconX size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => handleItemClick(item)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer',
                'text-neutral-5 hover:text-white transition-colors',
                'hover:bg-white/10',
                item.isActive &&
                'bg-primary-500/20 text-white border border-primary-500/30'
              )}
              title={isCollapsed ? item.label : undefined}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </motion.button>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10">
          <div
            className={cn(
              'flex items-center gap-3 p-2 rounded-xl',
              'hover:bg-white/10 transition-colors cursor-pointer'
            )}
            onClick={() => navigate('/profile')}
          >
            <img
              src={defaultAvatar}
              alt="Profile"
              className={cn(
                'rounded-full object-cover border-2 border-primary-500/30',
                isCollapsed ? 'w-10 h-10' : 'w-12 h-12'
              )}
              onError={(e) => {
                e.currentTarget.src = '/src/assets/images/cats/Cat (9).png';
              }}
            />
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-white truncate">
                  Snow Cat
                </p>
                <p className="text-xs text-neutral-5 truncate">View Profile</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className={cn(
          'fixed top-4 left-4 z-50 p-3 rounded-xl',
          'bg-background-400/80 backdrop-blur-xl border border-white/10',
          'text-white hover:bg-white/10 transition-colors',
          'md:hidden', // Only show on mobile
          isCollapsed ? 'block' : 'hidden'
        )}
        aria-label="Open menu"
      >
        <IconMenu2 size={24} />
      </button>
    </>
  );
};

export default Sidebar;
