import React from 'react';
import Footer from "../web/Footer";
import TopNav from "../web/TopNav";
import MainNav from "../web/MainNav";

const WebBaseLayout = ({children}) => (
    <div>
        <TopNav />
        <MainNav />
        <main>
            {children}
        </main>
        <Footer />
    </div>
);

export default WebBaseLayout;
