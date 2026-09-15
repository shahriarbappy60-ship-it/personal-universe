import { useState, useEffect } from 'react';

export function useDhakaClock() {
  const [time, setTime] = useState('00:00:00');

  useEffect(() => {
    function updateClock() {
      const now = new Date();
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Dhaka',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setTime(formatter.format(now));
      } catch {
        setTime(now.toLocaleTimeString());
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
