const BlockchainAnimation = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="animate-pulse"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Blockchain nodes */}
        <g className="opacity-80">
          {/* Central hub */}
          <circle
            cx="200"
            cy="200"
            r="30"
            fill="#0D9488"
            className="animate-pulse"
          />
          
          {/* Surrounding nodes */}
          <circle cx="120" cy="120" r="20" fill="#64748B" className="animate-bounce" style={{ animationDelay: "0.5s" }} />
          <circle cx="280" cy="120" r="20" fill="#64748B" className="animate-bounce" style={{ animationDelay: "1s" }} />
          <circle cx="350" cy="200" r="20" fill="#64748B" className="animate-bounce" style={{ animationDelay: "1.5s" }} />
          <circle cx="280" cy="280" r="20" fill="#64748B" className="animate-bounce" style={{ animationDelay: "2s" }} />
          <circle cx="120" cy="280" r="20" fill="#64748B" className="animate-bounce" style={{ animationDelay: "2.5s" }} />
          <circle cx="50" cy="200" r="20" fill="#64748B" className="animate-bounce" style={{ animationDelay: "3s" }} />
          
          {/* Connection lines */}
          <line x1="200" y1="200" x2="120" y2="120" stroke="#0D9488" strokeWidth="2" className="opacity-60" />
          <line x1="200" y1="200" x2="280" y2="120" stroke="#0D9488" strokeWidth="2" className="opacity-60" />
          <line x1="200" y1="200" x2="350" y2="200" stroke="#0D9488" strokeWidth="2" className="opacity-60" />
          <line x1="200" y1="200" x2="280" y2="280" stroke="#0D9488" strokeWidth="2" className="opacity-60" />
          <line x1="200" y1="200" x2="120" y2="280" stroke="#0D9488" strokeWidth="2" className="opacity-60" />
          <line x1="200" y1="200" x2="50" y2="200" stroke="#0D9488" strokeWidth="2" className="opacity-60" />
          
          {/* Outer connections */}
          <line x1="120" y1="120" x2="280" y2="120" stroke="#64748B" strokeWidth="1" className="opacity-40" />
          <line x1="280" y1="120" x2="350" y2="200" stroke="#64748B" strokeWidth="1" className="opacity-40" />
          <line x1="350" y1="200" x2="280" y2="280" stroke="#64748B" strokeWidth="1" className="opacity-40" />
          <line x1="280" y1="280" x2="120" y2="280" stroke="#64748B" strokeWidth="1" className="opacity-40" />
          <line x1="120" y1="280" x2="50" y2="200" stroke="#64748B" strokeWidth="1" className="opacity-40" />
          <line x1="50" y1="200" x2="120" y2="120" stroke="#64748B" strokeWidth="1" className="opacity-40" />
        </g>
        
        {/* Data flowing animation */}
        <g className="opacity-70">
          <circle r="3" fill="#2563EB" className="animate-ping">
            <animateMotion dur="4s" repeatCount="indefinite">
              <path d="M 200,200 L 120,120 L 280,120 L 350,200 L 280,280 L 120,280 L 50,200 Z" />
            </animateMotion>
          </circle>
        </g>
      </svg>
    </div>
  );
};

export default BlockchainAnimation;
