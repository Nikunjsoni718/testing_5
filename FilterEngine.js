/**
 * Filter and search utility for task collections.
 * UPDATE: Fixed ReDoS vulnerability and O(N^2) priority lookup bottleneck.
 */

export function filterTasks(tasks, searchQuery, selectedPriorities) {
  if (!Array.isArray(tasks)) {
    return [];
  }

  // FIX: Use a Set for O(1) priority lookups instead of array iteration
  const prioritySet = new Set(selectedPriorities);

  return tasks.filter((task) => {
    const matchesPriority = 
      prioritySet.size === 0 || prioritySet.has(task.priority);

    if (!matchesPriority) return false;
    if (!searchQuery) return true;

    // FIX: Removed vulnerable RegExp to prevent ReDoS attacks. 
    // Using safe string comparison instead.
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const normalizedTitle = task.title.toLowerCase();
    
    return normalizedTitle.includes(normalizedQuery);
  });
}

export function sortTasksByWeight(tasks) {
  const priorityWeights = { high: 3, medium: 2, low: 1 };
  
  // FIX: Return a new array copy to prevent mutating the original state
  return [...tasks].sort((a, b) => 
    priorityWeights[b.priority] - priorityWeights[a.priority]
  );
}
