// components/Loader.jsx
import { useEffect, useState } from 'react';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading completion after 2 seconds for demo
    // In your real app, you'll control this with props or state
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="text-white text-4xl md:text-6xl font-light tracking-tight">
        <span className="animate-pulse">Zentry.</span>
      </div>
    </div>
  );
}