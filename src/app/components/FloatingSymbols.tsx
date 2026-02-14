export function FloatingSymbols() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Floating soccer balls */}
      <div className="absolute top-20 left-10 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
        ⚽
      </div>
      <div className="absolute top-40 right-20 text-3xl opacity-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
        ⚽
      </div>
      <div className="absolute bottom-32 left-1/4 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}>
        ⚽
      </div>
      <div className="absolute bottom-20 right-1/3 text-3xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3.5s' }}>
        ⚽
      </div>
      
      {/* Stars for achievement */}
      <div className="absolute top-1/3 left-20 text-2xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}>
        ⭐
      </div>
      <div className="absolute top-2/3 right-16 text-2xl opacity-10 animate-pulse" style={{ animationDelay: '1.5s' }}>
        ⭐
      </div>
      
      {/* Trophy symbols */}
      <div className="absolute top-1/2 left-10 text-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}>
        🏆
      </div>
      <div className="absolute bottom-40 right-10 text-3xl opacity-10 animate-pulse" style={{ animationDelay: '0s' }}>
        🏆
      </div>
      
      {/* Whistle */}
      <div className="absolute top-60 right-1/4 text-2xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}>
        🎯
      </div>
      
      {/* Heart symbols for health */}
      <div className="absolute bottom-1/3 left-1/3 text-2xl opacity-10 animate-pulse" style={{ animationDelay: '2.5s' }}>
        ❤️
      </div>
      
      {/* Colored circles */}
      <div className="absolute top-10 right-1/3 w-3 h-3 bg-[#E53935] rounded-full opacity-30 animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
      <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-[#1E88E5] rounded-full opacity-30 animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
      <div className="absolute bottom-1/4 right-1/2 w-3 h-3 bg-[#43A047] rounded-full opacity-30 animate-ping" style={{ animationDelay: '2s', animationDuration: '3.5s' }}></div>
      <div className="absolute top-3/4 left-1/4 w-2 h-2 bg-[#E53935] rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s', animationDuration: '5s' }}></div>
      <div className="absolute top-1/2 right-20 w-3 h-3 bg-[#1E88E5] rounded-full opacity-30 animate-ping" style={{ animationDelay: '1.5s', animationDuration: '4s' }}></div>
    </div>
  );
}
