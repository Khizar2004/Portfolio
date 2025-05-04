import { useState, useEffect } from 'react';

/**
 * Custom hook to detect if the device is mobile
 * @param breakpoint Optional breakpoint width in pixels (default: 768)
 * @returns Boolean indicating if device is mobile
 */
const useIsMobile = (breakpoint: number = 768): boolean => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
        window.innerWidth < breakpoint;
      
      setIsMobile(isMobileDevice);
    };
    
    // Check on mount
    checkMobile();
    
    // Add listener for window resize
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);
  
  return isMobile;
};

export default useIsMobile; 