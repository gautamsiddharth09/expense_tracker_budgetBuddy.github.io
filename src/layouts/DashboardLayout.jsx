import React from "react";
//react-hot-toast me Toaster = popup message system
import { Toaster } from "react-hot-toast";

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col">
      {/* Toast */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1f2937",
            color: "#fff",
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            iconTheme: { primary: "#10b981", secondary: "#ffffff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#ffffff" },
          
          },
        }}
      />

      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col items-center gap-1 text-center">
           <h1
  className="
    text-3xl sm:text-4xl md:text-5xl
    font-bold tracking-tight
    bg-gradient-to-r from-gray-700 via-gray-800 to-gray-800
    bg-clip-text text-transparent
    drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]
    leading-tight
  "
>
  Budget Buddy
</h1>


            <p className="text-gray-500 text-sm font-medium tracking-wide">
              “Your Money, Your Control. Track. Save and Grow with BudgetBuddy.”
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 min-h-[500px]">
          {children}
        </div>
      </main>

      {/* Footer */}
     <footer className="bg-white border-t py-4 mt-6 shadow-inner">
  <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
    <p className="font-medium tracking-wide">
      Your privacy matters. All your data is stored securely on your device.  
      <span className="font-semibold text-gray-700"> BudgetBuddy </span>
      &copy; {new Date().getFullYear()}
    </p>
  </div>
</footer>

    </div>
  );
};

export default DashboardLayout;
