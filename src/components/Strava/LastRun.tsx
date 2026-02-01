"use client";

import { useEffect, useState } from 'react';
import { SiStrava } from 'react-icons/si';
import styles from './Strava.module.css';

interface RunData {
  name?: string;
  distance?: number;
  moving_time?: number;
  start_date?: string;
  average_speed?: number;
  url?: string;
}

interface StravaResponse {
  valid: boolean;
  runs?: RunData[];
}

function formatDistance(meters: number) {
  return (meters / 1000).toFixed(2) + ' km';
}

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function formatPace(speedMetersPerSecond: number) {
  if (!speedMetersPerSecond || speedMetersPerSecond === 0) return '-';
  const secondsPerKm = 1000 / speedMetersPerSecond;
  const m = Math.floor(secondsPerKm / 60);
  const s = Math.floor(secondsPerKm % 60);
  return `${m}:${s.toString().padStart(2, '0')}/km`;
}

export default function LastRun() {
  const [data, setData] = useState<StravaResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/Portfolio/api/strava');
        if (res.ok) {
           const json = await res.json();
           setData(json);
        }
      } catch {
        // Silently fail for UI polishes
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading || !data?.valid || !data?.runs) return null;

  return (
    <div className={styles.tickerContainer}>
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerContent}>
          {data.runs.map((run, index) => (
            <a 
              key={index}
              href={run.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.link}
              style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
            >
              <SiStrava size={20} />
              <span className={styles.statItem}>
                RUN {index + 1}: <strong>{run.name}</strong>
              </span>
              <span className={styles.separator}>|</span>
              <span className={styles.statItem}>
                <span className={styles.label}>Distance</span>
                {run.distance && formatDistance(run.distance)}
              </span>
              <span className={styles.separator}>|</span>
              <span className={styles.statItem}>
                <span className={styles.label}>Time</span>
                {run.moving_time && formatTime(run.moving_time)}
              </span>
              <span className={styles.separator}>|</span>
              <span className={styles.statItem}>
                <span className={styles.label}>Pace</span>
                {run.average_speed && formatPace(run.average_speed)}
              </span>
              {index < (data.runs?.length || 0) - 1 && (
                <span className={styles.separator} style={{ marginLeft: '1rem', marginRight: '1rem' }}></span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
