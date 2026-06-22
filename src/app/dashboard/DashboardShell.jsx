"use client";

import SideNav from "../../components/dashbaord/SideNav";
import TopNav from "../../components/dashbaord/TopNav";
import { useState } from "react";

const DashboardShell = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="h-screen flex">
      <SideNav
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div className="flex flex-col flex-1">
        <TopNav
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
}

export default DashboardShell;
