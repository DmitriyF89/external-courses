import { createHeaderTemplate } from '../components/header/header.js';
import { createFooterTemplate } from '../components/footer/footer.js';
import { toggleUserMenu } from '../components/buttons/login-button/login-button.js';
import { createTaskSelect, createTaskInput } from '../components/task-block/task-block.js';
import { createMainContentTemplate } from '../components/main-content/main-content.js';
import { createNewListMenuTemplate } from '../components/new-list-menu/new-list-menu.js';
import { createContextMenu } from '../components/buttons/context-menu-button/context-menu-button.js';

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
        ${createFooterTemplate(state[0].issues.length, state[state.length - 1].issues.length)}
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
  const addButtonsList = document.getElementsByClassName('add-button');
  if (event.target.closest('[data-list-name]') === addButtonsList[0] && !isInputShown) {
    isInputShown = true;
    blockAllAddButtons();
    addButtonsList[0].insertAdjacentHTML('beforebegin', createTaskInput());
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
  const addButtonsList = document.getElementsByClassName('add-button');

  function refreshProcedure() {
    createAppTemplate(state);
    toggleUserMenu();
    blockButtonsIfNoIssues(state);
    updateKanbanStorage('kanbanBoardState', state);
    isInputShown = false;
  }

  if (currentButton &&
    event.target.closest('[data-list-name]') !== addButtonsList[0] &&
    !isInputShown) {
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

function addNewTaskBlock(event) {
  if (event.target.closest('.new-list-button')) {
    document.querySelector('.main-content').insertAdjacentHTML('afterbegin', createNewListMenuTemplate());
    isInputShown = true;
    blockAllAddButtons();

    const NewTaskBlockInput = document.querySelector('.new-list-menu__input');
    NewTaskBlockInput.focus();

    function changeNewTaskBlockInput() {
      if (NewTaskBlockInput.value.trim()) {
        const newTaskList = {
          title: NewTaskBlockInput.value,
          issues: []
        }

        state.unshift(newTaskList);
        console.log(state);
        NewTaskBlockInput.remove();
        isInputShown = false;
        createAppTemplate(state);
        toggleUserMenu();
        updateKanbanStorage('kanbanBoardState', state);
      }
    }

    NewTaskBlockInput.addEventListener('change', changeNewTaskBlockInput);

    if (!NewTaskBlockInput.value.trim()) {
      function removeEmptyInput() {
        NewTaskBlockInput.remove();
        isInputShown = false;
        createAppTemplate(state);
        toggleUserMenu();
        blockButtonsIfNoIssues(state);
      }

      NewTaskBlockInput.addEventListener('blur', removeEmptyInput);
    }

  }
}

function openContextMenu(event) {
  if (event.target.closest('.context-menu-button')) {
    const currentTaskListIndex = event.target.closest('.context-menu-button').dataset.taskList;
    const left = (event.view.screen.availWidth - event.clientX) < 200 ? event.clientX - 170 : event.clientX;
    document.querySelector('.main-content').insertAdjacentHTML('afterend', createContextMenu(left, currentTaskListIndex));
    const contentMenu = document.querySelector('.context-menu-button__options');

    function hideContextMenu(event) {
      if (event.target.closest('.context-menu-button__options') !== contentMenu) {
        contentMenu.remove();
      }
    }
    document.addEventListener('mousedown', hideContextMenu);
  }
}

function deleteTaskList(event) {
  if (event.target.closest('.context-menu-button__sub-button') &&
    event.target.closest('.context-menu-button__sub-button').textContent === 'Delete list') {
    const listIndex = event.target.closest('.context-menu-button__options').dataset.listNumber;
    state.splice(listIndex, 1);
    createAppTemplate(state);
    toggleUserMenu();
    updateKanbanStorage('kanbanBoardState', state);
  }
}

function changeTaskListName(event) {
  if (event.target.closest('.context-menu-button__sub-button') &&
    event.target.closest('.context-menu-button__sub-button').textContent === 'Change block name') {
    const container = document.querySelector('.context-menu-button__options');
    container.style.padding = '5px';
    container.innerHTML = `Enter new name <input type="text" class="context-menu-button__input">`;
    const input = document.querySelector('.context-menu-button__input');
    input.focus();

    function onInputChange(event) {
      const listIndex = event.target.closest('.context-menu-button__options').dataset.listNumber;
      if (event.target.value.trim()) {
        state[listIndex].title = event.target.value;
        createAppTemplate(state);
        toggleUserMenu();
        updateKanbanStorage('kanbanBoardState', state);
      }
    }

    input.addEventListener('change', onInputChange);
    input.addEventListener('blur', onInputChange);
  }
}

document.addEventListener('click', clickOnBacklogAddButton);
document.addEventListener('click', clickOnNotBacklogAddButton);
document.addEventListener('click', addNewTaskBlock);
document.addEventListener('click', openContextMenu);
document.addEventListener('click', deleteTaskList);
document.addEventListener('click', changeTaskListName);