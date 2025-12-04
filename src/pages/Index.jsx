import React from "react";

import { ExpenseProvider } from "../Context/ExpenseContext";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../Components/Dashboard";



const Index = () => {
  return (
    <ExpenseProvider>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ExpenseProvider>
  );
};

export default Index;