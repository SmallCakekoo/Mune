import React, { useState, useEffect } from 'react';
import { SidebarContext } from './SidebarContext';

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => setIsCollapsed(prev => !prev);

    // Close sidebar on small screens by default or when path changes
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setIsCollapsed(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
