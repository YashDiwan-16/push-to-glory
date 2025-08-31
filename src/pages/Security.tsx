import Navbar from "../components/sections/Navbar";
import SecurityHeader from "../components/security/SecurityHeader";
import SecurityOverview from "../components/security/SecurityOverview";
import TwoFactorAuth from "../components/security/TwoFactorAuth";
import BackupPhrase from "../components/security/BackupPhrase";
import SecurityAuditLog from "../components/security/SecurityAuditLog";

const Security = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Main Content */}
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SecurityHeader />
          <SecurityOverview />
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <TwoFactorAuth />
            <BackupPhrase />
          </div>
          
          <SecurityAuditLog />
        </div>
      </main>
    </div>
  );
};

export default Security;
