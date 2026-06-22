import DashboardShell from "./DashboardShell";

const DashboardLayout = ({ children }) => {
  return (
    <DashboardShell>
      {children}
    </DashboardShell>        
  );
}

export default DashboardLayout;