import React, { useState } from "react";
import { Home, Store, Menu, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Shops", icon: Store, path: "/shops" },
  { label: "Users", icon: Users, path: "/users" },
];

export default function SideNav() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={clsx(
        "h-screen transition-all duration-300 shadow-lg flex flex-col",
        collapsed ? "w-16" : "w-64",
        "bg-slate-900 text-white"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && <h1 className="text-xl font-bold text-white">MyApp</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-2 space-y-2">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-[#6EC1F6] text-white shadow-md"
                  : "hover:bg-slate-700 text-slate-300"
              )}
            >
              <Icon size={20} />
              {!collapsed && <span className="text-sm font-medium">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 text-xs text-slate-500">
          &copy; 2025 MyApp. All rights reserved.
        </div>
      )}
    </aside>
  );
}
