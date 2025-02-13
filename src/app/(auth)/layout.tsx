import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    
    return (
        <div>
            <div className="text-gray-900 antialiased bg-gray-300">
                {children}
            </div>
        </div>
    );
};

export default Layout;
