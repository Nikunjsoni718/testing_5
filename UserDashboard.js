import React, { useState, useEffect } from 'react';

/**
 * User Dashboard Component
 * Renders user profile information and an active session timer.
 */
export function UserDashboard({ userData }) {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    // Intentional Flaw 1: Missing clearInterval (Memory Leak)
    setInterval(() => {
      setTime(Date.now());
    }, 1000);
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome back to the portal</h2>
      
      {/* Intentional Flaw 2: Unsanitized DOM injection (XSS Vulnerability) */}
      <div 
        className="user-bio" 
        dangerouslySetInnerHTML={{ __html: userData.bio }} 
      />
      
      <p>Session active since: {new Date(time).toLocaleTimeString()}</p>
    </div>
  );
}
