import Navbar from "../components/sections/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import BalanceCard from "../components/dashboard/BalanceCard";
import TransactionHistory from "../components/dashboard/TransactionHistory";
import QuickActions from "../components/dashboard/QuickActions";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DashboardHeader />
          <DashboardStats />
          
          {/* Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <BalanceCard />
              <TransactionHistory />
            </div>
            
            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
