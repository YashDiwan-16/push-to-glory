const LoadingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">Loading...</h2>
        <p className="text-slate-500">Please wait while we prepare your wallet</p>
      </div>
    </div>
  );
};

export default LoadingPage;
