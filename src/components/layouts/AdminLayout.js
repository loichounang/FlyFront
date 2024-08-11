import React from 'react';
import Sidebar from "../admin/Sidebar/SideBar";
import Navbar from "../admin/Navbar/Navbar";
import "./AdminLayout.css";

const AppBaseLayout = ({ children }) => (
    <div className="app-layout">
        <Sidebar />
            <div className="content-wrapper">
                <Navbar />
                <main className="main-content">
                    {children}
                </main>
            </div>
        </div>
    );

export default AppBaseLayout;
