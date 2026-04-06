import React, { useEffect } from 'react';

interface PixelProps {
  pixelId: string | undefined;
}

export const MetaPixel: React.FC<PixelProps> = ({ pixelId }) => {
  useEffect(() => {
    if (!pixelId) return;

    // Initialize Pixel
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');

    // Time-based events
    const timers = [
      { time: 30000, event: 'Time_30s' },
      { time: 60000, event: 'Time_60s' },
      { time: 120000, event: 'Time_120s' },
    ].map(({ time, event }) => 
      setTimeout(() => window.fbq('trackCustom', event), time)
    );

    // Scroll-based events
    const scrollPoints = [25, 50, 75, 95];
    const trackedScroll = new Set<number>();

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      scrollPoints.forEach(point => {
        if (scrollPercent >= point && !trackedScroll.has(point)) {
          window.fbq('trackCustom', `Scroll_${point}`);
          trackedScroll.add(point);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pixelId]);

  return null;
};

declare global {
  interface Window {
    fbq: any;
    _fbq: any;
  }
}
