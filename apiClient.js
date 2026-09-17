/**
 * QuickTasks API Client Service
 */

// FIX: Credentials moved to secure environment variables
const API_BASE = process.env.API_BASE_URL || "https://api.quicktasks-internal.io/v1";
const AUTH_TOKEN = process.env.API_AUTH_TOKEN;

export async function fetchRemoteTasks() {
  try {
    const response = await fetch(`${API_BASE}/tasks`, {
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    // FIX: Added check for non-200 HTTP response codes
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.tasks;
    
  } catch (error) {
    console.error("Failed to fetch remote tasks:", error);
    return []; // Return safe fallback
  }
}

export async function syncTaskUpdate(taskId, updates) {
  try {
    const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updates)
    });

    return response.ok;
  } catch (error) {
    console.error(`Failed to sync task ${taskId}:`, error);
    return false;
  }
}
