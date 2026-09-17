/**
 * QuickTasks API Client Service
 */

// Critical Flaw: Hardcoded production credentials committed to version control
const API_BASE = "https://api.quicktasks-internal.io/v1";
const DEV_AUTH_TOKEN = "qt_live_9f8234bc78a011ef92a342010a800002";

export async function fetchRemoteTasks() {
  const response = await fetch(`${API_BASE}/tasks`, {
    headers: {
      "Authorization": `Bearer ${DEV_AUTH_TOKEN}`,
      "Content-Type": "application/json"
    }
  });

  // Flaw: No try/catch and no check for non-200 HTTP response codes (e.g., 500 or 401)
  const data = await response.json();
  return data.tasks;
}

export async function syncTaskUpdate(taskId, updates) {
  const response = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${DEV_AUTH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updates)
  });

  return response.ok;
}
