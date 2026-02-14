import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  variant?: 'default' | 'stacked';
  linkable?: boolean;
}

export function Logo({ 
  size = 'medium', 
  showText = true, 
  variant = 'default',
  linkable = true 
}: LogoProps) {
  const sizeClasses = {
    small: { circle: 'w-7 h-7', text: 'text-base', spacing: 'gap-1', textSpacing: 'ml-1.5' },
    medium: { circle: 'w-10 h-10', text: 'text-xl', spacing: 'gap-1.5', textSpacing: 'ml-2' },
    large: { circle: 'w-16 h-16', text: 'text-4xl', spacing: 'gap-2', textSpacing: 'ml-3' },
  };

  const classes = sizeClasses[size];

  const logoContent = variant === 'stacked' ? (
    <div className="flex flex-col items-center gap-3">
      <div className={`flex items-center ${classes.spacing}`}>
        <div className={`${classes.circle} rounded-full bg-gradient-to-br from-[#E53935] to-[#c62828] flex items-center justify-center text-white font-poppins font-bold shadow-lg transform hover:scale-110 transition-transform duration-300`}>
          <span className={classes.text}>A</span>
        </div>
        <div className={`${classes.circle} rounded-full bg-gradient-to-br from-[#1E88E5] to-[#1565c0] flex items-center justify-center text-white font-poppins font-bold shadow-lg transform hover:scale-110 transition-transform duration-300 -ml-4`}>
          <span className={classes.text}>A</span>
        </div>
        <div className={`${classes.circle} rounded-full bg-gradient-to-br from-[#43A047] to-[#2e7d32] flex items-center justify-center text-white font-poppins font-bold shadow-lg transform hover:scale-110 transition-transform duration-300 -ml-4`}>
          <span className={classes.text}>A</span>
        </div>
      </div>
      {showText && (
        <div className="text-center">
          <div className={`font-poppins font-bold text-gray-900 ${classes.text}`}>
            AAA Sports Camp
          </div>
          <div className="text-xs text-gray-600 font-inter">Sammamish, WA</div>
        </div>
      )}
    </div>
  ) : (
    <div className="flex items-center">
      <div className={`flex items-center ${classes.spacing}`}>
        <div className={`${classes.circle} rounded-full bg-gradient-to-br from-[#E53935] to-[#c62828] flex items-center justify-center text-white font-poppins font-bold shadow-lg transform hover:scale-110 transition-transform duration-300`}>
          <span className={classes.text}>A</span>
        </div>
        <div className={`${classes.circle} rounded-full bg-gradient-to-br from-[#1E88E5] to-[#1565c0] flex items-center justify-center text-white font-poppins font-bold shadow-lg transform hover:scale-110 transition-transform duration-300 -ml-4`}>
          <span className={classes.text}>A</span>
        </div>
        <div className={`${classes.circle} rounded-full bg-gradient-to-br from-[#43A047] to-[#2e7d32] flex items-center justify-center text-white font-poppins font-bold shadow-lg transform hover:scale-110 transition-transform duration-300 -ml-4`}>
          <span className={classes.text}>A</span>
        </div>
      </div>
      {showText && (
        <span className={`${classes.textSpacing} font-poppins font-semibold text-gray-900 ${classes.text}`}>
          Sports Camp
        </span>
      )}
    </div>
  );

  if (linkable) {
    return (
      <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
        {logoContent}
      </Link>
    );
  }

  return <div className="inline-block">{logoContent}</div>;
}