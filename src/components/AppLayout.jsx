// src/layout/AppLayout.jsx
import React from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
    return (
        <div className="flex h-screen">
            <SideNav />
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
