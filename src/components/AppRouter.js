// src/components/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from '../config/routes';
import AppBaseLayout from './layouts/AdminLayout';
import WebLayout from "./layouts/WebLayout";

const AppRouter = () => (
    <Router>
        <Routes>
            {routes.map((route, index) => {
                const Layout = route.layout === "admin" ? AppBaseLayout : WebLayout;
                const Component = route.component;
                return (
                    <Route 
                        key={index}
                        path={route.path}
                        element={<Layout><Component /></Layout>}
                    />
                )
            })}
        </Routes>
    </Router>
);

export default AppRouter;
