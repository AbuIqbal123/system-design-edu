import { useState, useEffect } from 'react';

export default function ReadingProgress({ sidebarOpen }) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollPercent(Math.min((scrollTop / docHeight) * 100, 100));
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`reading-progress${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <div
        className="reading-progress-fill"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
}
