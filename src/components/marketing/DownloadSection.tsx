import React from 'react';
import { Smartphone, Monitor, Globe, Download } from 'lucide-react';

const DownloadSection: React.FC = () => {
  const platforms = [
    {
      name: 'iOS',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'Available on the App Store',
      badge: 'NEW',
      link: '#',
      version: 'v2.1.0'
    },
    {
      name: 'Android',
      icon: <Smartphone className="w-8 h-8" />,
      description: 'Get it on Google Play',
      badge: 'UPDATED',
      link: '#',
      version: 'v2.1.0'
    },
    {
      name: 'Desktop',
      icon: <Monitor className="w-8 h-8" />,
      description: 'Windows, macOS, Linux',
      badge: '',
      link: '#',
      version: 'v2.0.8'
    },
    {
      name: 'Web App',
      icon: <Globe className="w-8 h-8" />,
      description: 'Access from any browser',
      badge: 'BETA',
      link: '#',
      version: 'v1.5.2'
    }
  ];

  const stats = [
    { label: 'Downloads', value: '50K+' },
    { label: 'Countries', value: '120+' },
    { label: 'Languages', value: '15' },
    { label: 'Rating', value: '4.9★' }
  ];

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Download AlgoWallet
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Available on all your favorite platforms. Start managing your crypto portfolio today.
          </p>
        </div>

        {/* Download Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-teal-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow duration-300 relative"
            >
              {platform.badge && (
                <div className="absolute -top-2 -right-2 bg-teal-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {platform.badge}
                </div>
              )}
              
              <div className="text-teal-600 mb-4 flex justify-center">
                {platform.icon}
              </div>
              
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {platform.name}
              </h3>
              
              <p className="text-sm text-slate-600 mb-3">
                {platform.description}
              </p>
              
              <p className="text-xs text-slate-500 mb-4">
                {platform.version}
              </p>
              
              <a
                href={platform.link}
                className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            </div>
          ))}
        </div>

        {/* QR Code Section */}
        <div className="bg-white rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Quick Download with QR Code
          </h3>
          <p className="text-slate-600 mb-6">
            Scan the QR code below to download directly to your mobile device
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-12">
            <div className="text-center">
              <div className="w-40 h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <div className="text-6xl">📱</div>
              </div>
              <p className="text-sm text-slate-600">iOS App Store</p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 bg-slate-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <div className="text-6xl">🤖</div>
              </div>
              <p className="text-sm text-slate-600">Google Play Store</p>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12 bg-white rounded-lg p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
            System Requirements
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">iOS</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>iOS 13.0 or later</li>
                <li>iPhone 6s or newer</li>
                <li>50 MB storage space</li>
                <li>Internet connection</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Android</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>Android 7.0 (API 24)</li>
                <li>2 GB RAM minimum</li>
                <li>100 MB storage space</li>
                <li>Internet connection</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Desktop</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>Windows 10/macOS 10.15</li>
                <li>4 GB RAM minimum</li>
                <li>200 MB storage space</li>
                <li>Internet connection</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-3">Web Browser</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>Chrome 90+</li>
                <li>Firefox 88+</li>
                <li>Safari 14+</li>
                <li>Edge 90+</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-yellow-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Security Notice</h4>
              <p className="text-sm text-yellow-700">
                Always download AlgoWallet from official sources only. Beware of fake applications and phishing attempts. 
                Verify the developer name before installing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadSection;
