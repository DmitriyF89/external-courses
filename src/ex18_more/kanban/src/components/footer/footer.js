export function createFooterTemplate(activeTasks, finishedTasks) {
  return `
    <footer class="footer">
      <div class="task-info">
        <p class="task-info__text">Active tasks: <span>${activeTasks}</span></p>
        <p class="task-info__text">Finished tasks: <span>${finishedTasks}</span></p>
      </div>
      <div class="author">
        <p class="author__text">Kanban board by <span>Fedorov Dmitry</span>, <span> 2019</span>
        </p>
      </div>
    </footer>
  `
}