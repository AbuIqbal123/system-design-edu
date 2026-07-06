import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';

const formatTime = (ns) => {
  if (ns < 1000) return `${ns} ns`;
  if (ns < 1000000) return `${(ns / 1000).toFixed(0)} μs`;
  return `${(ns / 1000000).toFixed(0)} ms`;
};

function getColorClass(ns) {
  if (ns < 1000) return 'ns';
  if (ns < 1000000) return 'us';
  return 'ms';
}

function getBarWidth(ns) {
  const maxNs = 150000000;
  const percent = (Math.log10(Math.max(ns, 1)) / Math.log10(maxNs)) * 100;
  return Math.min(Math.max(percent, 2), 100);
}

export default function LatencyChart({ data = [] }) {
  const chartRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="latency-chart" ref={chartRef}>
      {data.map((item, index) => {
        const ns = item.unit === 'ns' ? item.time
          : item.unit === 'us' ? item.time * 1000
          : item.time * 1000000;
        const width = getBarWidth(ns);
        const colorClass = getColorClass(ns);

        return (
          <div key={index} className="latency-bar-item">
            <div className="latency-bar-label">{item.operation}</div>
            <div className="latency-bar-track">
              <div
                className={`latency-bar-fill ${colorClass}`}
                style={{
                  width: visible ? `${width}%` : '0%',
                  transitionDelay: `${index * 60}ms`,
                }}
              />
            </div>
            <div className="latency-bar-value">
              {formatTime(ns)}
              {item.note && <span title={item.note}> <Icon name="info" size={14} /></span>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
