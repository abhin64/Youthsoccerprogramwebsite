interface DecorativeCirclesProps {
  variant?: 'hero' | 'section' | 'footer';
}

export function DecorativeCircles({ variant = 'section' }: DecorativeCirclesProps) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-[#E53935] to-[#c62828] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-gradient-to-br from-[#1E88E5] to-[#1565c0] rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-[#43A047] to-[#2e7d32] rounded-full opacity-10 blur-3xl"></div>
        
        {/* Small accent circles */}
        <div className="absolute top-20 left-1/4 w-12 h-12 bg-[#E53935] rounded-full opacity-20"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#1E88E5] rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-1/3 w-10 h-10 bg-[#43A047] rounded-full opacity-20"></div>
        
        {/* Soccer ball patterns */}
        <div className="absolute top-40 right-1/4 text-6xl opacity-5">⚽</div>
        <div className="absolute bottom-40 left-1/4 text-5xl opacity-5">⚽</div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-40 h-40 bg-gradient-to-br from-[#E53935] to-[#c62828] rounded-full opacity-5 blur-2xl"></div>
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-gradient-to-br from-[#1E88E5] to-[#1565c0] rounded-full opacity-5 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/2 w-36 h-36 bg-gradient-to-br from-[#43A047] to-[#2e7d32] rounded-full opacity-5 blur-2xl"></div>
      </div>
    );
  }

  // Default 'section' variant
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient circles */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-gradient-to-br from-[#E53935] to-[#c62828] rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute bottom-0 -left-16 w-56 h-56 bg-gradient-to-br from-[#1E88E5] to-[#1565c0] rounded-full opacity-10 blur-2xl"></div>
      <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-gradient-to-br from-[#43A047] to-[#2e7d32] rounded-full opacity-10 blur-2xl"></div>
      
      {/* Small accent circles */}
      <div className="absolute top-10 left-1/3 w-6 h-6 bg-[#E53935] rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-5 h-5 bg-[#1E88E5] rounded-full opacity-20"></div>
      <div className="absolute top-1/3 right-1/3 w-7 h-7 bg-[#43A047] rounded-full opacity-20"></div>
    </div>
  );
}
