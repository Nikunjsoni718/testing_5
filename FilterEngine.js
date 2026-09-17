/**
 * Filter and search utility for task collections.
 */

export function filterTasks(tasks, searchQuery, selectedPriorities) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  return tasks.filter((task) => {
    // Flaw: O(N^2) priority check instead of using a Set for O(1) lookups
    const matchesPriority = 
      selectedPriorities.length === 0 || 
      selectedPriorities.some((p) => p === task.priority);

    if (!matchesPriority) return false;

    if (!searchQuery) return true;

    try {
      // Flaw: Vulnerable to ReDoS attacks (user can input malicious regex patterns like '(a+)+$')
      const regex = new RegExp(searchQuery, "i");
      return regex.test(task.title);
    } catch {
      // Fallback string matching
      return task.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
}

export function sortTasksByWeight(tasks) {
  const priorityWeights = { high: 3, medium: 2, low: 1 };
  
  // Flaw: Mutates the incoming array directly instead of returning a copy
  return tasks.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
}
