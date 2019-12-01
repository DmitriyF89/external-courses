import { createHeaderTemplate } from '../components/header/header.js';
import { createFooterTemplate } from '../components/footer/footer.js';
import { toggleUserMenu } from '../components/buttons/login-button/login-button.js';
import { createTaskSelect, createTaskInput } from '../components/task-block/task-block.js';
import { createMainContentTemplate } from '../components/main-content/main-content.js';

const
  state = JSON.parse(localStorage.getItem('kanbanBoardState')) ||
    [
      {
        title: 'Backlog',
        issues: []
      },
      {
        title: 'Ready',
        issues: []
      },
      {
        title: 'In progress',
        issues: []
      },
      {
        title: 'Finished',
        issues: []
      }
    ],
  root = document.getElementById('root');

let
  isInputShown = false,
  idCounter = +localStorage.getItem('kanbanBoardIdCounter') || 0;

function createAppTemplate(state) {
  root.innerHTML = '';
  root.insertAdjacentHTML('afterbegin', `
      <div class="kanban">
        ${createHeaderTemplate()}
        ${createMainContentTemplate(state)}
        ${createFooterTemplate(state[2].issues.length, state[3].issues.length)}
      </div>
    `)
}

createAppTemplate(state);
toggleUserMenu();

function blockButtonsIfNoIssues(state) {
  const addButtons = document.querySelectorAll('.add-button');

  state.forEach((element, index) => {
    if (!element.issues.length && index < state.length - 1) {
      addButtons[index + 1].classList.add('disabled');
      addButtons[index + 1].setAttribute('disabled', true);
    }
  });
}

blockButtonsIfNoIssues(state);

function blockAllAddButtons() {
  const addButtons = document.querySelectorAll('.add-button');
  if (isInputShown) {
    addButtons.forEach(element => {
      element.classList.add('disabled');
      element.setAttribute('disabled', true);
    });
  }
}

function updateKanbanStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function clickOnBacklogAddButton(event) {
  if (event.target.closest('[data-list-name = "Backlog"]') && !isInputShown) {
    isInputShown = true;
    blockAllAddButtons();
    event.target.closest('[data-list-name = "Backlog"]').insertAdjacentHTML('beforebegin', createTaskInput());
    const taskInput = document.querySelector('.task-block__input');
    taskInput.focus();

    function changeTaskInput() {
      if (taskInput.value.trim()) {
        idCounter++;
        const newTask = {
          title: taskInput.value,
          id: `task${idCounter}`
        }

        state[0].issues.push(newTask);
        taskInput.remove();
        isInputShown = false;
        createAppTemplate(state);
        toggleUserMenu();
        updateKanbanStorage('kanbanBoardState', state);
        updateKanbanStorage('kanbanBoardIdCounter', idCounter);
      }
    }

    taskInput.addEventListener('change', changeTaskInput);

    if (!taskInput.value.trim()) {
      function removeEmptyInput() {
        taskInput.remove();
        isInputShown = false;
        createAppTemplate(state);
        toggleUserMenu();
        blockButtonsIfNoIssues(state);
      }

      taskInput.addEventListener('blur', removeEmptyInput);
    }
  }
}

function clickOnNotBacklogAddButton(event) {
  const currentButton = event.target.closest('[data-list-name]');

  function refreshProcedure() {
    createAppTemplate(state);
    toggleUserMenu();
    blockButtonsIfNoIssues(state);
    updateKanbanStorage('kanbanBoardState', state);
    isInputShown = false;
  }

  if (currentButton && !event.target.closest('[data-list-name = "Backlog"]') && !isInputShown) {
    const
      currentIndex = state.findIndex((elem) => {
        return elem.title === currentButton.dataset.listName;
      });

    let
      currentList = state[currentIndex].issues,
      prevList = state[currentIndex - 1].issues;

    if (state[currentIndex - 1].issues.length) {
      isInputShown = true;
      blockAllAddButtons();
      const tasksForSelect = createTaskSelect(state[currentIndex - 1].issues);
      currentButton.insertAdjacentHTML('beforebegin', tasksForSelect);
      const tasksForSelectDOMElem = document.querySelector('.task-block__select');
      tasksForSelectDOMElem.focus();

      tasksForSelectDOMElem.addEventListener('blur', refreshProcedure);

      function changeTasksForSelect() {
        const
          selectedOption = tasksForSelectDOMElem.options[tasksForSelectDOMElem.options.selectedIndex],
          newPrevList = prevList.filter(elem => elem.id !== selectedOption.dataset.taskId) || [],
          transferItem = {
            title: selectedOption.value,
            id: selectedOption.dataset.taskId
          };

        currentList.push(transferItem);
        prevList = [...newPrevList];
        state[currentIndex - 1].issues = prevList;
        state[currentIndex].issues = currentList;
        refreshProcedure();
      }

      tasksForSelectDOMElem.addEventListener('change', changeTasksForSelect)
    }
  }
}

document.addEventListener('click', clickOnBacklogAddButton);
document.addEventListener('click', clickOnNotBacklogAddButton);