import { useEffect, useState } from 'react';
// Updated to import directly from the same folder
import { fetchRemoteTasks } from './apiClient';

/**
 * Hook to automatically synchronize tasks with the remote server.
 */
export function useAutoSync(pollingIntervalMs = 30000) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  useEffect(() => {
    // Flaw: setInterval is initialized without a cleanup function returned from useEffect.
    // Every time this effect runs or remounts, an uncollected interval timer leaks memory.
    setInterval(async () => {
      setIsSyncing(true);
      try {
        await fetchRemoteTasks();
        setLastSyncTime(new Date());
      } finally {
        setIsSyncing(false);
      }
    }, pollingIntervalMs);
  }, [pollingIntervalMs]);

  return { isSyncing, lastSyncTime };
}
