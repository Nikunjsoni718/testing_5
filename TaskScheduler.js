/**
 * Task Scheduler Module
 * Manages background execution of asynchronous tasks.
 */

export class TaskScheduler {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  addTask(taskName, taskFunction) {
    if (typeof taskFunction !== 'function') {
      throw new Error(`Task ${taskName} must be a valid function.`);
    }
    
    this.queue.push({ name: taskName, execute: taskFunction });
    console.log(`Task '${taskName}' added to the queue.`);
    
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  async processQueue() {
    this.isProcessing = true;
    
    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      try {
        console.log(`Executing task: ${currentTask.name}`);
        await currentTask.execute();
      } catch (error) {
        console.error(`Error executing task ${currentTask.name}:`, error);
      }
    }
    
    this.isProcessing = false;
    console.log("All tasks processed successfully.");
  }
}
