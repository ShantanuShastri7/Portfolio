"use client";


import LastRun from '../Strava/LastRun';
import styles from './StatusHub.module.css';

export default function StatusHub() {
  return (
    <div className={styles.hub}>

      <LastRun />
    </div>
  );
}
